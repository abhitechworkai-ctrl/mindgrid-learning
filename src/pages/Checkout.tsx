import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Lock } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { supabase } from '../lib/supabase';
import { env } from '../lib/env';

interface Product {
  id: string;
  name: string;
  subject: string;
  pack_type: string;
  price: number;
  description: string;
}

interface PromptPack {
  id: string;
  name: string;
  subject: string;
  price: number;
  description: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [promptPack, setPromptPack] = useState<PromptPack | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [referralCode, setReferralCode] = useState('');
  const [referralStatus, setReferralStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [referralError, setReferralError] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const productId = searchParams.get('product');
  const promptPackId = searchParams.get('promptpack');

  useEffect(() => {
    async function fetchProduct() {
      if (productId) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .maybeSingle();

        if (!error && data) {
          setProduct(data);
          setFinalPrice(data.price);
        }
      } else if (promptPackId) {
        const { data, error } = await supabase
          .from('prompt_packs')
          .select('*')
          .eq('id', promptPackId)
          .maybeSingle();

        if (!error && data) {
          setPromptPack(data);
          setFinalPrice(data.price);
        }
      }
      setLoading(false);
    }

    fetchProduct();
  }, [productId, promptPackId]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (phone && phone.trim() && !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateReferralCode = async () => {
    if (!referralCode.trim()) {
      setReferralError('Please enter a referral code');
      return;
    }

    setReferralStatus('validating');
    setReferralError('');

    if (!referralCode.startsWith('MIND-')) {
      setReferralStatus('invalid');
      setReferralError('Invalid referral code format');
      return;
    }

    const item = product || promptPack;
    if (!item) return;

    const discount = Math.round(item.price * 0.10);
    setDiscountAmount(discount);
    setFinalPrice(item.price - discount);
    setReferralStatus('valid');
  };

  const removeReferralCode = () => {
    const item = product || promptPack;
    setReferralCode('');
    setReferralStatus('idle');
    setReferralError('');
    setDiscountAmount(0);
    setFinalPrice(item?.price || 0);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      if (!env.razorpay.keyId) {
        alert('Payment gateway not configured. Please contact support.');
        setIsProcessing(false);
        return;
      }

      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        setIsProcessing(false);
        return;
      }

      const item = product || promptPack;
      if (!item) {
        alert('Product not found');
        setIsProcessing(false);
        return;
      }

      const apiUrl = `${env.supabase.url}/functions/v1/create-order`;
      const orderPayload: any = {
        amount: item.price,
        customerName: name,
        customerEmail: email,
        customerPhone: phone || undefined,
        referral_code: referralStatus === 'valid' ? referralCode : null,
      };

      if (product) {
        orderPayload.productId = item.id;
      } else if (promptPack) {
        orderPayload.promptPackId = item.id;
      }

      const createOrderResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.supabase.anonKey}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!createOrderResponse.ok) {
        const errorData = await createOrderResponse.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const { orderId, amount, originalAmount, discountApplied, currency, keyId, databaseOrderId, referralApplied } = await createOrderResponse.json();

      if (referralApplied && discountApplied > 0) {
        setDiscountAmount(discountApplied);
        setFinalPrice(amount);
      }

      const options = {
        key: keyId,
        amount: amount * 100,
        currency: currency,
        name: 'MindGrid Learning Solutions',
        description: item.name,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            const verifyUrl = `${env.supabase.url}/functions/v1/verify-payment`;
            const verifyResponse = await fetch(verifyUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.supabase.anonKey}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                databaseOrderId: databaseOrderId,
              }),
            });

            if (!verifyResponse.ok) {
              const errorData = await verifyResponse.json();
              throw new Error(errorData.error || 'Payment verification failed');
            }

            const verifyData = await verifyResponse.json();

            if (promptPack) {
              navigate('/prompt-pack/thank-you');
            } else {
              navigate('/thank-you');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            navigate(`/failed?order=${databaseOrderId}`);
          }
        },
        notes: {
          product_type: promptPack ? 'prompt_pack' : 'exam_pack',
          pack_type: product?.pack_type || promptPack?.type || '',
          subject: item.subject || '',
          pack_name: promptPack?.name || '',
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: '#88BDF2',
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            navigate(`/failed?order=${databaseOrderId}`);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!product && !promptPack) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-navy mb-4">Product not found</h1>
          <Button onClick={() => navigate('/exam-preparation')}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const item = product || promptPack;

  return (
    <div id="main-content" className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-8 text-center animate-fade-up">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 md:p-8 animate-fade-up stagger-2">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-6">Your Details</h2>
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-600 mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-600 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <Input
                  label="Phone Number (Optional)"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-sm text-red-600 mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <label className="block text-sm font-medium text-green-800 mb-2">
                  Have a Referral Code? (Get 10% Off!)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="MIND-XXXX-XXXX"
                    className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent uppercase"
                    disabled={referralStatus === 'valid'}
                  />
                  {referralStatus !== 'valid' ? (
                    <button
                      type="button"
                      onClick={validateReferralCode}
                      disabled={referralStatus === 'validating'}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                      {referralStatus === 'validating' ? 'Checking...' : 'Apply'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={removeReferralCode}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {referralStatus === 'valid' && (
                  <p className="mt-2 text-green-600 text-sm flex items-center">
                    Referral code applied! You save ₹{discountAmount}
                  </p>
                )}

                {referralError && (
                  <p className="mt-2 text-red-500 text-sm">
                    {referralError}
                  </p>
                )}
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Original Price:</span>
                  <span className={discountAmount > 0 ? 'line-through' : ''}>₹{item?.price}</span>
                </div>
                {discountAmount > 0 && (
                  <>
                    <div className="flex justify-between text-sm text-green-600 mt-1">
                      <span>Referral Discount (10%):</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                    <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                      <span>Final Price:</span>
                      <span className="text-green-600">₹{finalPrice}</span>
                    </div>
                  </>
                )}
              </div>

              <Button type="submit" fullWidth loading={isProcessing}>
                {`Pay ₹${finalPrice}`}
              </Button>

              <div className="flex items-center justify-center text-sm text-gray-600 mt-4">
                <Lock className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Secure payment via Razorpay</span>
              </div>
            </form>
          </Card>

          <div>
            <Card className="p-6 md:p-8 animate-fade-up stagger-3">
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingCart className="w-6 h-6 text-primary-accent" aria-hidden="true" />
                <h2 className="text-2xl md:text-3xl font-bold text-primary-navy">Order Summary</h2>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-xl font-semibold text-primary-navy mb-2">{item?.name}</h3>
                <p className="text-base text-gray-600 mb-4 leading-relaxed-body">
                  {item?.description}
                </p>

                <div className="flex items-center justify-between text-base text-gray-700 mb-2">
                  <span>Subject:</span>
                  <span className="font-medium">{item?.subject}</span>
                </div>

                {product && (
                  <div className="flex items-center justify-between text-base text-gray-700 mb-4">
                    <span>Pack Type:</span>
                    <span className="font-medium">{product.pack_type}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between text-xl font-bold text-primary-navy">
                    <span>Total:</span>
                    <span>₹{item?.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">One-time payment. Lifetime access.</p>
                </div>
              </div>
            </Card>

            <div className="mt-6 bg-blue-50 border-2 border-primary-accent rounded-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed-body">
                <strong>What happens next:</strong> After successful payment, you'll receive an email
                with your unique access link within 5 minutes. Check your email to download your materials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

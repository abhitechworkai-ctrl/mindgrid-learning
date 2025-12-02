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
        }
      } else if (promptPackId) {
        const { data, error } = await supabase
          .from('prompt_packs')
          .select('*')
          .eq('id', promptPackId)
          .maybeSingle();

        if (!error && data) {
          setPromptPack(data);
        }
      }
      setLoading(false);
    }

    fetchProduct();
  }, [productId, promptPackId]);

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

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: name,
          customer_email: email,
          customer_phone: phone || null,
          product_type: product ? 'exam_pack' : 'prompt_pack',
          product_id: item.id,
          subject: item.subject,
          pack_type: product?.pack_type || null,
          amount: item.price,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const options = {
        key: env.razorpay.keyId,
        amount: item.price * 100,
        currency: 'INR',
        name: 'MindGrid Learning Solutions',
        description: item.name,
        order_id: undefined,
        handler: async function (response: any) {
          try {
            const { error: updateError } = await supabase
              .from('orders')
              .update({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id || '',
                status: 'completed',
              })
              .eq('id', orderData.id);

            if (updateError) throw updateError;

            if (env.webhooks.orderUrl) {
              try {
                await fetch(env.webhooks.orderUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    order_id: orderData.id,
                    customer_name: name,
                    customer_email: email,
                    customer_phone: phone,
                    product_type: product ? 'exam_pack' : 'prompt_pack',
                    subject: item.subject,
                    pack_type: product?.pack_type || null,
                    amount: item.price,
                    razorpay_payment_id: response.razorpay_payment_id,
                    timestamp: new Date().toISOString(),
                  }),
                });
              } catch (webhookError) {
                console.error('Webhook error:', webhookError);
              }
            }

            navigate(`/success?order=${orderData.id}`);
          } catch (error) {
            console.error('Error updating order:', error);
            alert('Payment successful but there was an error. Please contact support.');
          }
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary-navy mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-6">Your Details</h2>
            <form onSubmit={handlePayment} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Phone Number (Optional)"
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Button type="submit" fullWidth disabled={isProcessing}>
                {isProcessing ? 'Processing...' : `Pay ₹${item?.price}`}
              </Button>

              <div className="flex items-center justify-center text-sm text-gray-600 mt-4">
                <Lock className="w-4 h-4 mr-2" />
                <span>Secure payment via Razorpay</span>
              </div>
            </form>
          </Card>

          <div>
            <Card className="p-6 md:p-8">
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingCart className="w-6 h-6 text-primary-accent" />
                <h2 className="text-2xl font-bold text-primary-navy">Order Summary</h2>
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
                with download links to your purchased materials within 5 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

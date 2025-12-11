import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { XCircle, AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  product_type: string;
  product_id: string;
  subject: string;
  pack_type: string | null;
  amount: number;
  created_at: string;
}

export function Failed() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('order');

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .maybeSingle();

      if (!error && data) {
        setOrder(data);
      }
      setLoading(false);
    }

    fetchOrder();
  }, [orderId]);

  const handleRetry = () => {
    if (order) {
      const productParam = order.product_type === 'exam_pack'
        ? `product=${order.product_id}`
        : `promptpack=${order.product_id}`;
      navigate(`/checkout?${productParam}`);
    } else {
      navigate('/exam-preparation');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
            Payment Failed
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed-body mb-8">
            We couldn't process your payment. Please try again or contact support if the issue persists.
          </p>

          {order && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold text-primary-navy mb-4">Order Details</h2>
              <div className="space-y-2 text-base text-gray-700">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-medium">{order.id.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="font-medium">{order.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium">{order.customer_email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subject:</span>
                  <span className="font-medium">{order.subject}</span>
                </div>
                {order.pack_type && (
                  <div className="flex justify-between">
                    <span>Pack Type:</span>
                    <span className="font-medium">{order.pack_type}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
                  <span className="font-semibold">Amount:</span>
                  <span className="font-bold text-primary-navy">₹{order.amount}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 mr-2" />
              <h3 className="text-xl font-semibold text-primary-navy">What happened?</h3>
            </div>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              Your payment couldn't be completed. This could be due to:
            </p>
            <ul className="text-left text-base text-gray-700 space-y-2 leading-relaxed-body mb-4 list-disc list-inside">
              <li>Insufficient funds in your account</li>
              <li>Payment cancelled by you</li>
              <li>Technical issues with your bank or payment method</li>
              <li>Incorrect payment details</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed-body">
              Don't worry, no money has been deducted from your account.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <Button fullWidth onClick={handleRetry}>
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            <Link to="/exam-preparation">
              <Button fullWidth variant="secondary">
                Browse More Products
              </Button>
            </Link>
            <Link to="/">
              <Button fullWidth variant="secondary">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="bg-blue-50 border border-primary-accent rounded-lg p-4">
            <p className="text-sm text-gray-700 leading-relaxed-body">
              <strong>Need help?</strong> Contact us at{' '}
              <a href="mailto:support@mindgridlearning.com" className="text-primary-accent hover:underline">
                support@mindgridlearning.com
              </a>
              {' '}or call us at{' '}
              <a href="tel:+911234567890" className="text-primary-accent hover:underline">
                +91 123 456 7890
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Mail, Download } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  product_type: string;
  subject: string;
  pack_type: string | null;
  amount: number;
  created_at: string;
}

export function Success() {
  const [searchParams] = useSearchParams();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
            Payment Successful!
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed-body mb-8">
            Thank you for your purchase. Your order has been confirmed.
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
                  <span className="font-semibold">Amount Paid:</span>
                  <span className="font-bold text-primary-navy">₹{order.amount}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border-2 border-primary-accent rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-3">
              <Mail className="w-6 h-6 text-primary-accent mr-2" />
              <h3 className="text-xl font-semibold text-primary-navy">Check Your Email</h3>
            </div>
            <p className="text-base text-gray-700 leading-relaxed-body mb-2">
              We've sent your download links to:
            </p>
            <p className="text-lg font-semibold text-primary-navy mb-3">
              {order?.customer_email || 'your registered email'}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed-body">
              You should receive the email within 5 minutes. Please check your spam or promotions folder
              if you don't see it in your inbox.
            </p>
          </div>

          <div className="bg-primary-light rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-3">
              <Download className="w-6 h-6 text-primary-accent mr-2" />
              <h3 className="text-xl font-semibold text-primary-navy">Next Steps</h3>
            </div>
            <ol className="text-left text-base text-gray-700 space-y-2 leading-relaxed-body">
              <li>1. Open the email from MindGrid Learning</li>
              <li>2. Click on the download links provided</li>
              <li>3. Save the materials to your device</li>
              <li>4. Start your exam preparation journey!</li>
            </ol>
          </div>

          <div className="space-y-4">
            <Link to="/exam-preparation">
              <Button fullWidth variant="secondary">
                Explore More Subjects
              </Button>
            </Link>
            <Link to="/">
              <Button fullWidth variant="secondary">
                Back to Home
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-600 mt-8 leading-relaxed-body">
            Need help? Contact us at support@mindgridlearning.com
          </p>
        </Card>
      </div>
    </div>
  );
}

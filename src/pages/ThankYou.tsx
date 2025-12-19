import { CheckCircle, Mail } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export function ThankYou() {
  return (
    <div id="main-content" className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
            <CheckCircle className="w-12 h-12 text-green-600" aria-hidden="true" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 animate-fade-up">
            Payment Successful!
          </h1>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed-body animate-fade-up stagger-2">
            Thank you for purchasing your Exam Preparation Pack.
          </p>

          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-8 animate-fade-up stagger-3">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-green-600 mr-3" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-primary-navy">Check Your Email</h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed-body">
              We've sent your exam pack access link to the email address you provided during checkout.
              The email will arrive within the next 5 minutes.
            </p>
          </div>

          <div className="space-y-4 text-left text-base text-gray-700 mb-8 animate-fade-up stagger-4">
            <h3 className="font-semibold text-primary-navy text-center mb-4">What to Expect:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Access link will be sent to your email within 5 minutes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Click the link to access your exam preparation materials</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Download and use the materials for your exam preparation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>If you don't receive the email, please check your spam folder</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-6 animate-fade-up stagger-5">
            <p className="text-sm text-gray-600 mb-4">
              Need help? Contact us at support@mindgridlearning.com
            </p>
            <Link to="/">
              <Button variant="secondary">Return to Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

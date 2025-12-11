import { Card } from '../components/ui/Card';
import { Mail } from 'lucide-react';

export function ShippingPolicy() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-light to-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 leading-relaxed-heading">
            Shipping Policy
          </h1>
          <p className="text-base text-gray-600">Last updated: December 2024</p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed-body mb-6">
              MindGrid Learning provides <strong>100% digital educational products</strong>.
              No physical goods are shipped.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Delivery Timeline</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              Access to purchased digital content is delivered <strong>instantly after successful payment</strong>.
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>Customers receive access links via email</li>
              <li>Dashboard access is granted immediately (if applicable)</li>
              <li>Download links are typically sent within 5 minutes of payment confirmation</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">No Physical Shipping</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              Since all our products are downloadable study materials and AI prompt packs:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>No courier service is used</li>
              <li>No delivery charges apply</li>
              <li>No estimated physical delivery dates are applicable</li>
              <li>No tracking numbers are issued</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Delivery Issues</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              If you did not receive access to your purchased content:
            </p>
            <ol className="list-decimal pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>Check your spam or promotions folder for the delivery email</li>
              <li>Email us at <strong>support@mindgridlearning.com</strong></li>
              <li>Provide the order ID and registered email address</li>
              <li>We will resolve the issue within 24–48 hours</li>
            </ol>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Incorrect Email or Login Issues</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              If access was not received due to:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>Typing the wrong email address during checkout</li>
              <li>Login or authentication difficulties</li>
              <li>Technical issues with email delivery</li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              We will manually verify your purchase and resend access credentials to the correct email address.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Download Link Validity</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              Download links remain valid for 30 days from the date of purchase. If your link has expired,
              contact support and we will generate a fresh download link for you.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Contact</h2>
            <div className="bg-primary-light p-6 rounded-lg flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary-accent" />
              </div>
              <div>
                <p className="text-base text-gray-700 leading-relaxed-body mb-2">
                  For all delivery-related concerns:
                </p>
                <p className="text-lg font-semibold text-primary-navy">
                  <a href="mailto:support@mindgridlearning.com" className="hover:text-primary-accent transition-colors">
                    support@mindgridlearning.com
                  </a>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Response time: Within 24 hours during business days
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

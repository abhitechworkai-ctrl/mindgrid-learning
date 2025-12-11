import { Card } from '../components/ui/Card';

export function PrivacyPolicy() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-light to-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 leading-relaxed-heading">
            Privacy Policy
          </h1>
          <p className="text-base text-gray-600">Last updated: December 2025</p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">Introduction</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              At MindGrid Learning Solutions, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, and protect your personal information when you use our website and purchase our products.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Information We Collect</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              We collect the following information when you use our services:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>Name and email address (required for all purchases and free resources)</li>
              <li>Phone number (optional, for order updates)</li>
              <li>Payment information (processed securely through Razorpay)</li>
              <li>Order history and download activity</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">How We Use Your Information</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>To process and deliver your orders</li>
              <li>To send download links and order confirmations</li>
              <li>To provide customer support</li>
              <li>To send educational content and updates (only if you opt-in)</li>
              <li>To improve our products and services</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Data Security</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              We implement industry-standard security measures to protect your personal information.
              All payment transactions are processed through Razorpay's secure payment gateway.
              We never store your credit card or banking information on our servers.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Information Sharing</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              We do not sell, rent, or share your personal information with third parties except:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>With payment processors (Razorpay) to complete transactions</li>
              <li>With email service providers to deliver your purchased materials</li>
              <li>When required by law or to protect our legal rights</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Your Rights</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Unsubscribe from marketing emails</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Cookies</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              We use minimal cookies to improve your browsing experience and analyze website traffic.
              These cookies do not contain personal information and you can disable them in your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Children's Privacy</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              Our services are intended for students and parents. We recommend that parents supervise
              their children's use of our website. We do not knowingly collect information from children
              under 13 without parental consent.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Changes to This Policy</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any significant
              changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Contact Us</h2>
            <p className="text-base text-gray-700 leading-relaxed-body">
              If you have any questions about this Privacy Policy or how we handle your data,
              please contact us at support@mindgridlearning.com
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}

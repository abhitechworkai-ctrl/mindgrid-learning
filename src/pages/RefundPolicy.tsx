import { Card } from '../components/ui/Card';

export function RefundPolicy() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-light to-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 leading-relaxed-heading">
            Refund Policy
          </h1>
          <p className="text-base text-gray-600">Last updated: December 2025</p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">7-Day Money-Back Guarantee</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              We stand behind the quality of our exam preparation materials. If you're not completely
              satisfied with your purchase, we offer a full refund within 7 days of purchase.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Eligibility for Refunds</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              You are eligible for a refund if:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>You request a refund within 7 days of purchase</li>
              <li>The materials were not as described or significantly defective</li>
              <li>You did not receive the download links despite payment confirmation</li>
              <li>Technical issues prevented you from accessing the materials</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Non-Refundable Situations</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              Refunds will not be provided if:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>More than 7 days have passed since purchase</li>
              <li>You simply changed your mind after reviewing the materials</li>
              <li>You purchased the wrong product (though we may offer an exchange)</li>
              <li>You violated our terms of use by sharing or distributing materials</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">How to Request a Refund</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              To request a refund, follow these steps:
            </p>
            <ol className="list-decimal pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>Email us at support@mindgridlearning.com</li>
              <li>Include your order ID and registered email address</li>
              <li>Provide a brief reason for the refund request</li>
              <li>Allow 2-3 business days for review and processing</li>
            </ol>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Refund Processing</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              Once your refund is approved:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>You will receive an email confirmation</li>
              <li>Refunds are processed within 5-7 business days</li>
              <li>The amount will be credited to your original payment method</li>
              <li>Bank processing times may vary (typically 5-10 business days)</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Partial Refunds</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              If only certain parts of your purchased materials are defective or missing,
              we may offer a partial refund instead of a full refund. This will be determined
              on a case-by-case basis.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Exchanges</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              If you purchased the wrong subject or pack type, we're happy to exchange it for
              the correct one within 7 days of purchase. Contact us with your order details
              and preferred alternative.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Technical Issues</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              Before requesting a refund for technical issues (like unable to download or open files),
              please contact our support team. We'll do our best to resolve the issue quickly.
              Common solutions include sending materials in alternative formats or providing
              extended download links.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Free Resources</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              Free sample materials and resources are provided as-is with no refund applicable.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Our Commitment</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              We're committed to your satisfaction. If you're experiencing any issues with our
              materials or have concerns about your purchase, please reach out to us before
              requesting a refund. We want to ensure you have the best possible experience
              with our exam preparation resources.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">Contact Us</h2>
            <p className="text-base text-gray-700 leading-relaxed-body">
              For refund requests or questions about this policy, contact us at:
              <br />
              Email: support@mindgridlearning.com
              <br />
              Response time: Within 24 hours during business days
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}

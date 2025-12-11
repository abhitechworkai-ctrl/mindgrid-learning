import { Card } from '../components/ui/Card';

export function Terms() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-light to-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 leading-relaxed-heading">
            Terms & Conditions
          </h1>
          <p className="text-base text-gray-600">Last updated: December 2025</p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">1. Agreement to Terms</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              By accessing and using MindGrid Learning Solutions website and purchasing our products, you agree to be
              bound by these Terms and Conditions. If you do not agree with any part of these terms,
              please do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">2. Products and Services</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              We offer digital exam preparation materials including:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>Exam Preparation Packs (Basic, Standard, Premium)</li>
              <li>AI Prompt Packs (Subject-wise and Chapter-wise)</li>
              <li>Free sample materials</li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              All products are digital and delivered via email. We do not provide physical products.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">3. Pricing and Payment</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              All prices are listed in Indian Rupees (INR) and are one-time payments unless otherwise stated.
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>Prices are subject to change without notice</li>
              <li>Payments are processed securely through Razorpay</li>
              <li>We accept UPI and major credit/debit cards</li>
              <li>All sales are final unless covered by our refund policy</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">4. Delivery of Digital Products</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              After successful payment:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>Download links will be sent to your registered email within 5 minutes</li>
              <li>Check your spam/promotions folder if you don't receive the email</li>
              <li>Contact support if you don't receive materials within 30 minutes</li>
              <li>Download links remain valid for 30 days from purchase date</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">5. Usage Rights and Restrictions</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              When you purchase our materials, you receive a personal, non-transferable license to use them.
            </p>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              You MAY:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>Download and use materials for your personal exam preparation</li>
              <li>Print materials for your own use</li>
              <li>Access materials on multiple personal devices</li>
            </ul>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              You MAY NOT:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>Share, distribute, or resell our materials</li>
              <li>Upload materials to public file-sharing platforms</li>
              <li>Use materials for commercial purposes</li>
              <li>Modify or create derivative works from our content</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">6. Refund Policy</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              Please refer to our separate Refund Policy page for complete details. In summary,
              we offer a 7-day money-back guarantee on all purchases.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">7. Intellectual Property</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              All content, materials, and designs on this website are protected by copyright and
              intellectual property laws. MindGrid Learning Solutions retains all rights to our original content.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">8. Disclaimer</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              Our materials are designed to assist with exam preparation but:
            </p>
            <ul className="list-disc pl-6 text-base text-gray-700 leading-relaxed-body space-y-2 mb-6">
              <li>We do not guarantee specific exam results or scores</li>
              <li>Success depends on individual effort and preparation</li>
              <li>Materials are provided "as is" without warranties of any kind</li>
              <li>We are not affiliated with CBSE or any educational board</li>
            </ul>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">9. Limitation of Liability</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              MindGrid Learning Solutions shall not be liable for any indirect, incidental, or consequential damages
              arising from the use of our products or services. Our maximum liability is limited to
              the amount you paid for the product.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">10. Changes to Terms</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              We reserve the right to modify these terms at any time. Continued use of our services
              after changes constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">11. Governing Law</h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              These terms are governed by the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of courts in [Your City], India.
            </p>

            <h2 className="text-2xl font-bold text-primary-navy mb-4 mt-8">12. Contact Information</h2>
            <p className="text-base text-gray-700 leading-relaxed-body">
              For questions about these Terms and Conditions, please contact us at
              support@mindgridlearning.com
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}

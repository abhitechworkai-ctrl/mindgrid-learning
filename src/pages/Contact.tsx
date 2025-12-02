import { Mail, Phone, Clock } from 'lucide-react';
import { Card } from '../components/ui/Card';

export function Contact() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-light to-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 leading-relaxed-heading">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed-body max-w-3xl mx-auto">
            We're here to help with any questions about our exam preparation packs
          </p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary-accent" />
            </div>
            <h3 className="text-lg font-semibold text-primary-navy mb-2">Email</h3>
            <p className="text-base text-gray-700">support@mindgridlearning.com</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary-accent" />
            </div>
            <h3 className="text-lg font-semibold text-primary-navy mb-2">Phone</h3>
            <p className="text-base text-gray-700">+91 9895626732</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary-accent" />
            </div>
            <h3 className="text-lg font-semibold text-primary-navy mb-2">Support Hours</h3>
            <p className="text-base text-gray-700">Mon-Sat, 9 AM - 6 PM IST</p>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-bold text-primary-navy mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-primary-navy mb-2">
                How will I receive my purchased materials?
              </h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                After successful payment, you'll receive an email with download links within 5 minutes.
                All materials are delivered digitally via email.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-navy mb-2">
                What if I don't receive my download email?
              </h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                First, check your spam or promotions folder. If you still don't see it after 10 minutes,
                contact us at support@mindgridlearning.com with your order details.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-navy mb-2">
                Can I get a refund if I'm not satisfied?
              </h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                Yes! We offer a 7-day money-back guarantee. If you're not satisfied with your purchase,
                contact us within 7 days for a full refund. See our refund policy for details.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-navy mb-2">
                Are the materials updated for the current academic year?
              </h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                Yes, all our materials are aligned with the latest CBSE Class 10 curriculum and exam pattern.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-navy mb-2">
                Can I purchase materials for multiple subjects?
              </h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                Absolutely! You can purchase packs for as many subjects as you need. Each purchase is separate
                and you'll receive individual download links for each.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary-navy mb-2">
                Do you offer printed materials?
              </h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                Currently, we only offer digital materials (PDF format). You're welcome to print them yourself
                after download.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-base text-gray-700 leading-relaxed-body">
            Still have questions? Email us at{' '}
            <a href="mailto:support@mindgridlearning.com" className="text-primary-accent hover:underline">
              support@mindgridlearning.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { Download, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { supabase } from '../lib/supabase';
import { env } from '../lib/env';

export function FreeResources() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error: dbError } = await supabase
        .from('leads')
        .insert({
          name,
          email,
          phone: phone || null,
          source: 'free-resources',
        });

      if (dbError) throw dbError;

      if (env.webhooks.leadUrl) {
        try {
          await fetch(env.webhooks.leadUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              email,
              phone,
              source: 'free-resources',
              timestamp: new Date().toISOString(),
            }),
          });
        } catch (webhookError) {
          console.error('Webhook error:', webhookError);
        }
      }

      setSubmitStatus('success');
      setName('');
      setEmail('');
      setPhone('');
    } catch (error: any) {
      console.error('Error submitting lead:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-light to-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-primary-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 leading-relaxed-heading">
            Free CBSE Class 10 Study Resources
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed-body max-w-3xl mx-auto">
            Get free sample materials and experience the quality of our exam preparation content
            before making any purchase.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-primary-navy mb-3">Sample Study Materials</h3>
            <ul className="space-y-2 text-base text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>Chapter summaries for all subjects</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>Practice question sets</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>Revision checklists</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-primary-navy mb-3">AI Prompt Samples</h3>
            <ul className="space-y-2 text-base text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>Sample prompts for Mathematics</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>Science concept clarification examples</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>Guide to safe AI usage</span>
              </li>
            </ul>
          </Card>
        </div>

        <Card className="p-8">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-primary-navy mb-3">Thank You!</h2>
              <p className="text-lg text-gray-700 leading-relaxed-body mb-4">
                Check your email inbox within the next 5 minutes for your free resources.
              </p>
              <p className="text-base text-gray-600 leading-relaxed-body mb-6">
                Don't see it? Please check your spam or promotions folder.
              </p>
              <Button onClick={() => setSubmitStatus('idle')}>
                Request for Someone Else
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-primary-navy mb-2 text-center">
                Get Your Free Resources
              </h2>
              <p className="text-base text-gray-600 text-center mb-6 leading-relaxed-body">
                Enter your details below and we'll send the materials to your email immediately
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Your Name"
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

                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Get Free Resources'}
                </Button>

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 text-center">
                    <p className="text-base text-red-700">
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </p>
                  </div>
                )}
              </form>

              <p className="text-sm text-gray-500 text-center mt-6 leading-relaxed-body">
                By submitting this form, you agree to receive educational content from us.
                We respect your privacy and never share your information.
              </p>
            </>
          )}
        </Card>
      </section>

      <section className="bg-primary-light py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-primary-navy mb-4">
            Why Try Our Free Resources?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed-body mb-6">
            We want you to see the quality and effectiveness of our materials before making any purchase decision.
            Our free samples give you a genuine preview of what our full preparation packs offer.
          </p>
          <p className="text-base text-gray-600 leading-relaxed-body">
            No credit card required. No obligations. Just helpful study materials for your CBSE Class 10 preparation.
          </p>
        </div>
      </section>
    </div>
  );
}

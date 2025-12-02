import { Link } from 'react-router-dom';
import { BookOpen, Brain, TrendingUp, Shield, Calculator, Beaker, Globe2, BookText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { env } from '../lib/env';

const subjects = [
  {
    name: 'Mathematics',
    icon: Calculator,
    description: 'Master formulas, problem-solving, and exam strategies',
    link: '/exam-preparation/mathematics',
  },
  {
    name: 'Science',
    icon: Beaker,
    description: 'Physics, Chemistry, and Biology concepts simplified',
    link: '/exam-preparation/science',
  },
  {
    name: 'Social Science',
    icon: Globe2,
    description: 'History, Geography, Political Science, and Economics',
    link: '/exam-preparation/social-science',
  },
  {
    name: 'English',
    icon: BookText,
    description: 'Literature, grammar, and writing skills',
    link: '/exam-preparation/english',
  },
];

export function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          name,
          email,
          source: 'homepage',
        });

      if (error) throw error;

      if (env.webhooks.leadUrl) {
        await fetch(env.webhooks.leadUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            source: 'homepage',
            timestamp: new Date().toISOString(),
          }),
        });
      }

      setSubmitStatus('success');
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting lead:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-light to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-6 leading-relaxed-heading">
            CBSE Class 10 Exam Preparation – Simple, Affordable & Effective
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed-body">
            Subject-wise exam preparation packs and AI prompt packs for Mathematics, Science, Social Science and English.
            No expensive coaching – just clear, structured preparation systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/exam-preparation">
              <Button size="lg">Explore Exam Packs</Button>
            </Link>
            <Link to="/prompts">
              <Button size="lg" variant="secondary">View Prompt Packs</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-12">
          Choose Your Subject
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Link key={subject.name} to={subject.link}>
                <Card className="p-6 h-full hover:border-2 hover:border-primary-accent transition-all cursor-pointer">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary-navy">{subject.name}</h3>
                    <p className="text-base text-gray-600 leading-relaxed-body">{subject.description}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-primary-light py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-4">
              Why Parents Trust Us
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed-body">
              Simple, transparent, and focused on your child's exam success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary-navy mb-2">Affordable</h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                One-time payment. No hidden costs or subscriptions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary-navy mb-2">CBSE Aligned</h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                Designed specifically for CBSE Class 10 Board exams.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary-navy mb-2">Reliable</h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                Clear preparation systems that work for all students.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-primary-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-2">
              Get Free Sample Materials
            </h2>
            <p className="text-base text-gray-700 leading-relaxed-body">
              Download free exam preparation samples and see the quality for yourself
            </p>
          </div>

          {submitStatus === 'success' ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
              <p className="text-lg text-green-700 font-medium">
                Thank you! Check your email for the free resources.
              </p>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent"
              />
              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Get Free Resources'}
              </Button>
              {submitStatus === 'error' && (
                <p className="text-sm text-red-600 text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </Card>
      </section>
    </div>
  );
}

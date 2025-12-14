import { Link } from 'react-router-dom';
import { BookOpen, Brain, TrendingUp, Shield, Calculator, Beaker, Globe2, BookText, Package, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useState, useEffect } from 'react';
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
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('idle');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

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
    <div id="main-content">
      <section className="bg-gradient-to-b from-primary-light to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-3xl md:text-5xl font-bold text-primary-navy mb-6 leading-relaxed-heading ${visible ? 'animate-fade-up' : ''}`}>
            CBSE Class 10 Exam Preparation – Simple, Affordable & Effective
          </h1>
          <p className={`text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed-body ${visible ? 'animate-fade-up stagger-2' : ''}`}>
            Two ways to prepare: AI-powered prompts or complete exam materials. Choose what works for your child.
            No expensive coaching – just clear, structured preparation systems.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${visible ? 'animate-fade-up stagger-3' : ''}`}>
            <Link to="/exam-preparation">
              <Button size="lg" className="animate-bounce-subtle">Explore Exam Packs</Button>
            </Link>
            <Link to="/prompts">
              <Button size="lg" variant="secondary">View Prompt Packs</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-4">
          Choose Your Preparation Style
        </h2>
        <p className="text-base text-gray-700 text-center mb-12 max-w-2xl mx-auto leading-relaxed-body">
          Every student learns differently. Pick the approach that matches your child's needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card hover className="p-8 border-2 border-transparent hover:border-primary-accent">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-primary-navy">AI Prompt Package</h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                Smart prompts to help students use AI tools effectively for chapter summaries, practice questions, and exam prep.
              </p>
              <Link to="/ai-prompt-pack" className="w-full">
                <Button fullWidth variant="secondary">Learn More</Button>
              </Link>
            </div>
          </Card>
          <Card hover className="p-8 border-2 border-transparent hover:border-primary-accent">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-primary-navy">Exam Prep Package</h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                Complete structured materials: notes, practice questions, exam strategies, and answer-writing guidance.
              </p>
              <Link to="/exam-prep-pack" className="w-full">
                <Button fullWidth>Learn More</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-50 to-yellow-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary-navy mb-1">
                  Save More with Bundles
                </h3>
                <p className="text-base text-gray-700 leading-relaxed-body">
                  Combine subjects and preparation types for maximum savings
                </p>
              </div>
            </div>
            <Link to="/bundles">
              <Button size="lg" className="whitespace-nowrap">
                View Bundle Options
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-12">
          Choose Your Subject
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <Link key={subject.name} to={subject.link}>
                <Card hover className={`p-6 h-full border-2 border-transparent hover:border-primary-accent ${visible ? `animate-fade-up stagger-${(index % 4) + 1}` : ''}`}>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-8 h-8 text-primary-accent" aria-hidden="true" />
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
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center animate-fade-in">
              <p className="text-lg text-green-700 font-medium">
                Thank you! Check your email for the free resources.
              </p>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  aria-label="Your Name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 text-base border-2 rounded-lg transition-all ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-primary-accent focus:ring-blue-200'
                  }`}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-red-600 mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  aria-label="Your Email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 text-base border-2 rounded-lg transition-all ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-primary-accent focus:ring-blue-200'
                  }`}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-red-600 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                fullWidth
                loading={isSubmitting}
                success={submitStatus === 'success'}
              >
                Get Free Resources
              </Button>
              {submitStatus === 'error' && (
                <p className="text-sm text-red-600 text-center" role="alert">
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

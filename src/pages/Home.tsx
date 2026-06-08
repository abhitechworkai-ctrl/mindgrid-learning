import { Link } from 'react-router-dom';
import { Brain, TrendingUp, Shield, Calculator, Beaker, Globe as Globe2, BookText, BookOpen, Zap, ExternalLink, Sparkles, GraduationCap } from 'lucide-react';
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

const aiFeatures = [
  {
    icon: Zap,
    title: 'Hands-on AI Skills',
    description: 'Learn to use ChatGPT, Gemini, and other AI tools effectively for real-world tasks.',
  },
  {
    icon: Brain,
    title: 'Project-Based Learning',
    description: 'Build actual AI-powered projects — not just theory. Walk away with a portfolio.',
  },
  {
    icon: Sparkles,
    title: 'For All Levels',
    description: 'From absolute beginners to working professionals. No coding background needed.',
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

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('leads').insert({ name, email, source: 'homepage' });
      if (error) throw error;

      if (env.webhooks.leadUrl) {
        await fetch(env.webhooks.leadUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, source: 'homepage', timestamp: new Date().toISOString() }),
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

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-primary-navy py-20 md:py-28">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Gradient glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-amber/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`inline-flex items-center gap-2 bg-primary-orange/15 text-primary-orange border border-primary-orange/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-6 ${visible ? 'animate-fade-up' : ''}`}
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            MindGrid Learning Solutions
          </div>
          <h1
            className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-relaxed-heading max-w-4xl mx-auto ${visible ? 'animate-fade-up stagger-2' : ''}`}
          >
            Practical AI skills{' '}
            <span className="text-primary-orange">and</span>{' '}
            exam success
          </h1>
          <p
            className={`text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed-body ${visible ? 'animate-fade-up stagger-3' : ''}`}
          >
            Two flagship offerings — an AI courses academy for the future, and affordable CBSE exam prep for students today.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center ${visible ? 'animate-fade-up stagger-4' : ''}`}
          >
            <a
              href="https://www.mindgridaiacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-orange hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-primary-orange/30 text-base"
            >
              Explore AI Courses
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
            <Link
              to="/exam-preparation"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/20 hover:border-white/40 transition-all duration-200 hover:-translate-y-0.5 text-base"
            >
              CBSE Exam Prep
            </Link>
          </div>
        </div>
      </section>

      {/* ── AI ACADEMY FLAGSHIP ── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 text-primary-orange border border-orange-200 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
                <Zap className="w-4 h-4" aria-hidden="true" />
                Flagship — AI Academy
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-5 leading-relaxed-heading">
                Learn AI that actually<br />
                <span className="text-primary-orange">gets you hired</span>
              </h2>
              <p className="text-lg text-primary-slate leading-relaxed-body mb-8">
                MindGrid AI Academy offers practical, no-fluff courses in AI tools, prompt engineering, and automation.
                Join thousands of students building real skills for the AI era.
              </p>
              <ul className="space-y-4 mb-8">
                {aiFeatures.map(({ icon: Icon, title, description }) => (
                  <li key={title} className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary-orange" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary-navy">{title}</p>
                      <p className="text-primary-slate text-sm leading-relaxed-body">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href="https://www.mindgridaiacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-orange hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-primary-orange/25 text-base"
              >
                Visit AI Academy
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-navy to-[#2a3650] rounded-2xl p-8 shadow-2xl">
                <div
                  className="absolute inset-0 rounded-2xl opacity-[0.05]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div className="relative space-y-5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary-orange rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white font-bold">MindGrid AI Academy</p>
                      <p className="text-gray-400 text-xs">mindgridaiacademy.com</p>
                    </div>
                  </div>
                  {['Prompt Engineering Mastery', 'AI Tools for Productivity', 'Build AI-Powered Apps', 'ChatGPT for Professionals'].map((course, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-orange rounded-full" />
                        <span className="text-gray-200 text-sm font-medium">{course}</span>
                      </div>
                      <span className="text-xs text-primary-amber font-semibold">New</span>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Join 2,000+ learners</span>
                    <div className="flex -space-x-2">
                      {['#F26B1D', '#F5A623', '#1A2238', '#5B6472'].map((color, i) => (
                        <div key={i} className="w-7 h-7 rounded-full border-2 border-[#2a3650]" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-primary-orange text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                AI-First
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CBSE EXAM PREP ── */}
      <section className="py-20 md:py-24 bg-primary-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              CBSE Class 10 Exam Prep
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 leading-relaxed-heading">
              Board exams made<br />
              <span className="text-primary-orange">simple and affordable</span>
            </h2>
            <p className="text-lg text-primary-slate max-w-2xl mx-auto leading-relaxed-body">
              No expensive coaching. One-time affordable packs — structured notes, practice questions,
              and exam strategies designed for CBSE Board students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-14">
            <Card hover className="p-8 bg-white border-2 border-transparent hover:border-primary-orange/40">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-orange to-orange-500 rounded-2xl flex items-center justify-center shadow-md">
                  <Brain className="w-10 h-10 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-primary-navy">AI Prompt Package</h3>
                <p className="text-base text-primary-slate leading-relaxed-body">
                  Smart prompts to help students use AI tools effectively for chapter summaries, practice questions, and exam prep.
                </p>
                <Link to="/ai-prompt-pack" className="w-full">
                  <Button fullWidth variant="secondary">Learn More</Button>
                </Link>
              </div>
            </Card>

            <Card hover className="p-8 bg-white border-2 border-transparent hover:border-primary-orange/40">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-md">
                  <BookOpen className="w-10 h-10 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-primary-navy">Exam Prep Package</h3>
                <p className="text-base text-primary-slate leading-relaxed-body">
                  Complete structured materials: notes, practice questions, exam strategies, and answer-writing guidance.
                </p>
                <Link to="/exam-prep-pack" className="w-full">
                  <Button fullWidth>Learn More</Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Subject grid */}
          <h3 className="text-2xl font-bold text-primary-navy text-center mb-8">Choose Your Subject</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <Link key={subject.name} to={subject.link}>
                  <Card
                    hover
                    className={`p-6 h-full bg-white border-2 border-transparent hover:border-primary-orange/40 ${
                      visible ? `animate-fade-up stagger-${(index % 4) + 1}` : ''
                    }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Icon className="w-8 h-8 text-primary-orange" aria-hidden="true" />
                      </div>
                      <h4 className="text-xl font-semibold text-primary-navy">{subject.name}</h4>
                      <p className="text-sm text-primary-slate leading-relaxed-body">{subject.description}</p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRUST PILLARS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-12">
            Why Students and Parents Trust Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Affordable',
                body: 'One-time payment. No hidden costs or subscriptions.',
              },
              {
                icon: BookOpen,
                title: 'CBSE Aligned',
                body: 'Designed specifically for CBSE Class 10 Board exams.',
              },
              {
                icon: Shield,
                title: 'Reliable',
                body: 'Clear preparation systems that work for all students.',
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="text-center">
                <div className="w-12 h-12 bg-primary-orange rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-primary-navy mb-2">{title}</h3>
                <p className="text-base text-primary-slate leading-relaxed-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <section className="py-16 bg-primary-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 bg-white">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary-orange" aria-hidden="true" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-2">
                Get Free Sample Materials
              </h2>
              <p className="text-base text-primary-slate leading-relaxed-body">
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
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:border-primary-orange'
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
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-200 focus:border-primary-orange'
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-red-600 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <Button type="submit" fullWidth loading={isSubmitting}>
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
        </div>
      </section>
    </div>
  );
}

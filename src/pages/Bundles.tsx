import { Link } from 'react-router-dom';
import { Package, CheckCircle, TrendingUp, Sparkles, Calculator, Beaker, Globe2, BookText } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useState, useEffect } from 'react';

const bundleConcepts = [
  {
    title: 'Complete Subject Package',
    description: 'AI Prompts + Exam Prep for one subject',
    savings: 'Save 15%',
    icon: CheckCircle,
    details: [
      'Full Exam Prep Package for any subject',
      'Subject-specific AI Prompt Package',
      'Complete chapter coverage',
      'Practice questions + Smart prompts',
    ],
  },
  {
    title: 'STEM Mastery Bundle',
    description: 'Math + Science complete preparation',
    savings: 'Save 25%',
    icon: Calculator,
    details: [
      'Mathematics Exam Prep Package',
      'Science Exam Prep Package',
      'Both AI Prompt Packages',
      'Perfect for science stream focus',
    ],
    popular: true,
  },
  {
    title: 'All-Subject Complete',
    description: 'Everything for all four subjects',
    savings: 'Save 30%',
    icon: Package,
    details: [
      'All four subject Exam Prep Packages',
      'All four AI Prompt Packages',
      'Complete CBSE Class 10 coverage',
      'Maximum preparation, maximum confidence',
    ],
    bestValue: true,
  },
];

const subjects = [
  { name: 'Mathematics', icon: Calculator },
  { name: 'Science', icon: Beaker },
  { name: 'Social Science', icon: Globe2 },
  { name: 'English', icon: BookText },
];

export function Bundles() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div id="main-content">
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <h1 className={`text-3xl md:text-5xl font-bold text-primary-navy mb-6 leading-relaxed-heading ${visible ? 'animate-fade-up' : ''}`}>
            Save More, Prepare Better
          </h1>
          <p className={`text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed-body ${visible ? 'animate-fade-up stagger-2' : ''}`}>
            Combine subjects and preparation types to maximize your savings while giving your child comprehensive exam preparation.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${visible ? 'animate-fade-up stagger-3' : ''}`}>
            <Link to="/exam-preparation">
              <Button size="lg">Start with a Subject</Button>
            </Link>
            <Link to="/prompts">
              <Button size="lg" variant="secondary">Browse Prompt Packs</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-4">
          Bundle Savings Options
        </h2>
        <p className="text-base text-gray-700 text-center mb-12 max-w-2xl mx-auto leading-relaxed-body">
          The more you combine, the more you save. Choose the bundle concept that matches your preparation needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bundleConcepts.map((bundle, index) => {
            const Icon = bundle.icon;
            return (
              <Card
                key={bundle.title}
                className={`p-8 flex flex-col ${
                  bundle.popular ? 'border-2 border-primary-accent shadow-lg' : ''
                } ${bundle.bestValue ? 'border-2 border-green-500 shadow-lg' : ''} ${
                  visible ? `animate-fade-up stagger-${index + 1}` : ''
                }`}
              >
                {bundle.popular && (
                  <Badge className="self-start mb-4">Most Popular</Badge>
                )}
                {bundle.bestValue && (
                  <Badge variant="success" className="self-start mb-4">Best Value</Badge>
                )}
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-orange-600" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-primary-navy mb-2">{bundle.title}</h3>
                <p className="text-base text-gray-600 mb-4 leading-relaxed-body">{bundle.description}</p>
                <div className="mb-6">
                  <Badge variant="success" className="text-base">{bundle.savings}</Badge>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {bundle.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-base text-gray-700">
                      <CheckCircle className="w-5 h-5 text-primary-accent mr-2 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-12">
            How Bundle Savings Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary-navy mb-4">Example: Mathematics Complete Package</h3>
              <div className="space-y-3 text-base text-gray-700">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span>Mathematics Exam Prep Package</span>
                  <span className="font-semibold">₹299</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span>Mathematics AI Prompt Package</span>
                  <span className="font-semibold">₹199</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold">Bundle Price</span>
                  <div className="text-right">
                    <div className="line-through text-gray-500">₹498</div>
                    <div className="font-bold text-green-600 text-xl">₹423</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 italic">Save ₹75 with the Complete Subject Package</p>
            </Card>
            <Card className="p-8 border-2 border-green-500">
              <h3 className="text-xl font-bold text-primary-navy mb-4">Example: All-Subject Complete Bundle</h3>
              <div className="space-y-3 text-base text-gray-700">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span>Four Exam Prep Packages</span>
                  <span className="font-semibold">₹1,196</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span>Four AI Prompt Packages</span>
                  <span className="font-semibold">₹796</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold">Bundle Price</span>
                  <div className="text-right">
                    <div className="line-through text-gray-500">₹1,992</div>
                    <div className="font-bold text-green-600 text-xl">₹1,394</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 italic">Save ₹598 with the All-Subject Complete Bundle</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-12">
          Start with Any Subject
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <Card key={subject.name} hover className={`p-6 h-full ${visible ? `animate-fade-up stagger-${(index % 4) + 1}` : ''}`}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-orange-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-navy">{subject.name}</h3>
                </div>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <p className="text-base text-gray-700 mb-6 leading-relaxed-body max-w-2xl mx-auto">
            Purchase subjects individually and combine them for maximum preparation. The more you add, the more you save.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/exam-preparation">
              <Button size="lg">Choose Exam Prep Subject</Button>
            </Link>
            <Link to="/prompts">
              <Button size="lg" variant="secondary">Choose Prompt Pack Subject</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-yellow-50 to-orange-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 border-2 border-orange-500">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-10 h-10 text-white" aria-hidden="true" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h2 className="text-2xl font-bold text-primary-navy mb-3">
                  Limited-Time Introductory Pricing
                </h2>
                <p className="text-base text-gray-700 leading-relaxed-body mb-4">
                  These bundle savings are available for a limited time as we onboard our first batch of CBSE Class 10 students.
                  Secure your bundle at introductory prices before they increase.
                </p>
                <p className="text-base text-gray-700 leading-relaxed-body">
                  Start with one subject today and add more subjects later. Bundle discounts apply automatically as you build your preparation package.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 bg-primary-light">
          <h2 className="text-2xl font-bold text-primary-navy mb-4 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-accent text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-primary-navy mb-2">Choose Your Subjects</h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                Select the subjects you need for exam preparation
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-accent text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-primary-navy mb-2">Add Preparation Types</h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                Combine Exam Prep Packages with AI Prompt Packages
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-accent text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-primary-navy mb-2">Save Automatically</h3>
              <p className="text-base text-gray-700 leading-relaxed-body">
                Bundle discounts applied, lifetime access granted
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/exam-preparation">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </Card>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-8 border-2 border-primary-blue">
          <h2 className="text-2xl font-bold text-primary-navy mb-4 text-center">
            A Note to Parents
          </h2>
          <p className="text-base text-gray-700 leading-relaxed-body mb-4">
            We understand that Board exams are stressful, and every rupee matters. That is why we designed bundle options
            that give you maximum value while ensuring your child gets comprehensive preparation.
          </p>
          <p className="text-base text-gray-700 leading-relaxed-body mb-4">
            Whether your child needs focused help in one subject or complete preparation across all four subjects, you can
            build the perfect package and save significantly compared to purchasing items separately.
          </p>
          <p className="text-base text-gray-700 leading-relaxed-body">
            No expensive coaching required. No recurring subscriptions. Just clear, affordable exam preparation with lifetime access.
          </p>
        </div>
      </section>
    </div>
  );
}

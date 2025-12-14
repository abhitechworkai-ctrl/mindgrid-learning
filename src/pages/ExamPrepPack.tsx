import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Target, BookMarked, Trophy, Calculator, Beaker, Globe2, BookText, Package, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useState, useEffect } from 'react';

const subjects = [
  {
    name: 'Mathematics',
    icon: Calculator,
    description: 'Formulas, theorems, and problem-solving techniques',
  },
  {
    name: 'Science',
    icon: Beaker,
    description: 'Physics, Chemistry, Biology concepts',
  },
  {
    name: 'Social Science',
    icon: Globe2,
    description: 'History, Geography, Civics, Economics',
  },
  {
    name: 'English',
    icon: BookText,
    description: 'Literature analysis, grammar, writing skills',
  },
];

const tiers = [
  {
    name: 'Essentials',
    description: 'Perfect for quick revision',
    features: [
      'Chapter summaries',
      'Key concepts highlighted',
      'Important formulas and definitions',
    ],
  },
  {
    name: 'Complete',
    description: 'Comprehensive exam preparation',
    features: [
      'Everything in Essentials',
      'Practice questions with solutions',
      'Exam strategies and tips',
      'Previous year question patterns',
    ],
    popular: true,
  },
  {
    name: 'Ultimate',
    description: 'Maximum preparation, maximum confidence',
    features: [
      'Everything in Complete',
      'Advanced problem-solving techniques',
      'Answer writing guidance',
      'Sample papers with marking scheme',
      'Free AI Prompt Package included',
    ],
    bestValue: true,
  },
];

export function ExamPrepPack() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div id="main-content">
      <section className="bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <h1 className={`text-3xl md:text-5xl font-bold text-primary-navy mb-6 leading-relaxed-heading ${visible ? 'animate-fade-up' : ''}`}>
            Complete Exam Preparation Package
          </h1>
          <p className={`text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed-body ${visible ? 'animate-fade-up stagger-2' : ''}`}>
            Structured study materials, practice questions, and exam strategies for CBSE Class 10 Board exams.
            Everything your child needs for confident, scoring-ready preparation.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${visible ? 'animate-fade-up stagger-3' : ''}`}>
            <Link to="/exam-preparation">
              <Button size="lg">Choose Your Subject</Button>
            </Link>
            <Link to="/ai-prompt-pack">
              <Button size="lg" variant="secondary">View AI Prompt Package</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-12">
          What Makes Our Exam Prep Package Different
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookMarked className="w-8 h-8 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-primary-navy mb-3">Structured Materials</h3>
            <p className="text-base text-gray-700 leading-relaxed-body">
              Clear, organized notes that follow the CBSE syllabus chapter by chapter
            </p>
          </Card>
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-primary-navy mb-3">Exam-Focused</h3>
            <p className="text-base text-gray-700 leading-relaxed-body">
              Practice questions designed to match actual CBSE Board exam patterns
            </p>
          </Card>
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-primary-navy mb-3">Scoring Strategies</h3>
            <p className="text-base text-gray-700 leading-relaxed-body">
              Learn how to write answers that get full marks based on marking schemes
            </p>
          </Card>
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-primary-navy mb-3">Lifetime Access</h3>
            <p className="text-base text-gray-700 leading-relaxed-body">
              One-time payment, no subscriptions, access forever for revision anytime
            </p>
          </Card>
        </div>
      </section>

      <section className="bg-primary-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-4">
            Choose Your Preparation Level
          </h2>
          <p className="text-base text-gray-700 text-center mb-12 max-w-2xl mx-auto leading-relaxed-body">
            Three tiers designed to match different exam goals and study styles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <Card key={tier.name} className={`p-8 ${tier.popular ? 'border-2 border-primary-accent shadow-lg' : ''} ${visible ? `animate-fade-up stagger-${index + 1}` : ''}`}>
                {tier.popular && (
                  <Badge className="mb-4">Most Popular</Badge>
                )}
                {tier.bestValue && (
                  <Badge variant="success" className="mb-4">Best Value</Badge>
                )}
                <h3 className="text-2xl font-bold text-primary-navy mb-2">{tier.name}</h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed-body">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-base text-gray-700">
                      <CheckCircle className="w-5 h-5 text-primary-accent mr-2 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/exam-preparation">
              <Button size="lg">Choose Your Subject</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-12">
          Available for All Four Core Subjects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <Card key={subject.name} hover className={`p-6 h-full ${visible ? `animate-fade-up stagger-${(index % 4) + 1}` : ''}`}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-green-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-navy">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 border-2 border-blue-500">
            <h2 className="text-2xl font-bold text-primary-navy mb-4 text-center">
              A Note to Parents: Clear Roadmap for Exam Success
            </h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              Every parent of a Class 10 student worries: Will my child feel confident in the exam hall, or will they freeze and forget everything?
            </p>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              Our Exam Prep Packages give your child a clear roadmap. No confusion, no guesswork. Just structured preparation that builds confidence step by step.
            </p>
            <p className="text-base text-gray-700 leading-relaxed-body mb-4">
              From chapter summaries to practice questions to answer-writing guidance, everything is designed to match what CBSE expects.
              Your child gets scoring-ready notes they can revisit anytime.
            </p>
            <p className="text-base text-gray-700 leading-relaxed-body">
              For the price of a simple family outing, give your child lifetime access to materials that bring calm, clarity, and exam readiness.
              No expensive coaching required.
            </p>
          </Card>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-8 border-2 border-orange-500">
          <div className="text-center">
            <Package className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              Want to Add AI-Powered Study Support?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed-body mb-6 max-w-2xl mx-auto">
              Combine Exam Prep Packages with AI Prompt Packages for comprehensive preparation across all subjects.
            </p>
            <div className="flex justify-center">
              <Link to="/ai-prompt-pack">
                <Button size="lg">View AI Prompt Package</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

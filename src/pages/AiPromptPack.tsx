import { Link } from 'react-router-dom';
import { Brain, Shield, BookOpen, CheckCircle, Sparkles, Target, Calculator, Beaker, Globe2, BookText } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useState, useEffect } from 'react';

const subjects = [
  {
    name: 'Mathematics',
    icon: Calculator,
    promptCount: '100+ prompts',
  },
  {
    name: 'Science',
    icon: Beaker,
    promptCount: '120+ prompts',
  },
  {
    name: 'Social Science',
    icon: Globe2,
    promptCount: '130+ prompts',
  },
  {
    name: 'English',
    icon: BookText,
    promptCount: '90+ prompts',
  },
];

export function AiPromptPack() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div id="main-content">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <h1 className={`text-3xl md:text-5xl font-bold text-primary-navy mb-6 leading-relaxed-heading ${visible ? 'animate-fade-up' : ''}`}>
            AI Prompt Package for Smart Exam Prep
          </h1>
          <p className={`text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed-body ${visible ? 'animate-fade-up stagger-2' : ''}`}>
            Subject-specific prompts to help your child use AI tools safely and effectively for exam preparation.
            Perfect for students who want to learn with AI assistance.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${visible ? 'animate-fade-up stagger-3' : ''}`}>
            <Link to="/prompts">
              <Button size="lg">Browse All Prompt Packs</Button>
            </Link>
            <Link to="/exam-prep-pack">
              <Button size="lg" variant="secondary">View Exam Prep Package</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-12">
          How AI Prompt Packages Help with Exam Prep
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-primary-navy mb-3">Chapter-Wise Organization</h3>
            <p className="text-base text-gray-700 leading-relaxed-body">
              Get prompts organized by chapter for Mathematics, Science, Social Science, and English.
              Ask AI the right questions to understand concepts better.
            </p>
          </Card>
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-blue-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-primary-navy mb-3">Safe AI Usage</h3>
            <p className="text-base text-gray-700 leading-relaxed-body">
              Learn how to use ChatGPT, Gemini, or Claude safely and effectively for exam preparation.
              No cheating, just smarter studying.
            </p>
          </Card>
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-blue-600" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-primary-navy mb-3">Practice Questions</h3>
            <p className="text-base text-gray-700 leading-relaxed-body">
              Use prompts to generate unlimited practice questions, get explanations for difficult topics,
              and create custom study materials.
            </p>
          </Card>
        </div>
      </section>

      <section className="bg-primary-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-4">
            What You Get in Each AI Prompt Package
          </h2>
          <p className="text-base text-gray-700 text-center mb-12 max-w-2xl mx-auto leading-relaxed-body">
            Every AI Prompt Package includes ready-to-use prompts tailored for CBSE Class 10 subjects
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-primary-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-navy mb-2">Chapter Summaries</h3>
                  <p className="text-base text-gray-700 leading-relaxed-body">
                    Prompts to generate clear, concise summaries for every chapter in your syllabus
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-primary-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-navy mb-2">Concept Clarification</h3>
                  <p className="text-base text-gray-700 leading-relaxed-body">
                    Ask AI to explain difficult concepts in simple language with examples
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-primary-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-navy mb-2">Practice Question Generation</h3>
                  <p className="text-base text-gray-700 leading-relaxed-body">
                    Create unlimited practice questions tailored to CBSE exam patterns
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-primary-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-navy mb-2">Answer Writing Guidance</h3>
                  <p className="text-base text-gray-700 leading-relaxed-body">
                    Prompts to help structure answers according to mark allocation and exam expectations
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy text-center mb-12">
          Subject-Wise Prompt Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <Card key={subject.name} hover className={`p-6 h-full ${visible ? `animate-fade-up stagger-${(index % 4) + 1}` : ''}`}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-blue-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-navy">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.promptCount}</p>
                </div>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Link to="/prompts">
            <Button size="lg">View All Prompt Packs</Button>
          </Link>
        </div>
      </section>

      <section className="bg-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 border-2 border-green-500">
            <div className="flex items-start space-x-4">
              <Shield className="w-12 h-12 text-green-600 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-primary-navy mb-4">
                  A Note to Parents: Why AI Prompts Are Safe and Effective
                </h2>
                <p className="text-base text-gray-700 leading-relaxed-body mb-4">
                  Many parents worry about AI tools and whether they promote cheating. Our AI Prompt Packages are designed
                  to help students learn better, not bypass learning.
                </p>
                <p className="text-base text-gray-700 leading-relaxed-body mb-4">
                  These prompts teach your child how to ask the right questions, break down complex topics, and practice
                  effectively. Think of AI as a study companion that is available 24/7 to clarify doubts and generate practice materials.
                </p>
                <p className="text-base text-gray-700 leading-relaxed-body">
                  All prompts are CBSE-aligned and designed to encourage understanding rather than rote memorization.
                  Your child learns to think critically while preparing more efficiently.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-8 border-2 border-orange-500">
          <div className="text-center">
            <Package className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              Need Complete Exam Materials Too?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed-body mb-6 max-w-2xl mx-auto">
              Combine AI Prompt Packages with our Exam Prep Packages for comprehensive preparation across all subjects.
            </p>
            <div className="flex justify-center">
              <Link to="/exam-prep-pack">
                <Button size="lg">View Exam Prep Package</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

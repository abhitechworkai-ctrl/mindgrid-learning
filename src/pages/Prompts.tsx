import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Shield, CheckCircle, Calculator, Beaker, Globe2, BookText } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { supabase } from '../lib/supabase';

interface PromptPack {
  id: string;
  name: string;
  subject: string;
  type: string;
  price: number;
  description: string;
}

const subjectIcons: Record<string, any> = {
  Mathematics: Calculator,
  Science: Beaker,
  'Social Science': Globe2,
  English: BookText,
};

export function Prompts() {
  const [promptPacks, setPromptPacks] = useState<PromptPack[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  useEffect(() => {
    async function fetchPromptPacks() {
      const { data, error } = await supabase
        .from('prompt_packs')
        .select('*')
        .eq('is_active', true)
        .order('subject', { ascending: true });

      if (!error && data) {
        setPromptPacks(data);
      }
      setLoading(false);
    }

    fetchPromptPacks();
  }, []);

  const subjects = ['All', ...Array.from(new Set(promptPacks.map((p) => p.subject)))];
  const filteredPacks = selectedSubject === 'All'
    ? promptPacks
    : promptPacks.filter((p) => p.subject === selectedSubject);

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-light to-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-primary-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 leading-relaxed-heading">
            AI Prompt Packs for CBSE Class 10
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed-body max-w-3xl mx-auto">
            Ask AI the right exam-focused questions. Our chapter-wise and subject-wise prompt packs help students use AI safely and effectively for Board exam preparation.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-primary-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary-navy mb-2">Ready-to-Copy Prompts</h3>
            <p className="text-base text-gray-700 leading-relaxed-body">
              Just copy, paste, and get instant help with concepts, practice, and revision.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Brain className="w-12 h-12 text-primary-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary-navy mb-2">Chapter-wise & Subject-wise</h3>
            <p className="text-base text-gray-700 leading-relaxed-body">
              Organized by CBSE curriculum for targeted preparation.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <Shield className="w-12 h-12 text-primary-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary-navy mb-2">Safe, Exam-Focused AI Usage</h3>
            <p className="text-base text-gray-700 leading-relaxed-body">
              Designed specifically for responsible AI-assisted exam preparation.
            </p>
          </Card>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">
              How Prompt Packs Work
            </h2>
            <p className="text-base text-gray-700 leading-relaxed-body mb-6">
              Each prompt pack contains carefully crafted questions you can ask AI tools like ChatGPT, Claude, or Gemini.
              Here's a sample chapter structure:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border-2 border-primary-light rounded-lg p-4">
                <h4 className="font-semibold text-primary-navy mb-2">1. Concept Clarity</h4>
                <p className="text-sm text-gray-600">Prompts to understand fundamental concepts</p>
              </div>
              <div className="border-2 border-primary-light rounded-lg p-4">
                <h4 className="font-semibold text-primary-navy mb-2">2. Practice Questions</h4>
                <p className="text-sm text-gray-600">Generate practice problems with solutions</p>
              </div>
              <div className="border-2 border-primary-light rounded-lg p-4">
                <h4 className="font-semibold text-primary-navy mb-2">3. Revision Notes</h4>
                <p className="text-sm text-gray-600">Create quick revision summaries</p>
              </div>
              <div className="border-2 border-primary-light rounded-lg p-4">
                <h4 className="font-semibold text-primary-navy mb-2">4. Exam Strategy</h4>
                <p className="text-sm text-gray-600">Tips for solving exam questions</p>
              </div>
            </div>
          </Card>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-6 text-center">
              Browse Prompt Packs
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-6 py-2 rounded-full text-base font-medium transition-colors ${
                    selectedSubject === subject
                      ? 'bg-primary-accent text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Loading prompt packs...</p>
            </div>
          ) : filteredPacks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No prompt packs available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPacks.map((pack) => {
                const Icon = subjectIcons[pack.subject] || Brain;
                return (
                  <Card key={pack.id} className="p-6 flex flex-col">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary-accent" />
                      </div>
                      <Badge>{pack.subject}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-primary-navy mb-2">{pack.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed-body flex-grow">
                      {pack.description}
                    </p>
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-primary-navy">₹{pack.price}</span>
                      <span className="text-sm text-gray-600"> one-time</span>
                    </div>
                    <Link to={`/checkout?promptpack=${pack.id}`}>
                      <Button fullWidth>Purchase Pack</Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-primary-light py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-4">
            A Note to Parents
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed-body mb-6">
            AI tools are becoming increasingly common in education. Our prompt packs teach students
            how to use these tools responsibly and effectively for exam preparation.
          </p>
          <p className="text-base text-gray-600 leading-relaxed-body">
            Each prompt is designed to enhance understanding and practice, not to replace actual studying.
            We focus on using AI as a learning assistant, ensuring your child develops genuine understanding
            of the material.
          </p>
        </div>
      </section>
    </div>
  );
}

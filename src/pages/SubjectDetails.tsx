import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  name: string;
  subject: string;
  pack_type: string;
  price: number;
  original_price?: number;
  features: string[];
  description: string;
  help_text?: string;
}

const subjectNames: Record<string, string> = {
  mathematics: 'Mathematics',
  science: 'Science',
  'social-science': 'Social Science',
  english: 'English',
};

const tierDisplayNames: Record<string, string> = {
  'Basic': 'Essentials Pack',
  'Standard': 'Complete Pack',
  'Premium': 'Ultimate Pack',
};

export function SubjectDetails() {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      if (!subject) return;

      const subjectName = subjectNames[subject.toLowerCase()];
      if (!subjectName) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('subject', subjectName)
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (!error && data) {
        setProducts(data);
        setTimeout(() => setVisible(true), 100);
      }
      setLoading(false);
    }

    fetchProducts();
  }, [subject]);

  const handlePurchase = (productId: string) => {
    navigate(`/checkout?product=${productId}`);
  };

  if (!subject || !subjectNames[subject.toLowerCase()]) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold text-primary-navy">Subject not found</h1>
        <Link to="/exam-preparation">
          <Button className="mt-4">Back to Subjects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div id="main-content">
      <section className="bg-gradient-to-b from-primary-light to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/exam-preparation"
            className="inline-flex items-center text-primary-accent hover:text-primary-blue mb-6 transition-all hover:scale-105 min-h-[44px]"
            aria-label="Back to All Subjects"
          >
            <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
            Back to All Subjects
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-navy mb-4 leading-relaxed-heading animate-fade-up">
            {subjectNames[subject.toLowerCase()]} Exam Preparation
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed-body max-w-3xl animate-fade-up stagger-2">
            Choose the exam preparation pack that matches your exam goals. All packs include structured study materials,
            practice questions, and exam strategies.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products available yet. Check back soon!</p>
          </div>
        ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full md:w-auto">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className={`p-6 md:p-8 flex flex-col w-full md:w-auto ${
                  index === 1 ? 'border-2 border-primary-accent shadow-lg' : ''
                } ${visible ? `animate-fade-up stagger-${index + 1}` : ''}`}
              >
                {index === 1 && (
                  <Badge className="self-start mb-4 animate-bounce-subtle">Most Popular</Badge>
                )}
                {index === 2 && (
                  <Badge variant="success" className="self-start mb-4">Best Value</Badge>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-primary-navy mb-2">
                  {tierDisplayNames[product.pack_type] || product.pack_type}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed-body">{product.description}</p>
                <div className="mb-4">
                  {product.original_price && (
                    <div className="text-base text-gray-500 line-through mb-1">
                      ₹{product.original_price}
                    </div>
                  )}
                  <div>
                    <span className="text-3xl md:text-4xl font-bold text-primary-navy">₹{product.price}</span>
                    <span className="text-base text-gray-600"> one-time</span>
                  </div>
                </div>
                {product.help_text && (
                  <p className="text-xs text-gray-600 italic mb-4">{product.help_text}</p>
                )}
                <ul className="space-y-3 mb-8 flex-grow">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm md:text-base text-gray-700">
                      <Check className="w-5 h-5 text-primary-accent mr-2 flex-shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  fullWidth
                  variant={index === 1 ? 'primary' : 'secondary'}
                  onClick={() => handlePurchase(product.id)}
                >
                  Get Started
                </Button>
                {index === 2 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="bg-blue-50 p-3 rounded-lg mb-3">
                      <p className="text-xs text-primary-navy font-semibold">
                        Bundle Tip: Add the AI Prompt Pack for this subject to complete your preparation bundle.
                      </p>
                    </div>
                    <Link
                      to={`/prompts?subject=${subject}`}
                      className="text-sm text-primary-accent hover:text-primary-blue underline block text-center"
                    >
                      Add AI Prompt Pack for this subject
                    </Link>
                  </div>
                )}
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 leading-relaxed-body max-w-2xl mx-auto">
              <strong>Introductory Launch Offer:</strong> These prices are for a limited time while we onboard our first batch of CBSE Class 10 students. Regular prices will apply later.
            </p>
          </div>
          </>
        )}
      </section>

      <section className="bg-primary-light py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-primary-navy mb-3 text-center">
                Free AI Prompt Pack with Ultimate
              </h3>
              <p className="text-base text-gray-700 leading-relaxed-body text-center mb-4">
                Purchase the Ultimate Pack and get a subject-specific AI Prompt Package absolutely free.
              </p>
              <div className="text-center">
                <Link to="/prompts">
                  <Button variant="secondary" size="sm">Learn About Prompt Packs</Button>
                </Link>
              </div>
            </Card>
            <Card className="p-6 border-2 border-orange-500">
              <h3 className="text-xl font-bold text-primary-navy mb-3 text-center">
                Save More with Bundles
              </h3>
              <p className="text-base text-gray-700 leading-relaxed-body text-center mb-4">
                Need multiple subjects? Check out our bundle options for maximum savings.
              </p>
              <div className="text-center">
                <Link to="/bundles">
                  <Button size="sm">View Bundle Options</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-8 border-2 border-primary-blue">
          <h2 className="text-2xl font-bold text-primary-navy mb-4 text-center">
            A Note to Parents
          </h2>
          <p className="text-base text-gray-700 leading-relaxed-body mb-4">
            Every parent of a Class 10 child worries about the same thing: will my child feel confident in the exam hall, or will they freeze and forget everything?
          </p>
          <p className="text-base text-gray-700 leading-relaxed-body mb-4">
            MindGrid Learning Solutions is designed for parents who want clarity without spending on expensive coaching. Our exam packs give your child a clear roadmap, scoring-ready notes, exam-style practice questions, and answer-writing guidance that matches CBSE expectations.
          </p>
          <p className="text-base text-gray-700 leading-relaxed-body">
            For the price of a simple family outing, your child gets lifetime access to structured, exam-focused material they can revisit anytime. No subscriptions, no hidden fees – just calm, clear preparation.
          </p>
        </div>
      </section>
    </div>
  );
}

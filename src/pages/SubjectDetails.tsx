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

export function SubjectDetails() {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (!subject) return;

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('subject', subjectNames[subject] || '')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchProducts();
  }, [subject]);

  const handlePurchase = (productId: string) => {
    navigate(`/checkout?product=${productId}`);
  };

  if (!subject || !subjectNames[subject]) {
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
    <div>
      <section className="bg-gradient-to-b from-primary-light to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/exam-preparation" className="inline-flex items-center text-primary-accent hover:text-primary-blue mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Subjects
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 leading-relaxed-heading">
            {subjectNames[subject]} Exam Preparation
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed-body max-w-3xl">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <Card key={product.id} className={`p-6 flex flex-col ${index === 1 ? 'border-2 border-primary-accent' : ''}`}>
                {index === 1 && (
                  <Badge className="self-start mb-4">Most Popular</Badge>
                )}
                {index === 2 && (
                  <Badge variant="success" className="self-start mb-4">Best Value</Badge>
                )}
                <h3 className="text-2xl font-bold text-primary-navy mb-2">{product.pack_type}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed-body">{product.description}</p>
                <div className="mb-4">
                  {product.original_price && (
                    <div className="text-base text-gray-500 line-through mb-1">
                      ₹{product.original_price}
                    </div>
                  )}
                  <div>
                    <span className="text-3xl font-bold text-primary-navy">₹{product.price}</span>
                    <span className="text-base text-gray-600"> one-time</span>
                  </div>
                </div>
                {product.help_text && (
                  <p className="text-xs text-gray-600 italic mb-4">{product.help_text}</p>
                )}
                <ul className="space-y-3 mb-8 flex-grow">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <Check className="w-5 h-5 text-primary-accent mr-2 flex-shrink-0" />
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
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-primary-navy mb-4 text-center">
              Free AI Prompt Pack with Premium
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed-body text-center mb-6">
              Purchase the Premium pack and get a subject-specific AI Prompt Pack absolutely free.
              Learn how to use AI tools safely and effectively for exam preparation.
            </p>
            <div className="text-center">
              <Link to="/prompts">
                <Button variant="secondary">Learn About Prompt Packs</Button>
              </Link>
            </div>
          </Card>
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

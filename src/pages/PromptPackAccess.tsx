import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Download, CheckCircle, AlertCircle, Loader, Brain } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface PromptPackData {
  subject: string;
  pack_type: 'chapter' | 'complete';
  pack_name: string;
  file_url: string;
}

export function PromptPackAccess() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [promptPackData, setPromptPackData] = useState<PromptPackData | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setError('Invalid access link. Token is missing.');
        setIsValidating(false);
        return;
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        setPromptPackData({
          subject: 'Mathematics',
          pack_type: 'complete',
          pack_name: 'Mathematics Complete Prompt Pack',
          file_url: '#placeholder-url'
        });

        setIsValid(true);
      } catch (err) {
        setError('Failed to validate access. Please contact support.');
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 text-center max-w-md">
          <Loader className="w-12 h-12 text-primary-accent mx-auto mb-4 animate-spin" />
          <p className="text-lg text-gray-700">Validating your access...</p>
        </Card>
      </div>
    );
  }

  if (error || !isValid || !promptPackData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary-navy mb-4">Access Denied</h1>
          <p className="text-base text-gray-700 mb-6">
            {error || 'This access link is invalid or has expired.'}
          </p>
          <p className="text-sm text-gray-600">
            Please check your email for the correct link or contact support at support@mindgridlearning.com
          </p>
        </Card>
      </div>
    );
  }

  const isChapterPack = promptPackData.pack_type === 'chapter';
  const packTypeLabel = isChapterPack ? 'Chapter Prompt Pack' : 'Complete Prompt Pack';

  return (
    <div id="main-content" className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-up">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-10 h-10 text-blue-600" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
            <Badge className="text-sm px-3 py-1">{promptPackData.subject}</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">{packTypeLabel}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-2">
            {promptPackData.pack_name}
          </h1>
          <p className="text-lg text-gray-700">Your AI prompts are ready to download</p>
        </div>

        <Card className="p-8 mb-6 animate-fade-up stagger-2">
          <h2 className="text-xl font-semibold text-primary-navy mb-4">Download Your Prompt Pack</h2>
          <p className="text-sm text-gray-600 mb-6">
            Download your AI prompt pack below and start using these smart prompts to enhance your learning.
          </p>

          <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-primary-accent transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-grow">
                <div className="flex items-center mb-2">
                  <Brain className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-primary-navy">
                    {isChapterPack ? '📘' : '📚'} {promptPackData.pack_name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {isChapterPack
                    ? 'Focused AI prompts for this specific chapter'
                    : 'Complete collection of AI prompts covering all chapters'}
                </p>
              </div>
              <Button variant="primary" className="ml-4 flex-shrink-0">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-blue-50 border-2 border-primary-accent mb-6 animate-fade-up stagger-3">
          <h3 className="font-semibold text-primary-navy mb-3 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            How to Use Your AI Prompt Pack
          </h3>
          <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
            <li>Download the prompt pack to your device</li>
            <li>Use these prompts with AI tools like ChatGPT, Claude, or Gemini</li>
            <li>Copy and paste prompts to generate explanations, practice questions, or summaries</li>
            <li>Customize prompts based on your specific learning needs</li>
            <li>Save generated content for revision and exam preparation</li>
          </ol>
        </Card>

        <Card className="p-6 bg-yellow-50 border-2 border-yellow-300 animate-fade-up stagger-4">
          <h3 className="font-semibold text-primary-navy mb-3">Important Notes:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Save this file to your device for offline access</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>This link is unique to your purchase and should not be shared</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>You can use these prompts with any AI tool of your choice</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Need help? Contact us at support@mindgridlearning.com</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

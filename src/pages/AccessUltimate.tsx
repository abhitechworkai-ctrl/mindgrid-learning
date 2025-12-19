import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Download, CheckCircle, AlertCircle, Loader, BookOpen } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function AccessUltimate() {
  const { subject } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setError('Invalid access link. Token is missing.');
        setIsValidating(false);
        return;
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
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
          <Loader className="w-12 h-12 text-green-600 mx-auto mb-4 animate-spin" />
          <p className="text-lg text-gray-700">Validating your access...</p>
        </Card>
      </div>
    );
  }

  if (error || !isValid) {
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

  const subjectName = subject?.charAt(0).toUpperCase() + subject?.slice(1);

  return (
    <div id="main-content" className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-fade-up">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-green-600" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
            <Badge className="text-sm px-3 py-1">{subjectName}</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Ultimate Pack</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-2">
            {subjectName} Ultimate Exam Pack
          </h1>
          <p className="text-lg text-gray-700">Your study materials are ready to download</p>
        </div>

        <Card className="p-8 mb-6 animate-fade-up stagger-2">
          <h2 className="text-xl font-semibold text-primary-navy mb-4">Download Your Materials</h2>
          <p className="text-sm text-gray-600 mb-6">
            Download your exam preparation materials below. Materials will be available soon.
          </p>

          <div className="space-y-4">
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-primary-navy">
                      📚 {subjectName} Ultimate Pack
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Complete study materials with additional resources
                  </p>
                </div>
                <Button variant="primary" className="ml-4 flex-shrink-0">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-primary-navy">
                      📘 Complimentary AI Prompt Pack
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Bonus AI prompts for enhanced learning
                  </p>
                </div>
                <Button variant="primary" className="ml-4 flex-shrink-0">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-yellow-50 border-2 border-yellow-300 animate-fade-up stagger-3">
          <h3 className="font-semibold text-primary-navy mb-3">Important Notes:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>Save these files to your device for offline access</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>This link is unique to your purchase and should not be shared</span>
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

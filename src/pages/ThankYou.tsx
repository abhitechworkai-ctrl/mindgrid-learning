import { CheckCircle, Mail } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function ThankYou() {
  const [searchParams] = useSearchParams();
  const [referralCode, setReferralCode] = useState<string>('');
  const [toast, setToast] = useState<string>('');

  useEffect(() => {
    const code = searchParams.get('referralCode');
    if (code) {
      setReferralCode(code);
    }
  }, [searchParams]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const copyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      showToast('Referral code copied!');
    }
  };

  const copyShareText = () => {
    if (referralCode) {
      const text = `🎓 Get 10% OFF on CBSE Class 10 study materials! Use my code: ${referralCode} at https://mindgridlearning.com`;
      navigator.clipboard.writeText(text);
      showToast('Share text copied!');
    }
  };

  return (
    <div id="main-content" className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {toast && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
            {toast}
          </div>
        )}

        <Card className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
            <CheckCircle className="w-12 h-12 text-green-600" aria-hidden="true" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 animate-fade-up">
            Payment Successful!
          </h1>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed-body animate-fade-up stagger-2">
            Thank you for purchasing your Exam Preparation Pack.
          </p>

          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-8 animate-fade-up stagger-3">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-green-600 mr-3" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-primary-navy">Check Your Email</h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed-body">
              We've sent your exam pack access link to the email address you provided during checkout.
              The email will arrive within the next 5 minutes.
            </p>
          </div>

          <div className="space-y-4 text-left text-base text-gray-700 mb-8 animate-fade-up stagger-4">
            <h3 className="font-semibold text-primary-navy text-center mb-4">What to Expect:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Access link will be sent to your email within 5 minutes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Click the link to access your exam preparation materials</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Download and use the materials for your exam preparation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>If you don't receive the email, please check your spam folder</span>
              </li>
            </ul>
          </div>

          {referralCode && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 animate-fade-up stagger-6">
              <h3 className="text-xl font-bold text-green-800 mb-2">
                🎁 Share & Earn FREE Study Materials!
              </h3>

              <p className="text-gray-600 mb-4">
                Share your referral code with friends. When they purchase, you earn rewards!
              </p>

              <div className="bg-white p-4 rounded-lg border border-green-300 mb-4">
                <p className="text-sm text-gray-500 mb-1">Your Referral Code:</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-2xl font-bold text-green-600 tracking-wider">
                    {referralCode}
                  </span>
                  <button
                    onClick={copyReferralCode}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors whitespace-nowrap"
                  >
                    📋 Copy
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`🎓 I just got amazing CBSE Class 10 study materials from MindGrid Learning! Use my referral code *${referralCode}* to get 10% OFF on your purchase! 👉 https://mindgridlearning.com`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-green-500 text-white rounded-lg text-center hover:bg-green-600 transition-colors"
                >
                  📱 Share on WhatsApp
                </a>
                <button
                  onClick={copyShareText}
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  📝 Copy Share Text
                </button>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-700 mb-3">🏆 Your Rewards:</p>
                <div className="space-y-2 text-sm text-left">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                    <span>1st Referral → FREE Chapter-wise Prompt Pack</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                    <span>3rd Referral → FREE Subject-wise Prompt Pack</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">5</span>
                    <span>5th Referral → FREE Exam Pack</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs">🎉</span>
                    <span>10th Referral → Complete Bundle (ALL products!)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6 animate-fade-up stagger-5">
            <p className="text-sm text-gray-600 mb-4">
              Need help? Contact us at support@mindgridlearning.com
            </p>
            <Link to="/">
              <Button variant="secondary">Return to Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

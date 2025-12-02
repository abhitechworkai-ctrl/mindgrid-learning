import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary-navy text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-6 h-6 text-primary-accent" />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">MindGrid Learning</span>
                <span className="text-xs text-gray-400">Solutions</span>
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              Simple, affordable, and effective exam preparation for CBSE Class 10 students.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/exam-preparation" className="text-gray-300 hover:text-primary-accent transition-colors">
                  Exam Preparation Packs
                </Link>
              </li>
              <li>
                <Link to="/prompts" className="text-gray-300 hover:text-primary-accent transition-colors">
                  AI Prompt Packs
                </Link>
              </li>
              <li>
                <Link to="/free-resources" className="text-gray-300 hover:text-primary-accent transition-colors">
                  Free Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-gray-300 hover:text-primary-accent transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-primary-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-primary-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-5 h-5" />
                <span>support@mindgridlearning.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-5 h-5" />
                <span>+91 9895626732</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-base">
            No expensive coaching. One-time affordable packs designed for CBSE Board students.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            &copy; {new Date().getFullYear()} MindGrid Learning Solutions. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            www.mindgridlearning.com
          </p>
        </div>
      </div>
    </footer>
  );
}

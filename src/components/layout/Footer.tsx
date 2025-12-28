import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, Youtube, Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary-navy text-white mt-16 md:mt-24" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-6 h-6 text-primary-accent" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">MindGrid Learning</span>
                <span className="text-xs text-gray-400">Solutions</span>
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed-body">
              Simple, affordable, and effective exam preparation for CBSE Class 10 students.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <nav aria-label="Products">
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/exam-preparation"
                    className="text-gray-300 hover:text-primary-accent transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    Exam Preparation Packs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/prompts"
                    className="text-gray-300 hover:text-primary-accent transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    AI Prompt Packs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/free-resources"
                    className="text-gray-300 hover:text-primary-accent transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    Free Resources
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <nav aria-label="Support">
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-primary-accent transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund-policy"
                    className="text-gray-300 hover:text-primary-accent transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping-policy"
                    className="text-gray-300 hover:text-primary-accent transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-300 hover:text-primary-accent transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-300 hover:text-primary-accent transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:support@mindgridlearning.com"
                  className="hover:text-primary-accent transition-colors duration-200"
                >
                  support@mindgridlearning.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+919895626732"
                  className="hover:text-primary-accent transition-colors duration-200"
                >
                  +91 9895626732
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-400 text-sm font-medium">Follow MindGrid Learning</p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.youtube.com/@MindGridLearningSolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 hover:bg-primary-accent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-accent/50"
                aria-label="Visit our YouTube channel"
              >
                <Youtube className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://www.facebook.com/mindgridlearning/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 hover:bg-primary-accent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-accent/50"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>

              <div className="relative group">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-800/50 cursor-not-allowed opacity-50"
                  aria-label="Instagram - Coming Soon"
                >
                  <Instagram className="w-5 h-5 text-gray-500" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Coming Soon
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>

              <div className="relative group">
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-800/50 cursor-not-allowed opacity-50"
                  aria-label="LinkedIn - Coming Soon"
                >
                  <Linkedin className="w-5 h-5 text-gray-500" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Coming Soon
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-base leading-relaxed-body max-w-2xl mx-auto">
            No expensive coaching. One-time affordable packs designed for CBSE Board students.
          </p>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MindGrid Learning Solutions. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            www.mindgridlearning.com
          </p>
        </div>
      </div>
    </footer>
  );
}

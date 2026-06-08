import { Link } from 'react-router-dom';
import { Mail, Phone, Youtube, Facebook, Instagram, Linkedin, ExternalLink } from 'lucide-react';

function MindGridLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="8" fill="#1A2238" />
      {[10, 20, 30].flatMap((x) =>
        [10, 20, 30].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="white" opacity="0.25" />
        ))
      )}
      <path d="M23 5L13 22h7l-3 13 13-17h-7L23 5z" fill="#F26B1D" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary-navy text-white mt-16 md:mt-24" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <MindGridLogo className="w-9 h-9 flex-shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold tracking-tight">
                  <span className="text-white">Mind</span>
                  <span className="text-primary-orange">Grid</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                  Learning Solutions
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed-body">
              Practical AI skills and affordable exam prep — empowering students and professionals across India.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <nav aria-label="Products">
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.mindgridaiacademy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-orange hover:text-orange-300 transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-1.5 min-h-[32px] font-semibold"
                  >
                    AI Academy
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <Link
                    to="/exam-preparation"
                    className="text-gray-300 hover:text-primary-orange transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    Exam Preparation Packs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/prompts"
                    className="text-gray-300 hover:text-primary-orange transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    AI Prompt Packs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/free-resources"
                    className="text-gray-300 hover:text-primary-orange transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
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
                    className="text-gray-300 hover:text-primary-orange transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund-policy"
                    className="text-gray-300 hover:text-primary-orange transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping-policy"
                    className="text-gray-300 hover:text-primary-orange transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-300 hover:text-primary-orange transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-300 hover:text-primary-orange transition-all duration-200 hover:translate-x-1 inline-block min-h-[32px] flex items-center"
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
                  className="hover:text-primary-orange transition-colors duration-200"
                >
                  support@mindgridlearning.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+919895626732"
                  className="hover:text-primary-orange transition-colors duration-200"
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
                className="group flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 hover:bg-primary-orange transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-orange/40"
                aria-label="Visit our YouTube channel"
              >
                <Youtube className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://www.facebook.com/mindgridlearning/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-11 h-11 rounded-full bg-gray-800 hover:bg-primary-orange transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-orange/40"
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
            Practical AI skills and affordable exam prep — built for ambitious learners across India.
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

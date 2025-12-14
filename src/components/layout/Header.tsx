import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md'
          : 'bg-white shadow-sm'
      }`}
    >
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link
            to="/"
            className="flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95"
            aria-label="MindGrid Learning Home"
          >
            <BookOpen className="w-8 h-8 text-primary-accent" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-primary-navy leading-tight">
                MindGrid Learning
              </span>
              <span className="text-xs text-gray-600">
                CBSE Class 10 Exam Prep
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            <Link
              to="/exam-preparation"
              className="text-base font-semibold text-primary-navy hover:text-[#1A73E8] transition-all duration-[180ms] ease-out hover:-translate-y-[1px] min-h-[44px] flex items-center"
              style={{ letterSpacing: '0.2px' }}
            >
              Exam Packs
            </Link>
            <Link
              to="/prompts"
              className="text-base font-semibold text-primary-navy hover:text-[#1A73E8] transition-all duration-[180ms] ease-out hover:-translate-y-[1px] min-h-[44px] flex items-center"
              style={{ letterSpacing: '0.2px' }}
            >
              Prompt Packs
            </Link>
            <Link
              to="/bundles"
              className="text-base font-semibold text-primary-navy hover:text-[#1A73E8] transition-all duration-[180ms] ease-out hover:-translate-y-[1px] min-h-[44px] flex items-center"
              style={{ letterSpacing: '0.2px' }}
            >
              Bundles
            </Link>
            <Link
              to="/free-resources"
              className="text-base font-semibold text-primary-navy hover:text-[#1A73E8] transition-all duration-[180ms] ease-out hover:-translate-y-[1px] min-h-[44px] flex items-center"
              style={{ letterSpacing: '0.2px' }}
            >
              Free Resources
            </Link>
            <Link
              to="/contact"
              className="text-base font-semibold text-primary-navy hover:text-[#1A73E8] transition-all duration-[180ms] ease-out hover:-translate-y-[1px] min-h-[44px] flex items-center"
              style={{ letterSpacing: '0.2px' }}
            >
              Contact
            </Link>
          </nav>

          <button
            className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center transition-transform active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-primary-navy" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-primary-navy" aria-hidden="true" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 animate-fade-in" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-2">
              <Link
                to="/exam-preparation"
                className="text-base font-semibold text-primary-navy hover:text-[#1A73E8] hover:bg-primary-light transition-all duration-[180ms] ease-out py-3 px-4 rounded-md min-h-[48px] flex items-center"
                style={{ letterSpacing: '0.2px' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Exam Packs
              </Link>
              <Link
                to="/prompts"
                className="text-base font-semibold text-primary-navy hover:text-[#1A73E8] hover:bg-primary-light transition-all duration-[180ms] ease-out py-3 px-4 rounded-md min-h-[48px] flex items-center"
                style={{ letterSpacing: '0.2px' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Prompt Packs
              </Link>
              <Link
                to="/bundles"
                className="text-base font-semibold text-primary-navy hover:text-[#1A73E8] hover:bg-primary-light transition-all duration-[180ms] ease-out py-3 px-4 rounded-md min-h-[48px] flex items-center"
                style={{ letterSpacing: '0.2px' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Bundles
              </Link>
              <Link
                to="/free-resources"
                className="text-base font-semibold text-primary-navy hover:text-[#1A73E8] hover:bg-primary-light transition-all duration-[180ms] ease-out py-3 px-4 rounded-md min-h-[48px] flex items-center"
                style={{ letterSpacing: '0.2px' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Free Resources
              </Link>
              <Link
                to="/contact"
                className="text-base font-semibold text-primary-navy hover:text-[#1A73E8] hover:bg-primary-light transition-all duration-[180ms] ease-out py-3 px-4 rounded-md min-h-[48px] flex items-center"
                style={{ letterSpacing: '0.2px' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

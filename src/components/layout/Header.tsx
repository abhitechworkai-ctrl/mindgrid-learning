import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';

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
      {/* 3×3 dot grid */}
      {[10, 20, 30].flatMap((x) =>
        [10, 20, 30].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="white" opacity="0.25" />
        ))
      )}
      {/* Lightning bolt */}
      <path d="M23 5L13 22h7l-3 13 13-17h-7L23 5z" fill="#F26B1D" />
    </svg>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass =
    'text-base font-semibold text-primary-navy hover:text-primary-orange transition-all duration-[180ms] ease-out hover:-translate-y-[1px] min-h-[44px] flex items-center';

  const mobileNavLinkClass =
    'text-base font-semibold text-primary-navy hover:text-primary-orange hover:bg-primary-light transition-all duration-[180ms] ease-out py-3 px-4 rounded-md min-h-[48px] flex items-center';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'
      }`}
    >
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link
            to="/"
            className="flex items-center space-x-3 transition-transform hover:scale-105 active:scale-95"
            aria-label="MindGrid Learning Home"
          >
            <MindGridLogo className="w-9 h-9 flex-shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="text-lg md:text-xl font-bold tracking-tight">
                <span className="text-primary-navy">Mind</span>
                <span className="text-primary-orange">Grid</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-primary-slate font-medium">
                Learning Solutions
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            <a
              href="https://www.mindgridaiacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-base font-bold text-primary-orange hover:text-orange-600 transition-all duration-[180ms] ease-out hover:-translate-y-[1px] min-h-[44px] px-3 py-1.5 rounded-lg border border-primary-orange/30 hover:border-primary-orange hover:bg-orange-50"
              style={{ letterSpacing: '0.2px' }}
            >
              AI Courses
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <Link to="/exam-preparation" className={navLinkClass} style={{ letterSpacing: '0.2px' }}>
              Exam Prep
            </Link>
            <Link to="/free-resources" className={navLinkClass} style={{ letterSpacing: '0.2px' }}>
              Free Resources
            </Link>
            <Link to="/contact" className={navLinkClass} style={{ letterSpacing: '0.2px' }}>
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
          <nav
            className="md:hidden py-4 border-t border-gray-200 animate-fade-in"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-2">
              <a
                href="https://www.mindgridaiacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base font-bold text-primary-orange hover:bg-orange-50 transition-all duration-[180ms] ease-out py-3 px-4 rounded-md min-h-[48px]"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Courses
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                to="/exam-preparation"
                className={mobileNavLinkClass}
                style={{ letterSpacing: '0.2px' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Exam Prep
              </Link>
              <Link
                to="/free-resources"
                className={mobileNavLinkClass}
                style={{ letterSpacing: '0.2px' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Free Resources
              </Link>
              <Link
                to="/contact"
                className={mobileNavLinkClass}
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

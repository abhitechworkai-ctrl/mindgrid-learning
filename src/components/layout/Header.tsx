import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary-accent" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-primary-navy leading-tight">
                MindGrid Learning
              </span>
              <span className="text-xs text-gray-600">
                CBSE Class 10 Exam Prep
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/exam-preparation"
              className="text-base text-primary-navy hover:text-primary-accent transition-colors"
            >
              Exam Packs
            </Link>
            <Link
              to="/prompts"
              className="text-base text-primary-navy hover:text-primary-accent transition-colors"
            >
              Prompt Packs
            </Link>
            <Link
              to="/free-resources"
              className="text-base text-primary-navy hover:text-primary-accent transition-colors"
            >
              Free Resources
            </Link>
            <Link
              to="/contact"
              className="text-base text-primary-navy hover:text-primary-accent transition-colors"
            >
              Contact
            </Link>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-primary-navy" />
            ) : (
              <Menu className="w-6 h-6 text-primary-navy" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/exam-preparation"
                className="text-base text-primary-navy hover:text-primary-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Exam Packs
              </Link>
              <Link
                to="/prompts"
                className="text-base text-primary-navy hover:text-primary-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Prompt Packs
              </Link>
              <Link
                to="/free-resources"
                className="text-base text-primary-navy hover:text-primary-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Free Resources
              </Link>
              <Link
                to="/contact"
                className="text-base text-primary-navy hover:text-primary-accent transition-colors py-2"
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

import { Link } from 'react-router-dom';
import { Calculator, Beaker, Globe2, BookText, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const subjects = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: Calculator,
    description: 'Comprehensive preparation covering Algebra, Geometry, Trigonometry, Statistics, and more',
    topics: ['Real Numbers', 'Polynomials', 'Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions'],
  },
  {
    id: 'science',
    name: 'Science',
    icon: Beaker,
    description: 'Physics, Chemistry, and Biology concepts with practical applications and exam strategies',
    topics: ['Chemical Reactions', 'Electricity', 'Light', 'Life Processes', 'Heredity & Evolution'],
  },
  {
    id: 'social-science',
    name: 'Social Science',
    icon: Globe2,
    description: 'History, Geography, Political Science, and Economics tailored for Board exams',
    topics: ['Nationalism in India', 'Resources & Development', 'Power Sharing', 'Development Economics'],
  },
  {
    id: 'english',
    name: 'English',
    icon: BookText,
    description: 'Literature analysis, grammar mastery, and writing skills for high scores',
    topics: ['Reading Comprehension', 'Writing Skills', 'Literature', 'Grammar', 'Creative Expression'],
  },
];

export function ExamPreparation() {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary-light to-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4 leading-relaxed-heading">
            CBSE Class 10 Exam Preparation Packs
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed-body max-w-3xl mx-auto">
            Choose your subject and select the preparation pack that fits your needs.
            Each pack includes structured study materials, practice questions, and exam strategies.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Card key={subject.id} className="p-6 md:p-8">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-primary-accent" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-primary-navy mb-2">{subject.name}</h2>
                    <p className="text-base text-gray-700 leading-relaxed-body">{subject.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-base font-semibold text-primary-navy mb-2">Key Topics Covered:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {subject.topics.map((topic) => (
                      <li key={topic} className="text-sm text-gray-600 flex items-start">
                        <span className="text-primary-accent mr-2">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to={`/exam-preparation/${subject.id}`}>
                  <Button fullWidth>
                    View Packs
                    <ArrowRight className="w-5 h-5 ml-2 inline" />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-primary-light py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-4">
            A Note to Parents
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed-body mb-6">
            We understand that every rupee matters when it comes to your child's education.
            Our exam preparation packs are designed to be affordable alternatives to expensive coaching classes,
            while providing the same level of comprehensive preparation.
          </p>
          <p className="text-base text-gray-600 leading-relaxed-body">
            Each pack is a one-time purchase with no hidden costs. Your child gets lifetime access
            to all materials, allowing them to prepare at their own pace and revisit topics as needed.
          </p>
        </div>
      </section>
    </div>
  );
}

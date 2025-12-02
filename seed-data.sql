-- Seed data for CBSE Exam Preparation Platform

-- Insert Exam Preparation Products
INSERT INTO products (name, subject, pack_type, price, features, description, is_active) VALUES

-- Mathematics Packs
('Mathematics Basic Pack', 'Mathematics', 'Basic', 499.00,
  '["Complete chapter summaries", "100+ practice questions", "Formula sheets", "Previous year question patterns", "Email support"]',
  'Essential preparation toolkit covering all CBSE Class 10 Mathematics topics with fundamental concepts and practice questions.',
  true),

('Mathematics Standard Pack', 'Mathematics', 'Standard', 899.00,
  '["Everything in Basic Pack", "300+ practice questions with solutions", "Topic-wise tests", "Exam strategy guide", "Video solution links", "WhatsApp support group"]',
  'Comprehensive Mathematics preparation with extensive practice materials and strategic exam guidance for high scores.',
  true),

('Mathematics Premium Pack', 'Mathematics', 'Premium', 1499.00,
  '["Everything in Standard Pack", "500+ advanced practice questions", "Mock test series (5 tests)", "Personalized doubt clearing", "AI Prompt Pack included FREE", "Revision quick cards", "Board exam tips document"]',
  'Complete Mathematics mastery program with advanced materials, mock tests, and personalized support to score 90+.',
  true),

-- Science Packs
('Science Basic Pack', 'Science', 'Basic', 499.00,
  '["Physics, Chemistry & Biology summaries", "100+ practice questions", "Important diagrams collection", "Previous year patterns", "Email support"]',
  'Core Science preparation covering all three subjects with essential concepts and fundamental practice.',
  true),

('Science Standard Pack', 'Science', 'Standard', 899.00,
  '["Everything in Basic Pack", "300+ practice questions", "Practical exam tips", "Diagram practice sheets", "Numerical problem solving guide", "WhatsApp support group"]',
  'Well-rounded Science preparation with practical tips and comprehensive coverage of Physics, Chemistry, and Biology.',
  true),

('Science Premium Pack', 'Science', 'Premium', 1499.00,
  '["Everything in Standard Pack", "500+ advanced questions", "Mock test series (5 tests)", "Lab practical video guides", "AI Prompt Pack included FREE", "Quick revision notes", "Board exam strategy"]',
  'Master all Science subjects with advanced preparation materials and achieve excellence in Board exams.',
  true),

-- Social Science Packs
('Social Science Basic Pack', 'Social Science', 'Basic', 449.00,
  '["History, Geography, Political Science & Economics summaries", "100+ practice questions", "Map work collection", "Previous year patterns", "Email support"]',
  'Foundation preparation covering all Social Science subjects with key concepts and basic practice materials.',
  true),

('Social Science Standard Pack', 'Social Science', 'Standard', 849.00,
  '["Everything in Basic Pack", "300+ practice questions", "Map practice worksheets", "Timeline charts", "Case study practice", "WhatsApp support group"]',
  'Thorough Social Science preparation with enhanced materials for History, Geography, Civics, and Economics.',
  true),

('Social Science Premium Pack', 'Social Science', 'Premium', 1399.00,
  '["Everything in Standard Pack", "500+ questions with answers", "Mock test series (5 tests)", "Source-based question practice", "AI Prompt Pack included FREE", "Quick revision guides", "Answer writing techniques"]',
  'Complete Social Science preparation system designed to help you score 90+ in CBSE Board exams.',
  true),

-- English Packs
('English Basic Pack', 'English', 'Basic', 449.00,
  '["Literature chapter summaries", "Grammar essentials", "Writing format samples", "Reading comprehension practice", "Email support"]',
  'Essential English preparation covering literature, grammar, and writing skills for confident exam performance.',
  true),

('English Standard Pack', 'English', 'Standard', 849.00,
  '["Everything in Basic Pack", "Advanced grammar exercises", "Letter & article writing samples", "Poem analysis guides", "Character sketches", "WhatsApp support group"]',
  'Comprehensive English preparation with detailed literature analysis and enhanced writing practice.',
  true),

('English Premium Pack', 'English', 'Premium', 1399.00,
  '["Everything in Standard Pack", "Mock test series (5 tests)", "Creative writing workshops", "Literature deep-dive guides", "AI Prompt Pack included FREE", "Quick revision cards", "Board exam answer techniques"]',
  'Master English literature, grammar, and writing with premium materials designed for top scores.',
  true);


-- Insert AI Prompt Packs
INSERT INTO prompt_packs (name, subject, chapter, type, price, description, is_active) VALUES

-- Mathematics Prompt Packs
('Mathematics Complete Prompt Pack', 'Mathematics', 'All Chapters', 'subject-wise', 399.00,
  'Ready-to-use AI prompts for all Mathematics chapters covering concept clarity, practice generation, and exam strategies.',
  true),

('Real Numbers AI Prompts', 'Mathematics', 'Real Numbers', 'chapter-wise', 99.00,
  'Focused prompts for understanding Euclid''s algorithm, HCF, LCM, and rational number concepts using AI.',
  true),

('Quadratic Equations AI Prompts', 'Mathematics', 'Quadratic Equations', 'chapter-wise', 99.00,
  'AI prompts for mastering quadratic equations, solving methods, and word problem approaches.',
  true),

-- Science Prompt Packs
('Science Complete Prompt Pack', 'Science', 'All Chapters', 'subject-wise', 399.00,
  'Comprehensive AI prompts covering Physics, Chemistry, and Biology for concept understanding and exam prep.',
  true),

('Chemical Reactions AI Prompts', 'Science', 'Chemical Reactions', 'chapter-wise', 99.00,
  'Targeted prompts for understanding chemical equations, reactions, and balancing techniques.',
  true),

('Electricity AI Prompts', 'Science', 'Electricity', 'chapter-wise', 99.00,
  'AI-powered prompts for circuit problems, Ohm''s law, and electrical calculations.',
  true),

-- Social Science Prompt Packs
('Social Science Complete Prompt Pack', 'Social Science', 'All Chapters', 'subject-wise', 349.00,
  'AI prompts for History, Geography, Political Science, and Economics covering all key topics.',
  true),

('Nationalism in India AI Prompts', 'Social Science', 'Nationalism in India', 'chapter-wise', 89.00,
  'Historical analysis prompts for understanding the freedom movement and key events.',
  true),

('Resources & Development AI Prompts', 'Social Science', 'Resources & Development', 'chapter-wise', 89.00,
  'Geography-focused prompts for resource classification, conservation, and sustainable development.',
  true),

-- English Prompt Packs
('English Complete Prompt Pack', 'English', 'All Chapters', 'subject-wise', 349.00,
  'AI prompts for literature analysis, character development, grammar practice, and creative writing.',
  true),

('Poetry Analysis AI Prompts', 'English', 'Poetry Section', 'chapter-wise', 89.00,
  'Prompts for deep analysis of poems, understanding themes, literary devices, and meanings.',
  true),

('Writing Skills AI Prompts', 'English', 'Writing Section', 'chapter-wise', 89.00,
  'AI prompts for improving letter writing, article writing, and creative composition skills.',
  true);

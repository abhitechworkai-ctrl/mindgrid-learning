/*
  # CBSE Exam Preparation Platform - Core Schema

  ## Overview
  This migration creates the foundational database schema for the CBSE Class 10 Exam Preparation platform, including product catalog, prompt packs, leads capture, and order management.

  ## New Tables

  ### 1. `products` - Exam Preparation Packs
  Stores the main exam preparation products (Basic, Standard, Premium) for each subject.
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product display name
  - `subject` (text) - Subject area (Mathematics, Science, Social Science, English)
  - `pack_type` (text) - Pack tier (Basic, Standard, Premium)
  - `price` (numeric) - Product price in INR
  - `features` (jsonb) - Array of features for comparison table
  - `description` (text) - Detailed product description
  - `external_download_url` (text, nullable) - Link to external product files
  - `is_active` (boolean) - Product availability status
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record update timestamp

  ### 2. `prompt_packs` - AI Prompt Collections
  Stores prompt pack products organized by subject and chapter.
  - `id` (uuid, primary key) - Unique prompt pack identifier
  - `name` (text) - Prompt pack display name
  - `subject` (text) - Subject area
  - `chapter` (text, nullable) - Specific chapter or 'Full Subject' for complete packs
  - `type` (text) - Type classification (chapter-wise, subject-wise)
  - `price` (numeric) - Prompt pack price in INR
  - `description` (text) - Prompt pack description
  - `sample_url` (text, nullable) - Link to free sample preview
  - `external_download_url` (text, nullable) - Link to external prompt files
  - `is_active` (boolean) - Availability status
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record update timestamp

  ### 3. `leads` - Free Resource Lead Capture
  Stores contact information from free resource downloads and lead magnets.
  - `id` (uuid, primary key) - Unique lead identifier
  - `name` (text) - Lead's full name
  - `email` (text) - Lead's email address
  - `phone` (text, nullable) - Optional phone number
  - `source` (text) - Lead source tracking (e.g., 'free-resources', 'homepage')
  - `submitted_at` (timestamptz) - Form submission timestamp
  - `webhook_sent` (boolean) - Make.com webhook delivery status
  - `created_at` (timestamptz) - Record creation timestamp

  ### 4. `orders` - Purchase Orders
  Stores all order transactions including Razorpay payment details.
  - `id` (uuid, primary key) - Unique order identifier
  - `customer_name` (text) - Customer's full name
  - `customer_email` (text) - Customer's email address
  - `customer_phone` (text, nullable) - Optional customer phone
  - `product_type` (text) - Type of product (exam_pack, prompt_pack)
  - `product_id` (uuid, nullable) - Reference to product or prompt pack
  - `subject` (text) - Subject purchased
  - `pack_type` (text, nullable) - Pack tier if applicable
  - `amount` (numeric) - Total order amount in INR
  - `razorpay_order_id` (text, nullable) - Razorpay order ID
  - `razorpay_payment_id` (text, nullable) - Razorpay payment ID
  - `status` (text) - Order status (pending, completed, failed)
  - `webhook_sent` (boolean) - Make.com webhook delivery status
  - `created_at` (timestamptz) - Order creation timestamp
  - `updated_at` (timestamptz) - Order update timestamp

  ## Security
  - Enable Row Level Security on all tables
  - Public read access for products and prompt_packs (authenticated and anonymous users)
  - No public access to leads and orders (admin only)

  ## Indexes
  - Products: subject, pack_type, is_active
  - Prompt packs: subject, type, is_active
  - Leads: email, created_at
  - Orders: customer_email, status, razorpay_payment_id, created_at
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  pack_type text NOT NULL,
  price numeric(10, 2) NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  description text NOT NULL,
  external_download_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create prompt_packs table
CREATE TABLE IF NOT EXISTS prompt_packs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  chapter text,
  type text NOT NULL,
  price numeric(10, 2) NOT NULL,
  description text NOT NULL,
  sample_url text,
  external_download_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  source text NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  webhook_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  product_type text NOT NULL,
  product_id uuid,
  subject text NOT NULL,
  pack_type text,
  amount numeric(10, 2) NOT NULL,
  razorpay_order_id text,
  razorpay_payment_id text,
  status text DEFAULT 'pending',
  webhook_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_subject ON products(subject);
CREATE INDEX IF NOT EXISTS idx_products_pack_type ON products(pack_type);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);

CREATE INDEX IF NOT EXISTS idx_prompt_packs_subject ON prompt_packs(subject);
CREATE INDEX IF NOT EXISTS idx_prompt_packs_type ON prompt_packs(type);
CREATE INDEX IF NOT EXISTS idx_prompt_packs_active ON prompt_packs(is_active);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON orders(razorpay_payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products (public read access)
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- RLS Policies for prompt_packs (public read access)
CREATE POLICY "Prompt packs are viewable by everyone"
  ON prompt_packs FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- RLS Policies for leads (no public access - admin only)
CREATE POLICY "Leads are insertable by everyone"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- RLS Policies for orders (no public access - admin only)
CREATE POLICY "Orders are insertable by everyone"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prompt_packs_updated_at
  BEFORE UPDATE ON prompt_packs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

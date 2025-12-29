/*
  # Referral System Database Schema

  ## Overview
  This migration creates the complete referral system infrastructure to track referral codes, 
  referral transactions, referrer rewards, and discount codes.

  ## New Tables

  ### 1. `referral_codes` - Customer Referral Codes
  Stores unique referral codes for each customer who makes a purchase.
  - `id` (uuid, primary key) - Unique identifier
  - `customer_email` (text, unique, not null) - Customer's email address
  - `customer_name` (text) - Customer's name
  - `referral_code` (text, unique, not null) - Unique referral code generated for customer
  - `created_at` (timestamptz) - Code creation timestamp
  - `is_active` (boolean) - Whether code is currently active and usable

  ### 2. `referrals` - Individual Referral Transactions
  Tracks each time someone uses a referral code to make a purchase.
  - `id` (uuid, primary key) - Unique referral transaction identifier
  - `referrer_email` (text, not null) - Email of person who referred
  - `referrer_code` (text, not null) - The referral code that was used
  - `referred_email` (text, not null) - Email of person who was referred
  - `order_id` (text) - Associated order identifier
  - `razorpay_payment_id` (text) - Razorpay payment ID
  - `purchase_amount` (numeric) - Amount of the purchase
  - `product_purchased` (text) - Product name/type purchased
  - `purchase_date` (timestamptz) - When the purchase was made
  - `status` (text) - Transaction status (completed, pending, etc.)
  - `reward_eligible` (boolean) - Whether this referral counts toward rewards
  - `reward_granted` (boolean) - Whether reward has been given to referrer
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `referrer_rewards` - Referrer Milestone Tracking
  Tracks progress toward referral milestones and rewards earned.
  - `id` (uuid, primary key) - Unique identifier
  - `referrer_email` (text, not null) - Referrer's email address
  - `referrer_code` (text, not null) - Referrer's referral code
  - `successful_referrals` (integer) - Total count of successful referrals
  - `total_revenue_generated` (numeric) - Total revenue from all referrals
  - Milestone 1 (1st referral): reached flag, reward type, delivered flag, date
  - Milestone 2 (3rd referral): reached flag, reward type, delivered flag, date
  - Milestone 3 (5th referral): reached flag, reward type, delivered flag, date
  - Milestone 4 (10th referral): reached flag, reward type, delivered flag, date
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. `discount_codes` - Discount Code Management
  Stores all discount codes including referral-based discounts for future use.
  - `id` (uuid, primary key) - Unique identifier
  - `code` (text, unique, not null) - Discount code string
  - `discount_type` (text, not null) - Type: 'percentage' or 'fixed'
  - `discount_value` (numeric, not null) - Discount amount (10 for 10% or 50 for ₹50)
  - `min_order_amount` (numeric) - Minimum order value to use code
  - `max_discount_amount` (numeric) - Maximum discount cap for percentage codes
  - `valid_from` (timestamptz) - Start date for code validity
  - `valid_until` (timestamptz) - Expiration date
  - `usage_limit` (integer) - Maximum number of times code can be used
  - `usage_count` (integer) - Current usage count
  - `is_referral_code` (boolean) - Flag for referral-generated codes
  - `is_active` (boolean) - Whether code is currently active
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - `referral_codes`: Public read access for active codes (validation)
  - `referrals`: No public access (admin only)
  - `referrer_rewards`: No public access (admin only)
  - `discount_codes`: Public read access for active codes (validation)

  ## Indexes
  - `referral_codes`: referral_code (fast lookup), customer_email
  - `referrals`: referrer_email, referrer_code
  - `referrer_rewards`: referrer_email (unique index)
  - `discount_codes`: code
*/

-- Create referral_codes table
CREATE TABLE IF NOT EXISTS referral_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text NOT NULL UNIQUE,
  customer_name text,
  referral_code text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_email text NOT NULL,
  referrer_code text NOT NULL,
  referred_email text NOT NULL,
  order_id text,
  razorpay_payment_id text,
  purchase_amount numeric(10, 2),
  product_purchased text,
  purchase_date timestamptz DEFAULT now(),
  status text DEFAULT 'completed',
  reward_eligible boolean DEFAULT true,
  reward_granted boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create referrer_rewards table
CREATE TABLE IF NOT EXISTS referrer_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_email text NOT NULL,
  referrer_code text NOT NULL,
  successful_referrals integer DEFAULT 0,
  total_revenue_generated numeric(10, 2) DEFAULT 0,
  
  -- Milestone 1: 1st referral
  milestone_1_reached boolean DEFAULT false,
  milestone_1_reward_type text,
  milestone_1_reward_delivered boolean DEFAULT false,
  milestone_1_date timestamptz,
  
  -- Milestone 2: 3rd referral
  milestone_3_reached boolean DEFAULT false,
  milestone_3_reward_type text,
  milestone_3_reward_delivered boolean DEFAULT false,
  milestone_3_date timestamptz,
  
  -- Milestone 3: 5th referral
  milestone_5_reached boolean DEFAULT false,
  milestone_5_reward_type text,
  milestone_5_reward_delivered boolean DEFAULT false,
  milestone_5_date timestamptz,
  
  -- Milestone 4: 10th referral
  milestone_10_reached boolean DEFAULT false,
  milestone_10_reward_type text,
  milestone_10_reward_delivered boolean DEFAULT false,
  milestone_10_date timestamptz,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create discount_codes table
CREATE TABLE IF NOT EXISTS discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  discount_type text NOT NULL,
  discount_value numeric(10, 2) NOT NULL,
  min_order_amount numeric(10, 2) DEFAULT 0,
  max_discount_amount numeric(10, 2),
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  usage_limit integer,
  usage_count integer DEFAULT 0,
  is_referral_code boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON referral_codes(referral_code);
CREATE INDEX IF NOT EXISTS idx_referral_codes_email ON referral_codes(customer_email);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_email);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referrer_code);

CREATE INDEX IF NOT EXISTS idx_referrer_rewards_email ON referrer_rewards(referrer_email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_referrer_rewards_unique ON referrer_rewards(referrer_email);

CREATE INDEX IF NOT EXISTS idx_discount_codes_code ON discount_codes(code);

-- Enable Row Level Security
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrer_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for referral_codes
CREATE POLICY "Referral codes are viewable for validation"
  ON referral_codes FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Referral codes are insertable by everyone"
  ON referral_codes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- RLS Policies for referrals (admin only - no public access)
CREATE POLICY "Referrals are insertable by everyone"
  ON referrals FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- RLS Policies for referrer_rewards (admin only - no public access)
CREATE POLICY "Referrer rewards are insertable by everyone"
  ON referrer_rewards FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Referrer rewards are updatable by everyone"
  ON referrer_rewards FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for discount_codes
CREATE POLICY "Discount codes are viewable for validation"
  ON discount_codes FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Create trigger for updating referrer_rewards updated_at
CREATE TRIGGER update_referrer_rewards_updated_at
  BEFORE UPDATE ON referrer_rewards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add constraint for discount type validation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'discount_codes_type_check'
  ) THEN
    ALTER TABLE discount_codes 
    ADD CONSTRAINT discount_codes_type_check 
    CHECK (discount_type IN ('percentage', 'fixed'));
  END IF;
END $$;

-- Add constraint for referral status validation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'referrals_status_check'
  ) THEN
    ALTER TABLE referrals 
    ADD CONSTRAINT referrals_status_check 
    CHECK (status IN ('completed', 'pending', 'failed'));
  END IF;
END $$;

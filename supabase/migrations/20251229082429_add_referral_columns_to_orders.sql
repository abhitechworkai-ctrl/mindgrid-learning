/*
  # Add Referral Tracking Columns to Orders Table

  ## Overview
  This migration adds referral system integration to the orders table, enabling 
  tracking of referral codes used, discounts applied, and original pricing.

  ## Changes to orders Table

  ### New Columns Added
  1. referral_code (text) - Stores the referral code used during checkout (if any)
  2. discount_applied (numeric, default 0) - Amount of discount applied to the order in INR
  3. original_amount (numeric) - Original price before any discounts
  4. referred_by_email (text) - Email address of the referrer (person who shared the code)

  ## Security
  - No changes to existing RLS policies
  - New columns inherit existing table security settings

  ## Notes
  - Existing orders will have NULL values for these columns
  - Future orders can optionally populate these fields during checkout
  - discount_applied and original_amount work together to calculate final amount
  - Formula: amount = original_amount - discount_applied
*/

-- Add referral_code column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'referral_code'
  ) THEN
    ALTER TABLE orders ADD COLUMN referral_code text;
  END IF;
END $$;

-- Add discount_applied column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'discount_applied'
  ) THEN
    ALTER TABLE orders ADD COLUMN discount_applied numeric(10, 2) DEFAULT 0;
  END IF;
END $$;

-- Add original_amount column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'original_amount'
  ) THEN
    ALTER TABLE orders ADD COLUMN original_amount numeric(10, 2);
  END IF;
END $$;

-- Add referred_by_email column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'referred_by_email'
  ) THEN
    ALTER TABLE orders ADD COLUMN referred_by_email text;
  END IF;
END $$;

-- Create index for referral code lookups
CREATE INDEX IF NOT EXISTS idx_orders_referral_code ON orders(referral_code);

-- Create index for referred_by_email lookups
CREATE INDEX IF NOT EXISTS idx_orders_referred_by ON orders(referred_by_email);

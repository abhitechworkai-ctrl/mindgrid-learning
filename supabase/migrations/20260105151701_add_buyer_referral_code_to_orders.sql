/*
  # Add buyer referral code column to orders table

  1. Changes
    - Add `buyer_referral_code` column to orders table
      - Stores the NEW referral code generated for the buyer after purchase
      - Different from `referral_code` which stores the code they USED during checkout
    
  2. Purpose
    - Track the buyer's own referral code for sharing
    - Enable webhook to receive the buyer's code
    - Separate "code used" from "code generated"
*/

-- Add buyer_referral_code column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'buyer_referral_code'
  ) THEN
    ALTER TABLE orders ADD COLUMN buyer_referral_code text;
  END IF;
END $$;
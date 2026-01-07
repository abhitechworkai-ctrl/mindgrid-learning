/*
  # Comprehensive Security and Performance Fix

  1. Fix RLS Performance Issue
    - Replace current_setting() with (select current_setting()) in orders policy
  
  2. Remove Unused Indexes
    - idx_referrals_referrer on referrals
    - idx_referrals_code on referrals
    - idx_referrer_rewards_email on referrer_rewards
    - idx_discount_codes_code on discount_codes
    - idx_orders_referral_code on orders (if exists)
    - idx_orders_referred_by on orders (if exists)
  
  3. Fix Overly Permissive RLS Policies
    - Remove policies that use WITH CHECK (true) or USING (true)
    - These allowed unrestricted anon/authenticated access
    - After removal, only service role (edge functions) can insert/update
  
  4. Security Impact
    - High: Removed 6 overly permissive RLS policies
    - Medium: Fixed RLS performance issue
    - Low: Removed unused indexes
*/

-- 1. FIX RLS PERFORMANCE ISSUE ON ORDERS TABLE
-- Drop and recreate the orders SELECT policy with optimized subquery pattern
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (customer_email = (select current_setting('request.jwt.claims', true)::json->>'email'));

-- 2. REMOVE UNUSED INDEXES
DROP INDEX IF EXISTS idx_referrals_referrer;
DROP INDEX IF EXISTS idx_referrals_code;
DROP INDEX IF EXISTS idx_referrer_rewards_email;
DROP INDEX IF EXISTS idx_discount_codes_code;
DROP INDEX IF EXISTS idx_orders_referral_code;
DROP INDEX IF EXISTS idx_orders_referred_by;

-- 3. REMOVE OVERLY PERMISSIVE RLS POLICIES
-- These policies allowed unrestricted access with WITH CHECK (true) or USING (true)
-- After removal, only service role (used by edge functions) can perform these operations

-- Remove overly permissive policy on leads table
DROP POLICY IF EXISTS "Leads are insertable by everyone" ON leads;

-- Remove overly permissive policy on orders table
DROP POLICY IF EXISTS "Orders are insertable by everyone" ON orders;

-- Remove overly permissive policies on referral_codes table
DROP POLICY IF EXISTS "Referral codes are insertable by everyone" ON referral_codes;

-- Remove overly permissive policies on referrals table
DROP POLICY IF EXISTS "Referrals are insertable by everyone" ON referrals;

-- Remove overly permissive policies on referrer_rewards table
DROP POLICY IF EXISTS "Referrer rewards are insertable by everyone" ON referrer_rewards;
DROP POLICY IF EXISTS "Referrer rewards are updatable by everyone" ON referrer_rewards;
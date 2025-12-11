/*
  # Fix Security and Performance Issues

  ## Overview
  This migration addresses critical security and performance issues identified in the database audit.

  ## Changes Made

  ### 1. RLS Performance Optimization
  - **Issue**: The RLS policy on `public.orders` re-evaluates `current_setting()` for each row
  - **Fix**: Replace RLS policy to use subquery `(select ...)` pattern for better performance
  - **Table**: `orders`
  - **Policy**: "Users can view their own orders"

  ### 2. Remove Unused Indexes
  The following indexes have not been used and are being dropped to improve write performance and reduce storage:
  - `idx_orders_created_at` on `orders`
  - `idx_products_subject` on `products`
  - `idx_products_pack_type` on `products`
  - `idx_prompt_packs_subject` on `prompt_packs`
  - `idx_prompt_packs_type` on `prompt_packs`
  - `idx_prompt_packs_active` on `prompt_packs`
  - `idx_leads_email` on `leads`
  - `idx_leads_created_at` on `leads`
  - `idx_orders_email` on `orders`
  - `idx_orders_status` on `orders`
  - `idx_orders_payment_id` on `orders`

  ### 3. Function Security Enhancement
  - **Issue**: Function `update_updated_at_column` has a mutable search_path
  - **Fix**: Set search_path to empty string and use fully qualified function names
  - **Security Impact**: Prevents search_path manipulation attacks

  ## Important Notes
  
  ### Auth DB Connection Strategy (Manual Action Required)
  - **Issue**: Auth server configured with fixed connection count (10) instead of percentage
  - **Action Required**: Update in Supabase Dashboard > Settings > Database > Connection pooling
  - **Recommendation**: Switch to percentage-based allocation for better scalability
  - **Note**: This cannot be automated via migration and requires dashboard configuration
*/

-- Drop the existing RLS policy for orders viewing
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;

-- Recreate the policy with optimized subquery pattern
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (customer_email = (select current_setting('request.jwt.claims', true)::json->>'email'));

-- Drop unused indexes to improve write performance
DROP INDEX IF EXISTS idx_orders_created_at;
DROP INDEX IF EXISTS idx_products_subject;
DROP INDEX IF EXISTS idx_products_pack_type;
DROP INDEX IF EXISTS idx_prompt_packs_subject;
DROP INDEX IF EXISTS idx_prompt_packs_type;
DROP INDEX IF EXISTS idx_prompt_packs_active;
DROP INDEX IF EXISTS idx_leads_email;
DROP INDEX IF EXISTS idx_leads_created_at;
DROP INDEX IF EXISTS idx_orders_email;
DROP INDEX IF EXISTS idx_orders_status;
DROP INDEX IF EXISTS idx_orders_payment_id;

-- Fix function security: set immutable search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
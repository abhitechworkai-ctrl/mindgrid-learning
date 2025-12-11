/*
  # Update Order Status Workflow

  ## Changes
  1. Add support for new order status values
    - `created` - Order created with Razorpay but payment not completed
    - `pending` - Payment initiated (legacy status)
    - `completed` - Payment successful and verified
    - `failed` - Payment failed or verification failed

  ## Notes
  - This migration adds a check constraint to ensure only valid status values
  - The default status for new orders is 'pending' for backward compatibility
  - Razorpay order flow: created -> completed/failed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'orders_status_check'
  ) THEN
    ALTER TABLE orders 
    ADD CONSTRAINT orders_status_check 
    CHECK (status IN ('created', 'pending', 'completed', 'failed'));
  END IF;
END $$;

# Razorpay LIVE Payment Gateway Integration

## Overview

This project now includes a complete Razorpay LIVE payment gateway integration using the Razorpay Orders API. The implementation follows security best practices with server-side order creation and payment verification.

## Architecture

### Backend (Supabase Edge Functions)

Two edge functions have been deployed to handle secure payment operations:

1. **create-order** - Creates Razorpay orders and database records
2. **verify-payment** - Verifies payment signatures and updates order status

### Frontend (React)

- **Checkout Page** - Integrates with backend API and Razorpay Checkout
- **Success Page** - Displays order confirmation
- **Failed Page** - Handles payment failures with retry option

## Configuration

### 1. Environment Variables

Add the following to your `.env` file:

```env
# Razorpay Credentials
VITE_RAZORPAY_KEY_ID=rzp_live_your_key_id
VITE_RAZORPAY_KEY_SECRET=your_key_secret
```

### 2. Supabase Edge Function Secrets

The edge functions automatically access these environment variables:
- `RAZORPAY_KEY_ID` - Your Razorpay Key ID
- `RAZORPAY_KEY_SECRET` - Your Razorpay Key Secret (server-side only)
- `SUPABASE_URL` - Auto-configured
- `SUPABASE_SERVICE_ROLE_KEY` - Auto-configured
- `MAKE_ORDER_WEBHOOK_URL` - Optional webhook for order notifications

### 3. Getting Razorpay Keys

#### Test Mode (for development)
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/signin)
2. Navigate to Settings → API Keys
3. Under "Test Mode", generate/copy your Test Key ID and Secret

#### Live Mode (for production)
1. Complete KYC verification on Razorpay
2. Activate your account
3. Go to Settings → API Keys
4. Switch to "Live Mode"
5. Generate/copy your Live Key ID and Secret

## Payment Flow

### Step 1: User Initiates Payment
- User fills in their details on the checkout page
- Clicks "Pay" button

### Step 2: Backend Creates Order
- Frontend calls `/functions/v1/create-order` API
- Backend validates product details and amount
- Creates Razorpay order using Orders API
- Stores order in database with status `created`
- Returns order details to frontend

### Step 3: Razorpay Checkout Opens
- Frontend opens Razorpay Checkout modal
- User selects payment method and completes payment

### Step 4: Payment Verification
- On success, Razorpay returns payment details
- Frontend calls `/functions/v1/verify-payment` API
- Backend verifies payment signature using HMAC-SHA256
- Updates order status to `completed` or `failed`
- Triggers webhook notification (if configured)

### Step 5: Redirect
- Success: Redirect to `/success?order=<order_id>`
- Failure: Redirect to `/failed?order=<order_id>`

## Order Status Workflow

The order goes through these statuses:

```
created → completed (success)
       → failed (failure)
```

- **created** - Order created with Razorpay, awaiting payment
- **completed** - Payment successful and verified
- **failed** - Payment failed or verification failed
- **pending** - Legacy status (for backward compatibility)

## Security Features

### Server-Side Verification
- All payment amounts are verified server-side
- Payment signatures are verified using HMAC-SHA256
- Razorpay Key Secret is never exposed to frontend

### Protection Against Tampering
- Frontend cannot manipulate payment amounts
- All prices are fetched from database
- Signature verification prevents fake payment confirmations

### Idempotency
- Duplicate payments are detected and prevented
- Orders can only be completed once

## Database Schema

### Orders Table Updates

New migration adds status constraint:

```sql
ALTER TABLE orders
ADD CONSTRAINT orders_status_check
CHECK (status IN ('created', 'pending', 'completed', 'failed'));
```

Fields used for Razorpay integration:
- `razorpay_order_id` - Razorpay order ID
- `razorpay_payment_id` - Razorpay payment ID
- `status` - Order status (created/pending/completed/failed)

## API Endpoints

### POST /functions/v1/create-order

Creates a new Razorpay order.

**Request:**
```json
{
  "productId": "uuid",
  "amount": 299,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "9876543210"
}
```

**Response:**
```json
{
  "orderId": "order_razorpay_id",
  "amount": 299,
  "currency": "INR",
  "keyId": "rzp_live_xxx",
  "databaseOrderId": "uuid"
}
```

### POST /functions/v1/verify-payment

Verifies payment signature and updates order status.

**Request:**
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx",
  "databaseOrderId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "uuid"
}
```

## Testing

### Test Mode

1. Set test keys in `.env`:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
   VITE_RAZORPAY_KEY_SECRET=your_test_secret
   ```

2. Use test card details:
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

3. Test scenarios:
   - Successful payment
   - Failed payment (use test cards from Razorpay docs)
   - Payment cancellation

### Live Mode

1. Switch to live keys in `.env`
2. Test with small amounts first
3. Verify order confirmation emails
4. Check Razorpay dashboard for settlements

## Webhook Integration (Optional)

The system includes webhook support for Make.com or other automation platforms.

When a payment is verified, the system sends order details to:
- `MAKE_ORDER_WEBHOOK_URL` (if configured)

Webhook payload:
```json
{
  "order_id": "uuid",
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "9876543210",
  "product_type": "exam_pack",
  "subject": "Mathematics",
  "pack_type": "Premium",
  "amount": 299,
  "razorpay_payment_id": "pay_xxx",
  "razorpay_order_id": "order_xxx",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Troubleshooting

### Payment Gateway Not Configured
**Error:** "Payment gateway not configured"
**Solution:** Add `VITE_RAZORPAY_KEY_ID` to `.env` file

### Amount Mismatch
**Error:** "Amount mismatch"
**Solution:** Product price in database doesn't match the amount sent. Check product pricing.

### Invalid Signature
**Error:** "Invalid payment signature"
**Solution:** This indicates payment tampering or incorrect secret key. Verify `RAZORPAY_KEY_SECRET`.

### Order Creation Failed
**Error:** "Failed to create order"
**Solution:** Check edge function logs in Supabase dashboard for detailed errors.

## Production Checklist

Before going live:

- [ ] Complete Razorpay KYC verification
- [ ] Activate Razorpay account
- [ ] Switch to LIVE API keys
- [ ] Test end-to-end payment flow
- [ ] Verify webhook delivery
- [ ] Set up order confirmation emails
- [ ] Test failure scenarios
- [ ] Monitor first few transactions
- [ ] Set up payment alerts in Razorpay dashboard
- [ ] Configure automatic settlements

## Support

For Razorpay-related issues:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Support](https://razorpay.com/support/)

For application issues:
- Check Supabase Edge Function logs
- Verify environment variables
- Check browser console for errors
- Contact support@mindgridlearning.com

## Files Modified/Created

### New Files
- `src/pages/Failed.tsx` - Payment failure page
- `supabase/functions/create-order/index.ts` - Order creation edge function
- `supabase/functions/verify-payment/index.ts` - Payment verification edge function
- `supabase/migrations/update_order_status_workflow.sql` - Status constraint migration

### Modified Files
- `src/pages/Checkout.tsx` - Updated to use backend API
- `src/App.tsx` - Added /failed route
- `src/lib/env.ts` - Added Razorpay key secret
- `.env` - Added VITE_RAZORPAY_KEY_SECRET

## Next Steps

1. Add your Razorpay LIVE keys to `.env`
2. Test the payment flow with test keys first
3. Complete Razorpay KYC and switch to live keys
4. Configure webhooks for order notifications
5. Set up email delivery system for download links
6. Monitor payments in Razorpay dashboard

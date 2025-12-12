export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  webhooks: {
    leadUrl: import.meta.env.VITE_MAKE_LEAD_WEBHOOK_URL,
    orderUrl: import.meta.env.VITE_MAKE_ORDER_WEBHOOK_URL,
  },
  razorpay: {
    keyId: import.meta.env.VITE_RAZORPAY_KEY_ID,
  },
};

export function validateEnv() {
  const missing: string[] = [];

  if (!env.supabase.url) missing.push('VITE_SUPABASE_URL');
  if (!env.supabase.anonKey) missing.push('VITE_SUPABASE_ANON_KEY');

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. Please check your .env file.`
    );
  }
}

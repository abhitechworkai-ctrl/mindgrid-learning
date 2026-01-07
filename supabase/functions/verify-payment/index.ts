import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import { createHmac } from "node:crypto";
import Razorpay from "npm:razorpay@2.9.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MINIMUM_REFERRAL_THRESHOLD = 249;

// TEMPORARILY DISABLED - Re-enable for referral system
// Set to true to re-enable the entire referral system
const REFERRAL_ENABLED = false;

interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  databaseOrderId: string;
}

async function generateReferralCode(supabaseClient: any, email: string, name: string) {
  const { data: existing } = await supabaseClient
    .from('referral_codes')
    .select('referral_code')
    .eq('customer_email', email.toLowerCase())
    .maybeSingle();

  if (existing) {
    return existing.referral_code;
  }

  const namePart = name.split(' ')[0].toUpperCase().substring(0, 4);
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const referralCode = `MIND-${namePart}-${randomPart}`;

  await supabaseClient
    .from('referral_codes')
    .insert({
      customer_email: email.toLowerCase(),
      customer_name: name,
      referral_code: referralCode,
      is_active: true
    });

  await supabaseClient
    .from('referrer_rewards')
    .insert({
      referrer_email: email.toLowerCase(),
      referrer_code: referralCode,
      successful_referrals: 0,
      total_revenue_generated: 0
    });

  return referralCode;
}

async function trackReferral(supabaseClient: any, orderData: any) {
  const referralCode = orderData.referral_code;
  if (!referralCode) return null;

  const { data: referrerData } = await supabaseClient
    .from('referral_codes')
    .select('*')
    .eq('referral_code', referralCode)
    .maybeSingle();

  if (!referrerData) return null;

  const isRewardEligible = orderData.amount >= MINIMUM_REFERRAL_THRESHOLD;

  await supabaseClient
    .from('referrals')
    .insert({
      referrer_email: referrerData.customer_email,
      referrer_code: referralCode,
      referred_email: orderData.customer_email,
      order_id: orderData.razorpay_order_id,
      razorpay_payment_id: orderData.razorpay_payment_id,
      purchase_amount: orderData.amount,
      product_purchased: orderData.pack_name || orderData.pack_type,
      status: 'completed',
      reward_eligible: isRewardEligible
    });

  if (!isRewardEligible) {
    return {
      referrer_email: referrerData.customer_email,
      new_count: null,
      milestone_reached: false,
      reward_eligible: false
    };
  }

  const { data: currentStats } = await supabaseClient
    .from('referrer_rewards')
    .select('*')
    .eq('referrer_email', referrerData.customer_email)
    .maybeSingle();

  const newCount = (currentStats?.successful_referrals || 0) + 1;
  const newRevenue = (currentStats?.total_revenue_generated || 0) + orderData.amount;

  const updates: any = {
    successful_referrals: newCount,
    total_revenue_generated: newRevenue,
    updated_at: new Date().toISOString()
  };

  if (newCount >= 1 && !currentStats?.milestone_1_reached) {
    updates.milestone_1_reached = true;
    updates.milestone_1_reward_type = 'chapter-wise-prompt-pack';
    updates.milestone_1_date = new Date().toISOString();
  }

  if (newCount >= 3 && !currentStats?.milestone_3_reached) {
    updates.milestone_3_reached = true;
    updates.milestone_3_reward_type = 'subject-wise-prompt-pack';
    updates.milestone_3_date = new Date().toISOString();
  }

  if (newCount >= 5 && !currentStats?.milestone_5_reached) {
    updates.milestone_5_reached = true;
    updates.milestone_5_reward_type = 'exam-pack';
    updates.milestone_5_date = new Date().toISOString();
  }

  if (newCount >= 10 && !currentStats?.milestone_10_reached) {
    updates.milestone_10_reached = true;
    updates.milestone_10_reward_type = 'complete-bundle';
    updates.milestone_10_date = new Date().toISOString();
  }

  await supabaseClient
    .from('referrer_rewards')
    .update(updates)
    .eq('referrer_email', referrerData.customer_email);

  return {
    referrer_email: referrerData.customer_email,
    new_count: newCount,
    milestone_reached: newCount === 1 || newCount === 3 || newCount === 5 || newCount === 10,
    reward_eligible: true
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error("Razorpay credentials not configured");
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase credentials not configured");
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, databaseOrderId }: VerifyPaymentRequest = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !databaseOrderId) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { data: orderData, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", databaseOrderId)
      .maybeSingle();

    if (fetchError || !orderData) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (orderData.status === "completed") {
      return new Response(
        JSON.stringify({ error: "Payment already processed" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const generatedSignature = createHmac("sha256", razorpayKeySecret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    const isValid = generatedSignature === razorpay_signature;

    if (!isValid) {
      const { error: updateError } = await supabase
        .from("orders")
        .update({ status: "failed" })
        .eq("id", databaseOrderId);

      if (updateError) {
        console.error("Failed to update order status:", updateError);
      }

      return new Response(
        JSON.stringify({ error: "Invalid payment signature" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        razorpay_payment_id: razorpay_payment_id,
        status: "completed",
      })
      .eq("id", databaseOrderId);

    if (updateError) {
      console.error("Failed to update order:", updateError);
      throw new Error("Failed to update order status");
    }

    const isEligibleForReferral = orderData.amount >= MINIMUM_REFERRAL_THRESHOLD;

    // TEMPORARILY DISABLED - Re-enable for referral system
    let buyerReferralCode = null;
    if (REFERRAL_ENABLED && isEligibleForReferral) {
      buyerReferralCode = await generateReferralCode(
        supabase,
        orderData.customer_email,
        orderData.customer_name
      );

      await supabase
        .from("orders")
        .update({ buyer_referral_code: buyerReferralCode })
        .eq("id", databaseOrderId);
    }

    // TEMPORARILY DISABLED - Re-enable for referral system
    const referralTracking = REFERRAL_ENABLED ? await trackReferral(supabase, orderData) : null;

    const webhookUrl = Deno.env.get("MAKE_ORDER_WEBHOOK_URL");
    if (webhookUrl && webhookUrl.trim() !== "" && webhookUrl.toUpperCase() !== "DISABLED") {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: databaseOrderId,
            customer_name: orderData.customer_name,
            customer_email: orderData.customer_email,
            customer_phone: orderData.customer_phone,
            product_type: orderData.product_type,
            subject: orderData.subject,
            pack_type: orderData.pack_type,
            amount: orderData.amount,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            timestamp: new Date().toISOString(),
            buyer_referral_code: buyerReferralCode || "",
            is_eligible_for_referral: isEligibleForReferral,
            referral_used: orderData.referral_code || null,
            referral_reward_eligible: referralTracking?.reward_eligible || false,
            referrer_milestone_reached: referralTracking?.milestone_reached || false,
            referrer_email: referralTracking?.referrer_email || null,
            referrer_new_count: referralTracking?.new_count || 0,
          }),
        });

        await supabase
          .from("orders")
          .update({ webhook_sent: true })
          .eq("id", databaseOrderId);
      } catch (webhookError) {
        console.error("Webhook error:", webhookError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId: databaseOrderId,
        buyerReferralCode: buyerReferralCode || null,
        isEligibleForReferral: isEligibleForReferral,
        referralUsed: orderData.referral_code || null,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import { createHmac } from "node:crypto";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  databaseOrderId: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!razorpayKeySecret) {
      throw new Error("Razorpay secret not configured");
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase credentials not configured");
    }

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

    const webhookUrl = Deno.env.get("MAKE_ORDER_WEBHOOK_URL");
    if (webhookUrl) {
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
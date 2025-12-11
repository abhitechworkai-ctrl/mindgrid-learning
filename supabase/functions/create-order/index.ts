import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Razorpay from "npm:razorpay@2.9.2";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CreateOrderRequest {
  productId?: string;
  promptPackId?: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
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

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { productId, promptPackId, amount, customerName, customerEmail, customerPhone }: CreateOrderRequest = await req.json();

    if (!amount || amount <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid amount" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let productData = null;
    let productType = "";
    let subject = "";
    let packType = null;

    if (productId) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .maybeSingle();

      if (error || !data) {
        return new Response(
          JSON.stringify({ error: "Product not found" }),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (data.price !== amount) {
        return new Response(
          JSON.stringify({ error: "Amount mismatch" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      productData = data;
      productType = "exam_pack";
      subject = data.subject;
      packType = data.pack_type;
    } else if (promptPackId) {
      const { data, error } = await supabase
        .from("prompt_packs")
        .select("*")
        .eq("id", promptPackId)
        .maybeSingle();

      if (error || !data) {
        return new Response(
          JSON.stringify({ error: "Prompt pack not found" }),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (data.price !== amount) {
        return new Response(
          JSON.stringify({ error: "Amount mismatch" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      productData = data;
      productType = "prompt_pack";
      subject = data.subject;
    } else {
      return new Response(
        JSON.stringify({ error: "Product ID or Prompt Pack ID required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        customer_name: customerName,
        customer_email: customerEmail,
        product_type: productType,
        subject: subject,
      },
    });

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone || null,
        product_type: productType,
        product_id: productId || promptPackId,
        subject: subject,
        pack_type: packType,
        amount: amount,
        razorpay_order_id: razorpayOrder.id,
        status: "created",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      throw new Error("Failed to create order in database");
    }

    return new Response(
      JSON.stringify({
        orderId: razorpayOrder.id,
        amount: amount,
        currency: "INR",
        keyId: razorpayKeyId,
        databaseOrderId: orderData.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
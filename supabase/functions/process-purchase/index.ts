import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { itemId, buyerId, priceCredits } = await req.json();

    if (!itemId || !buyerId || !priceCredits) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Start transaction - check user credits
    const { data: userCredits, error: creditsError } = await supabaseClient
      .from("user_credits")
      .select("balance")
      .eq("user_id", buyerId)
      .single();

    if (creditsError) {
      if (creditsError.code === "PGRST116") {
        // No credits record exists, create one with 0 balance
        await supabaseClient
          .from("user_credits")
          .insert({ user_id: buyerId, balance: 0 });
        
        return new Response(
          JSON.stringify({ error: "Insufficient credits. Please add credits to your account." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw creditsError;
    }

    if (userCredits.balance < priceCredits) {
      return new Response(
        JSON.stringify({ error: "Insufficient credits" }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get marketplace item details
    const { data: item, error: itemError } = await supabaseClient
      .from("marketplace_items")
      .select("*, mutations(id, original_code, mutated_code, description)")
      .eq("id", itemId)
      .single();

    if (itemError) throw itemError;

    // Deduct credits
    const { error: deductError } = await supabaseClient
      .from("user_credits")
      .update({ balance: userCredits.balance - priceCredits })
      .eq("user_id", buyerId);

    if (deductError) throw deductError;

    // Add credits to seller (if different from buyer)
    if (item.seller_id !== buyerId) {
      const { data: sellerCredits } = await supabaseClient
        .from("user_credits")
        .select("balance")
        .eq("user_id", item.seller_id)
        .single();

      if (sellerCredits) {
        await supabaseClient
          .from("user_credits")
          .update({ balance: sellerCredits.balance + priceCredits })
          .eq("user_id", item.seller_id);
      } else {
        await supabaseClient
          .from("user_credits")
          .insert({ user_id: item.seller_id, balance: priceCredits });
      }
    }

    // Create transaction record
    const { data: transaction, error: txError } = await supabaseClient
      .from("marketplace_transactions")
      .insert({
        item_id: itemId,
        buyer_id: buyerId,
        seller_id: item.seller_id,
        price_credits: priceCredits,
        transaction_type: "purchase",
      })
      .select()
      .single();

    if (txError) throw txError;

    console.log("Purchase completed:", transaction.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        transactionId: transaction.id,
        mutation: item.mutations 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in process-purchase:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

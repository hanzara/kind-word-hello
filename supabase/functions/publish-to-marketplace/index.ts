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
    const { mutationId, priceCredits } = await req.json();

    if (!mutationId) {
      return new Response(
        JSON.stringify({ error: "Mutation ID is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get mutation details and test results
    const { data: mutation, error: mutationError } = await supabaseClient
      .from("mutations")
      .select(`
        *,
        mutation_tests (
          test_results,
          cpu_usage,
          memory_usage,
          latency_ms,
          pass_rate,
          cost_per_request
        )
      `)
      .eq("id", mutationId)
      .single();

    if (mutationError) throw mutationError;

    if (mutation.status !== "success") {
      return new Response(
        JSON.stringify({ error: "Only successful mutations can be published" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate AI description and title
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a marketplace listing generator. Create compelling titles and descriptions for code mutations.
            
Return JSON with:
- title: catchy title (max 60 chars)
- description: clear value proposition (max 200 chars)
- suggested_price: credits value (10-100)
- performance_gain: estimated % improvement
- cost_reduction: estimated % cost savings`
          },
          {
            role: "user",
            content: `Generate marketplace listing for:

Type: ${mutation.mutation_type}
Description: ${mutation.description}
Confidence: ${mutation.confidence_score}%
Test Results: ${JSON.stringify(mutation.mutation_tests?.[0] || {})}

Original Code:
${mutation.original_code?.substring(0, 500)}

Mutated Code:
${mutation.mutated_code?.substring(0, 500)}`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices[0].message.content;
    
    let listingData;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      listingData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      listingData = null;
    }

    // Create marketplace listing
    const { data: listing, error: listingError } = await supabaseClient
      .from("marketplace_items")
      .insert({
        mutation_id: mutationId,
        seller_id: mutation.repo_id, // Using repo_id as seller for now
        title: listingData?.title || `${mutation.mutation_type} Optimization`,
        description: listingData?.description || mutation.description,
        mutation_type: mutation.mutation_type,
        price_credits: priceCredits || listingData?.suggested_price || 50,
        performance_gain: listingData?.performance_gain || 0,
        cost_reduction: listingData?.cost_reduction || 0,
        benchmark_data: mutation.mutation_tests?.[0] || {},
        status: "published",
      })
      .select()
      .single();

    if (listingError) throw listingError;

    console.log("Published to marketplace:", listing.id);

    return new Response(
      JSON.stringify({ success: true, listing }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in publish-to-marketplace:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

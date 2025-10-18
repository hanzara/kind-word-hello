import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const { accountId, phoneNumber } = await req.json();

    console.log('Syncing M-Pesa balance for user:', user.id, 'phone:', phoneNumber);

    // Simulate M-Pesa balance (between KES 1,000 - 11,000)
    const simulatedBalance = Math.floor(Math.random() * 10000) + 1000;
    
    console.log('Simulated balance:', simulatedBalance);

    // Update linked account metadata with balance
    const { error: updateError } = await supabaseClient
      .from('linked_accounts')
      .update({
        metadata: {
          balance: simulatedBalance,
          last_synced: new Date().toISOString(),
          sync_type: 'simulated',
        }
      })
      .eq('id', accountId)
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error updating account metadata:', updateError);
      throw updateError;
    }

    // Update user's central wallet balance
    const { data: wallet, error: walletError } = await supabaseClient
      .from('user_central_wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single();

    if (!walletError && wallet) {
      await supabaseClient
        .from('user_central_wallets')
        .update({ balance: simulatedBalance })
        .eq('user_id', user.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        balance: simulatedBalance,
        message: 'Balance synced successfully',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error syncing M-Pesa balance:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

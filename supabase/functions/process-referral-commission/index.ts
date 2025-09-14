import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CommissionRequest {
  user_id: string;
  plan_price: number;
  plan_name: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { user_id, plan_price, plan_name }: CommissionRequest = await req.json();

    console.log(`Processing referral commission for user ${user_id}, plan: ${plan_name}, price: $${plan_price}`);

    // Verificar se este usuário foi referenciado por alguém
    const { data: referral, error: referralError } = await supabase
      .from('referrals')
      .select('*')
      .eq('referred_user_id', user_id)
      .single();

    if (referralError) {
      console.log('No referral found for user:', user_id);
      return new Response(
        JSON.stringify({ success: true, message: 'No referral found' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calcular comissão de 5%
    const commissionAmount = plan_price * 0.05;
    const releaseDate = new Date();
    releaseDate.setDate(releaseDate.getDate() + 30); // 30 dias a partir de agora

    // Atualizar o referral com informações da comissão
    const { error: updateError } = await supabase
      .from('referrals')
      .update({
        is_vip_subscriber: true,
        vip_subscription_date: new Date().toISOString(),
        commission_earned: commissionAmount,
        commission_release_date: releaseDate.toISOString()
      })
      .eq('id', referral.id);

    if (updateError) {
      throw updateError;
    }

    // Criar notificação para o criador
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        user_id: referral.creator_id,
        type: 'commission_earned',
        title: '💰 Comissão Ganha!',
        message: `Você ganhou $${commissionAmount.toFixed(2)} de comissão! Um usuário indicado por você se tornou VIP (${plan_name}). O pagamento será liberado em 30 dias.`,
        credits_amount: Math.floor(commissionAmount * 100) // Converter para créditos também
      });

    if (notificationError) {
      console.error('Error creating notification:', notificationError);
    }

    console.log(`Commission processed: $${commissionAmount} for creator ${referral.creator_id}`);

    return new Response(
      JSON.stringify({
        success: true,
        commission_amount: commissionAmount,
        release_date: releaseDate.toISOString(),
        creator_id: referral.creator_id
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error processing referral commission:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
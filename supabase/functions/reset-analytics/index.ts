import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No authorization header provided");
      return new Response(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with user's token
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // First verify the user with their JWT
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
    
    if (userError || !user) {
      console.error("User verification failed:", userError);
      return new Response(
        JSON.stringify({ error: "Usuário não autenticado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`User ${user.id} attempting to reset analytics`);

    // Use service role to check admin status and perform deletions
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (roleError || !roleData) {
      console.error("User is not an admin:", roleError);
      return new Response(
        JSON.stringify({ error: "Acesso negado. Apenas administradores podem executar esta ação." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Admin ${user.id} confirmed, proceeding with reset`);

    // Parse request body
    const body = await req.json().catch(() => ({}));
    const resetPageViews = body.pageViews !== false; // default true
    const resetWhatsAppClicks = body.whatsappClicks !== false; // default true

    let deletedPageViews = 0;
    let deletedWhatsAppClicks = 0;

    // Delete page views
    if (resetPageViews) {
      const { data: pageViewsData, error: pvError } = await supabaseAdmin
        .from("page_views")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000") // Delete all
        .select();

      if (pvError) {
        console.error("Error deleting page views:", pvError);
        throw new Error(`Erro ao deletar page views: ${pvError.message}`);
      }
      deletedPageViews = pageViewsData?.length || 0;
      console.log(`Deleted ${deletedPageViews} page views`);
    }

    // Delete WhatsApp clicks
    if (resetWhatsAppClicks) {
      const { data: clicksData, error: wcError } = await supabaseAdmin
        .from("whatsapp_clicks")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000") // Delete all
        .select();

      if (wcError) {
        console.error("Error deleting WhatsApp clicks:", wcError);
        throw new Error(`Erro ao deletar cliques WhatsApp: ${wcError.message}`);
      }
      deletedWhatsAppClicks = clicksData?.length || 0;
      console.log(`Deleted ${deletedWhatsAppClicks} WhatsApp clicks`);
    }

    console.log(`Reset complete by admin ${user.id}: ${deletedPageViews} page views, ${deletedWhatsAppClicks} WhatsApp clicks`);

    return new Response(
      JSON.stringify({
        success: true,
        deleted: {
          pageViews: deletedPageViews,
          whatsappClicks: deletedWhatsAppClicks,
        },
        message: `Dados resetados com sucesso. Deletados: ${deletedPageViews} page views, ${deletedWhatsAppClicks} cliques WhatsApp.`,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in reset-analytics:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro interno do servidor";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

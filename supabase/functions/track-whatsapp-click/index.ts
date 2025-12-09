import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting simples
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30; // 30 cliques por minuto por IP
const RATE_WINDOW = 60000; // 1 minuto

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

function sanitizeString(str: unknown, maxLength: number): string | null {
  if (typeof str !== 'string') return null;
  return str.trim().slice(0, maxLength) || null;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(clientIP)) {
      console.log(`[track-whatsapp-click] Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { source, visitor_id, page_path, session_id } = body;

    // Validar e sanitizar dados
    const sanitizedSource = sanitizeString(source, 50) || 'unknown';
    const sanitizedVisitorId = sanitizeString(visitor_id, 100);
    const sanitizedPagePath = sanitizeString(page_path, 200);
    const sanitizedSessionId = sanitizeString(session_id, 100);

    // Criar cliente Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Inserir no banco
    const { error } = await supabase.from('whatsapp_clicks').insert({
      source: sanitizedSource,
      visitor_id: sanitizedVisitorId,
      page_path: sanitizedPagePath,
      session_id: sanitizedSessionId,
    });

    if (error) {
      console.error('[track-whatsapp-click] Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to track click' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[track-whatsapp-click] Click tracked: source=${sanitizedSource}, path=${sanitizedPagePath}`);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[track-whatsapp-click] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

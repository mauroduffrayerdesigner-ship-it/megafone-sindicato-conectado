import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation helpers
function sanitizeString(str: unknown, maxLength: number): string | null {
  if (!str || typeof str !== 'string') return null;
  return str.trim().slice(0, maxLength);
}

function validatePath(path: unknown): boolean {
  return typeof path === 'string' && 
         path.length > 0 && 
         path.length <= 500 &&
         path.startsWith('/');
}

function validateId(id: unknown): boolean {
  return typeof id === 'string' && 
         id.length > 0 && 
         id.length <= 100;
}

// Simple in-memory rate limiting (per edge function instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 60; // Max 60 page views per minute per IP (reasonable for browsing)

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  entry.count++;
  return true;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    if (!checkRateLimit(clientIp)) {
      // Silently accept but don't store - analytics abuse prevention
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { path, referrer, user_agent, visitor_id, session_id } = body;
    
    // Validate required fields
    if (!validatePath(path)) {
      return new Response(
        JSON.stringify({ error: 'Invalid path' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!validateId(visitor_id) || !validateId(session_id)) {
      return new Response(
        JSON.stringify({ error: 'Invalid visitor or session ID' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Sanitize all inputs
    const { error } = await supabase
      .from('page_views')
      .insert([{ 
        path: sanitizeString(path, 500)!,
        referrer: sanitizeString(referrer, 500),
        user_agent: sanitizeString(user_agent, 500),
        visitor_id: sanitizeString(visitor_id, 100)!,
        session_id: sanitizeString(session_id, 100)!
      }]);

    if (error) {
      console.error('Database error:', error.code);
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error tracking page view:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

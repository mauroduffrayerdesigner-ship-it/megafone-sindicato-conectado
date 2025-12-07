import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation helpers
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;

function sanitizeString(str: string | null | undefined, maxLength: number): string | null {
  if (!str || typeof str !== 'string') return null;
  // Trim whitespace and limit length
  return str.trim().slice(0, maxLength);
}

function validateEmail(email: string): boolean {
  return typeof email === 'string' && 
         email.length <= 255 && 
         emailRegex.test(email.trim());
}

function validatePhone(phone: string | null | undefined): boolean {
  if (!phone) return true; // Phone is optional
  return typeof phone === 'string' && phoneRegex.test(phone.trim());
}

// Simple in-memory rate limiting (per edge function instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 5; // Max 5 requests per minute per IP

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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    if (!checkRateLimit(clientIp)) {
      console.warn('Rate limit exceeded for IP:', clientIp);
      return new Response(
        JSON.stringify({ error: 'Muitas requisições. Tente novamente em alguns minutos.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { name, email, phone, organization, service, message } = body;
    
    console.log('Creating lead for:', { email: email?.substring(0, 5) + '***' });

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      console.error('Validation failed: name is required');
      return new Response(
        JSON.stringify({ error: 'Nome é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (name.trim().length > 100) {
      console.error('Validation failed: name too long');
      return new Response(
        JSON.stringify({ error: 'Nome deve ter no máximo 100 caracteres' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!email || !validateEmail(email)) {
      console.error('Validation failed: invalid email format');
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!validatePhone(phone)) {
      console.error('Validation failed: invalid phone format');
      return new Response(
        JSON.stringify({ error: 'Telefone inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeString(name, 100)!,
      email: email.trim().toLowerCase().slice(0, 255),
      phone: sanitizeString(phone, 20),
      organization: sanitizeString(organization, 100),
      service: sanitizeString(service, 100),
      message: sanitizeString(message, 2000),
    };

    // Criar cliente Supabase com service_role (bypassa RLS)
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return new Response(
        JSON.stringify({ error: 'Erro de configuração do servidor' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('leads')
      .insert([{ 
        ...sanitizedData,
        status: 'novo'
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error.code);
      throw error;
    }

    console.log('Lead created successfully:', data.id);

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error creating lead:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'Erro ao processar solicitação' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

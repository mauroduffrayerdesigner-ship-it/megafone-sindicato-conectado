-- Criar tabela para rastrear cliques no WhatsApp
CREATE TABLE public.whatsapp_clicks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    source TEXT NOT NULL DEFAULT 'float_button',
    visitor_id TEXT,
    page_path TEXT,
    session_id TEXT
);

-- Habilitar RLS
ALTER TABLE public.whatsapp_clicks ENABLE ROW LEVEL SECURITY;

-- Política para inserção pública (qualquer visitante pode registrar clique)
CREATE POLICY "Public can insert whatsapp clicks"
ON public.whatsapp_clicks
FOR INSERT
WITH CHECK (true);

-- Política para admins visualizarem os cliques
CREATE POLICY "Admins can view whatsapp clicks"
ON public.whatsapp_clicks
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Criar índice para consultas por data
CREATE INDEX idx_whatsapp_clicks_created_at ON public.whatsapp_clicks(created_at DESC);
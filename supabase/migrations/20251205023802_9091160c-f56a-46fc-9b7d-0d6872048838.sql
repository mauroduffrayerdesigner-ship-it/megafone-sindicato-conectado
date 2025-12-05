-- Criar tabela para registrar visitas de páginas
CREATE TABLE public.page_views (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL,
  referrer text,
  user_agent text,
  visitor_id text,
  session_id text,
  created_at timestamptz DEFAULT now()
);

-- Índices para consultas rápidas
CREATE INDEX idx_page_views_path ON page_views(path);
CREATE INDEX idx_page_views_created_at ON page_views(created_at);
CREATE INDEX idx_page_views_visitor_id ON page_views(visitor_id);

-- RLS: Público pode inserir, apenas admins podem ler
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert page views"
  ON page_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view page views"
  ON page_views FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));
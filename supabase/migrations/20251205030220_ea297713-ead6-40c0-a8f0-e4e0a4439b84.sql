-- Corrigir política de INSERT público na tabela leads
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
CREATE POLICY "Public can insert leads" 
ON public.leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Corrigir política de INSERT público na tabela page_views
DROP POLICY IF EXISTS "Public can insert page views" ON public.page_views;
CREATE POLICY "Public can insert page views" 
ON public.page_views 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Corrigir política de INSERT público na tabela newsletter_subscribers
DROP POLICY IF EXISTS "Public can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Public can subscribe" 
ON public.newsletter_subscribers 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);
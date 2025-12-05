-- Remover a política conflitante de INSERT restrita a admins
-- Esta política está causando conflito com "Public can insert leads"
DROP POLICY IF EXISTS "Admins can insert leads" ON public.leads;
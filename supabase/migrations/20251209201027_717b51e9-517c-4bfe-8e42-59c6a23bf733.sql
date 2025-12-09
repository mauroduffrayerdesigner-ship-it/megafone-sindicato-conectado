-- Permitir que admins deletem page_views
CREATE POLICY "Admins can delete page views"
ON public.page_views
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Permitir que admins deletem whatsapp_clicks  
CREATE POLICY "Admins can delete whatsapp clicks"
ON public.whatsapp_clicks
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
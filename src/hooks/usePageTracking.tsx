import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Não rastrear rotas admin
    if (location.pathname.startsWith("/admin")) {
      return;
    }

    // Gerar ou recuperar visitor_id do localStorage
    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("visitor_id", visitorId);
    }

    // Gerar session_id para esta sessão
    let sessionId = sessionStorage.getItem("session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("session_id", sessionId);
    }

    // Registrar a visita (fire and forget)
    supabase.from("page_views").insert({
      path: location.pathname,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      visitor_id: visitorId,
      session_id: sessionId,
    });
  }, [location.pathname]);
}

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageTracking() {
  const location = useLocation();
  const lastTrackedPath = useRef<string | null>(null);
  const lastTrackedTime = useRef<number>(0);

  useEffect(() => {
    // Não rastrear rotas admin
    if (location.pathname.startsWith("/admin")) {
      return;
    }

    const now = Date.now();
    
    // Debounce: não rastrear se mesma página em menos de 2 segundos
    if (
      location.pathname === lastTrackedPath.current &&
      now - lastTrackedTime.current < 2000
    ) {
      return;
    }

    lastTrackedPath.current = location.pathname;
    lastTrackedTime.current = now;

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

    // Registrar a visita via Edge Function (bypassa RLS)
    supabase.functions.invoke('track-page-view', {
      body: {
        path: location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        visitor_id: visitorId,
        session_id: sessionId,
      }
    }).catch(err => console.error('Error tracking page view:', err));
  }, [location.pathname]);
}

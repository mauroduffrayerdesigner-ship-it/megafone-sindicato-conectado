import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfDay, format, eachDayOfInterval } from "date-fns";

interface AnalyticsParams {
  startDate: Date;
  endDate: Date;
}

export function useAnalytics({ startDate, endDate }: AnalyticsParams) {
  const today = startOfDay(new Date());

  // Total de sessões no período (visitas reais)
  const { data: totalSessions = 0, isLoading: sessionsLoading } = useQuery({
    queryKey: ["analytics", "sessions", startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const { data } = await supabase
        .from("page_views")
        .select("session_id")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString());
      if (!data) return 0;
      return new Set(data.map(d => d.session_id).filter(Boolean)).size;
    },
  });

  // Sessões de hoje
  const { data: todaySessions = 0, isLoading: todaySessionsLoading } = useQuery({
    queryKey: ["analytics", "sessionsToday"],
    queryFn: async () => {
      const { data } = await supabase
        .from("page_views")
        .select("session_id")
        .gte("created_at", today.toISOString());
      if (!data) return 0;
      return new Set(data.map(d => d.session_id).filter(Boolean)).size;
    },
  });

  // Visitantes únicos no período
  const { data: uniqueVisitors = 0, isLoading: uniqueLoading } = useQuery({
    queryKey: ["analytics", "unique", startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const { data } = await supabase
        .from("page_views")
        .select("visitor_id")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString());
      if (!data) return 0;
      return new Set(data.map(d => d.visitor_id).filter(Boolean)).size;
    },
  });

  // Total de page views no período (para calcular páginas/sessão)
  const { data: totalPageViews = 0, isLoading: pageViewsLoading } = useQuery({
    queryKey: ["analytics", "pageViews", startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const { count } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString());
      return count || 0;
    },
  });

  // Sessões por dia no período (para gráfico)
  const { data: sessionsByDay = [], isLoading: byDayLoading } = useQuery({
    queryKey: ["analytics", "sessionsByDay", startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const { data } = await supabase
        .from("page_views")
        .select("created_at, session_id")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString())
        .order("created_at", { ascending: true });

      if (!data) return [];

      // Inicializar todos os dias com Set vazio
      const sessionsByDate: Record<string, Set<string>> = {};
      const days = eachDayOfInterval({ start: startDate, end: endDate });
      days.forEach(day => {
        sessionsByDate[format(day, "dd/MM")] = new Set();
      });

      // Agrupar sessões por dia
      data.forEach(row => {
        const date = format(new Date(row.created_at), "dd/MM");
        if (sessionsByDate[date] && row.session_id) {
          sessionsByDate[date].add(row.session_id);
        }
      });

      return Object.entries(sessionsByDate).map(([date, sessions]) => ({
        date,
        sessions: sessions.size,
      }));
    },
  });

  // Páginas mais visitadas no período
  const { data: topPages = [], isLoading: topPagesLoading } = useQuery({
    queryKey: ["analytics", "topPages", startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const { data } = await supabase
        .from("page_views")
        .select("path")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString());

      if (!data) return [];

      // Agregar por path
      const counts: Record<string, number> = {};
      data.forEach(row => {
        counts[row.path] = (counts[row.path] || 0) + 1;
      });

      return Object.entries(counts)
        .map(([path, views]) => ({ path, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);
    },
  });

  // Calcular páginas por sessão
  const pagesPerSession = totalSessions > 0 
    ? (totalPageViews / totalSessions).toFixed(1) 
    : "0";

  const isLoading = sessionsLoading || todaySessionsLoading || uniqueLoading || pageViewsLoading || byDayLoading || topPagesLoading;

  return { 
    totalSessions,
    todaySessions,
    uniqueVisitors,
    totalPageViews,
    pagesPerSession,
    sessionsByDay,
    topPages,
    isLoading 
  };
}

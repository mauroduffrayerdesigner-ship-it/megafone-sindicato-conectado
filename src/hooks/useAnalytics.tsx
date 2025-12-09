import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfDay, format, eachDayOfInterval } from "date-fns";

interface AnalyticsParams {
  startDate: Date;
  endDate: Date;
}

export function useAnalytics({ startDate, endDate }: AnalyticsParams) {
  const today = startOfDay(new Date());

  // Total de visitas no período
  const { data: totalViews = 0, isLoading: totalLoading } = useQuery({
    queryKey: ["analytics", "total", startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const { count } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString());
      return count || 0;
    },
  });

  // Visitas de hoje
  const { data: todayViews = 0, isLoading: todayLoading } = useQuery({
    queryKey: ["analytics", "today"],
    queryFn: async () => {
      const { count } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString());
      return count || 0;
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
      return new Set(data.map(d => d.visitor_id)).size;
    },
  });

  // Visitas por dia no período
  const { data: viewsByDay = [], isLoading: byDayLoading } = useQuery({
    queryKey: ["analytics", "byDay", startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const { data } = await supabase
        .from("page_views")
        .select("created_at")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString())
        .order("created_at", { ascending: true });

      if (!data) return [];

      // Inicializar todos os dias com 0
      const counts: Record<string, number> = {};
      const days = eachDayOfInterval({ start: startDate, end: endDate });
      days.forEach(day => {
        counts[format(day, "dd/MM")] = 0;
      });

      // Contar visitas por dia
      data.forEach(row => {
        const date = format(new Date(row.created_at), "dd/MM");
        if (counts[date] !== undefined) {
          counts[date]++;
        }
      });

      return Object.entries(counts).map(([date, views]) => ({
        date,
        views,
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

  const isLoading = totalLoading || todayLoading || uniqueLoading || byDayLoading || topPagesLoading;

  return { 
    totalViews, 
    todayViews, 
    uniqueVisitors, 
    viewsByDay, 
    topPages,
    isLoading 
  };
}

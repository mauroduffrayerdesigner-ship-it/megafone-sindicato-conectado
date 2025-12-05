import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfDay, subDays, format } from "date-fns";

export function useAnalytics() {
  const today = startOfDay(new Date());
  const sevenDaysAgo = subDays(today, 7);

  // Total de visitas
  const { data: totalViews = 0, isLoading: totalLoading } = useQuery({
    queryKey: ["analytics", "total"],
    queryFn: async () => {
      const { count } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true });
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

  // Visitantes únicos
  const { data: uniqueVisitors = 0, isLoading: uniqueLoading } = useQuery({
    queryKey: ["analytics", "unique"],
    queryFn: async () => {
      const { data } = await supabase
        .from("page_views")
        .select("visitor_id");
      if (!data) return 0;
      return new Set(data.map(d => d.visitor_id)).size;
    },
  });

  // Visitas por dia (últimos 7 dias)
  const { data: viewsByDay = [], isLoading: byDayLoading } = useQuery({
    queryKey: ["analytics", "byDay"],
    queryFn: async () => {
      const { data } = await supabase
        .from("page_views")
        .select("created_at")
        .gte("created_at", sevenDaysAgo.toISOString())
        .order("created_at", { ascending: true });

      if (!data) return [];

      // Agregar por dia
      const counts: Record<string, number> = {};
      
      // Inicializar todos os dias com 0
      for (let i = 0; i < 7; i++) {
        const date = format(subDays(new Date(), 6 - i), "dd/MM");
        counts[date] = 0;
      }

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

  // Páginas mais visitadas
  const { data: topPages = [], isLoading: topPagesLoading } = useQuery({
    queryKey: ["analytics", "topPages"],
    queryFn: async () => {
      const { data } = await supabase
        .from("page_views")
        .select("path");

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

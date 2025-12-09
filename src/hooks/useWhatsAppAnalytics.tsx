import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays, startOfDay, eachDayOfInterval } from "date-fns";

interface WhatsAppAnalytics {
  totalClicks: number;
  todayClicks: number;
  clicksByDay: { date: string; clicks: number }[];
  clicksBySource: { source: string; count: number }[];
  isLoading: boolean;
}

export function useWhatsAppAnalytics(startDate: Date, endDate: Date): WhatsAppAnalytics {
  const today = startOfDay(new Date());

  // Total de cliques no período
  const { data: totalClicks = 0, isLoading: totalLoading } = useQuery({
    queryKey: ["whatsapp-analytics", "total", startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const { count } = await supabase
        .from("whatsapp_clicks")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString());
      return count || 0;
    },
  });

  // Cliques de hoje
  const { data: todayClicks = 0, isLoading: todayLoading } = useQuery({
    queryKey: ["whatsapp-analytics", "today"],
    queryFn: async () => {
      const { count } = await supabase
        .from("whatsapp_clicks")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString());
      return count || 0;
    },
  });

  // Cliques por dia no período
  const { data: clicksByDay = [], isLoading: byDayLoading } = useQuery({
    queryKey: ["whatsapp-analytics", "byDay", startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const { data } = await supabase
        .from("whatsapp_clicks")
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

      // Contar cliques por dia
      data.forEach(row => {
        const date = format(new Date(row.created_at), "dd/MM");
        if (counts[date] !== undefined) {
          counts[date]++;
        }
      });

      return Object.entries(counts).map(([date, clicks]) => ({
        date,
        clicks,
      }));
    },
  });

  // Cliques por fonte
  const { data: clicksBySource = [], isLoading: bySourceLoading } = useQuery({
    queryKey: ["whatsapp-analytics", "bySource", startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const { data } = await supabase
        .from("whatsapp_clicks")
        .select("source")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString());

      if (!data) return [];

      const counts: Record<string, number> = {};
      data.forEach(row => {
        const source = row.source || 'unknown';
        counts[source] = (counts[source] || 0) + 1;
      });

      return Object.entries(counts)
        .map(([source, count]) => ({ source, count }))
        .sort((a, b) => b.count - a.count);
    },
  });

  const isLoading = totalLoading || todayLoading || byDayLoading || bySourceLoading;

  return {
    totalClicks,
    todayClicks,
    clicksByDay,
    clicksBySource,
    isLoading,
  };
}

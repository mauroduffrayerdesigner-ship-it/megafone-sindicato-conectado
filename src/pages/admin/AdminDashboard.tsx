import { useState, useMemo } from "react";
import { useLeads } from "@/hooks/useLeads";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useNewsletter } from "@/hooks/useNewsletter";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useWhatsAppAnalytics } from "@/hooks/useWhatsAppAnalytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, FileText, Mail, TrendingUp, Clock, Eye, UserCheck, BarChart3, MessageCircle, Download, CalendarIcon } from "lucide-react";
import { ResetAnalyticsDialog } from "@/components/admin/ResetAnalyticsDialog";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

const chartConfig = {
  sessions: {
    label: "Sessões",
    color: "hsl(var(--primary))",
  },
  clicks: {
    label: "WhatsApp",
    color: "hsl(142, 76%, 36%)",
  },
};

type PeriodOption = "7" | "30" | "60" | "90" | "custom";

export default function AdminDashboard() {
  const [period, setPeriod] = useState<PeriodOption>("30");
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>();

  // Calcular datas baseado no período selecionado
  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    const end = endOfDay(now);
    
    if (period === "custom" && customDateRange?.from) {
      return {
        startDate: startOfDay(customDateRange.from),
        endDate: customDateRange.to ? endOfDay(customDateRange.to) : end,
      };
    }
    
    const days = parseInt(period) || 30;
    return {
      startDate: startOfDay(subDays(now, days - 1)),
      endDate: end,
    };
  }, [period, customDateRange]);

  const { leads, isLoading: leadsLoading } = useLeads();
  const { posts, isLoading: postsLoading } = useBlogPosts();
  const { stats, isLoading: newsletterLoading } = useNewsletter();
  const { totalSessions, todaySessions, uniqueVisitors, totalPageViews, pagesPerSession, sessionsByDay, topPages, isLoading: analyticsLoading } = useAnalytics({ startDate, endDate });
  const { totalClicks: whatsappClicks, todayClicks: whatsappTodayClicks, clicksByDay, isLoading: whatsappLoading } = useWhatsAppAnalytics(startDate, endDate);

  const isLoading = leadsLoading || postsLoading || newsletterLoading || analyticsLoading || whatsappLoading;

  // Calcular métricas
  const newLeadsInPeriod = leads.filter(
    lead => new Date(lead.created_at) >= startDate && new Date(lead.created_at) <= endDate
  ).length;

  const publishedPosts = posts.filter(post => post.published).length;

  // Combinar dados de sessões e WhatsApp para o gráfico
  const combinedChartData = useMemo(() => {
    const sessionsMap = new Map(sessionsByDay.map(v => [v.date, v.sessions]));
    const clicksMap = new Map(clicksByDay.map(c => [c.date, c.clicks]));
    
    const allDates = new Set([...sessionsMap.keys(), ...clicksMap.keys()]);
    
    return Array.from(allDates)
      .sort((a, b) => {
        const [dayA, monthA] = a.split('/').map(Number);
        const [dayB, monthB] = b.split('/').map(Number);
        if (monthA !== monthB) return monthA - monthB;
        return dayA - dayB;
      })
      .map(date => ({
        date,
        sessions: sessionsMap.get(date) || 0,
        clicks: clicksMap.get(date) || 0,
      }));
  }, [sessionsByDay, clicksByDay]);

  const statusColors: Record<string, string> = {
    novo: "bg-blue-500/10 text-blue-500",
    em_contato: "bg-yellow-500/10 text-yellow-500",
    convertido: "bg-green-500/10 text-green-500",
    perdido: "bg-red-500/10 text-red-500",
  };

  const statusLabels: Record<string, string> = {
    novo: "Novo",
    em_contato: "Em Contato",
    convertido: "Convertido",
    perdido: "Perdido",
  };

  // Função para exportar CSV
  const exportCSV = () => {
    const periodLabel = period === "custom" 
      ? `${format(startDate, "dd-MM-yyyy")}_${format(endDate, "dd-MM-yyyy")}`
      : `ultimos_${period}_dias`;
    
    // Header
    let csv = "Data,Sessões,Cliques WhatsApp\n";
    
    // Dados combinados
    combinedChartData.forEach(row => {
      csv += `${row.date},${row.sessions},${row.clicks}\n`;
    });
    
    // Resumo
    csv += "\n\nResumo\n";
    csv += `Total de Sessões,${totalSessions}\n`;
    csv += `Visitantes Únicos,${uniqueVisitors}\n`;
    csv += `Page Views,${totalPageViews}\n`;
    csv += `Páginas por Sessão,${pagesPerSession}\n`;
    csv += `Cliques WhatsApp,${whatsappClicks}\n`;
    csv += `Leads no Período,${newLeadsInPeriod}\n`;
    csv += `Taxa de Conversão,${totalSessions > 0 ? ((leads.length / totalSessions) * 100).toFixed(2) : 0}%\n`;
    
    // Páginas mais visitadas
    csv += "\n\nPáginas Mais Visitadas\n";
    csv += "Página,Page Views\n";
    topPages.forEach(page => {
      csv += `${page.path},${page.views}\n`;
    });
    
    // Download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `analytics_${periodLabel}.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral do seu painel administrativo
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={period} onValueChange={(v) => setPeriod(v as PeriodOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="60">Últimos 60 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>

          {period === "custom" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("justify-start text-left font-normal", !customDateRange && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customDateRange?.from ? (
                    customDateRange.to ? (
                      <>
                        {format(customDateRange.from, "dd/MM/yy")} - {format(customDateRange.to, "dd/MM/yy")}
                      </>
                    ) : (
                      format(customDateRange.from, "dd/MM/yyyy")
                    )
                  ) : (
                    <span>Selecione datas</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={customDateRange?.from}
                  selected={customDateRange}
                  onSelect={setCustomDateRange}
                  numberOfMonths={2}
                  disabled={(date) => date > new Date() || date < subDays(new Date(), 365)}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          )}

          <Button variant="outline" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>

          <ResetAnalyticsDialog 
            pageViewsCount={totalPageViews} 
            whatsappClicksCount={whatsappClicks} 
          />
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sessões
            </CardTitle>
            <Eye className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalSessions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +{todaySessions} hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Visitantes Únicos
            </CardTitle>
            <UserCheck className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{uniqueVisitors}</div>
            <p className="text-xs text-muted-foreground mt-1">
              no período
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Págs/Sessão
            </CardTitle>
            <BarChart3 className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pagesPerSession}</div>
            <p className="text-xs text-muted-foreground mt-1">
              média de engajamento
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conversas WhatsApp
            </CardTitle>
            <MessageCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{whatsappClicks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +{whatsappTodayClicks} hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Conversão
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalSessions > 0 ? ((leads.length / totalSessions) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              leads / sessões
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Second Row Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Page Views
            </CardTitle>
            <Eye className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalPageViews}</div>
            <p className="text-xs text-muted-foreground mt-1">
              total de páginas carregadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Leads no Período
            </CardTitle>
            <Users className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{newLeadsInPeriod}</div>
            <p className="text-xs text-muted-foreground mt-1">
              de {leads.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Posts Publicados
            </CardTitle>
            <FileText className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{publishedPosts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              de {posts.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Assinantes Newsletter
            </CardTitle>
            <Mail className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.total} total, {stats.inactive} inativos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Lists */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Combined Sessions + WhatsApp Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sessões e WhatsApp no Período</CardTitle>
          </CardHeader>
          <CardContent>
            {combinedChartData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={combinedChartData}>
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="sessions"
                      name="Sessões"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      name="WhatsApp"
                      stroke="hsl(142, 76%, 36%)"
                      strokeWidth={2}
                      dot={{ fill: "hsl(142, 76%, 36%)", strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Sem dados no período selecionado.
              </p>
            )}
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Sessões</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(142, 76%, 36%)" }} />
                <span className="text-sm text-muted-foreground">WhatsApp</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Páginas Mais Visitadas</CardTitle>
          </CardHeader>
          <CardContent>
            {topPages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Sem dados de páginas ainda.
              </p>
            ) : (
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div
                    key={page.path}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-6">
                        #{index + 1}
                      </span>
                      <span className="font-medium truncate max-w-[200px]">
                        {page.path === "/" ? "Início" : page.path}
                      </span>
                    </div>
                    <Badge variant="secondary">{page.views} visitas</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Leads Recentes</CardTitle>
          <Link 
            to="/admin/leads" 
            className="text-sm text-primary hover:underline"
          >
            Ver todos
          </Link>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nenhum lead cadastrado ainda.
            </p>
          ) : (
            <div className="space-y-4">
              {leads.slice(0, 5).map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{lead.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {lead.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <Badge className={statusColors[lead.status] || statusColors.novo}>
                      {statusLabels[lead.status] || lead.status}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {format(new Date(lead.created_at), "dd/MM", { locale: ptBR })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

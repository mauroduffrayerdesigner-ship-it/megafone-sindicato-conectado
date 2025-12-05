import { useLeads } from "@/hooks/useLeads";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useNewsletter } from "@/hooks/useNewsletter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Mail, TrendingUp, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const { leads, isLoading: leadsLoading } = useLeads();
  const { posts, isLoading: postsLoading } = useBlogPosts();
  const { stats, isLoading: newsletterLoading } = useNewsletter();

  const isLoading = leadsLoading || postsLoading || newsletterLoading;

  // Calcular métricas
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const newLeadsThisWeek = leads.filter(
    lead => new Date(lead.created_at) >= sevenDaysAgo
  ).length;

  const publishedPosts = posts.filter(post => post.published).length;

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral do seu painel administrativo
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Leads
            </CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{leads.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">+{newLeadsThisWeek}</span> nos últimos 7 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Leads Novos
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{newLeadsThisWeek}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Últimos 7 dias
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

import { useState } from "react";
import { useIntegrations, Integration } from "@/hooks/useIntegrations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Facebook, 
  BarChart3, 
  Tag, 
  Webhook, 
  Plus, 
  Settings,
  Trash2,
  Check,
  CircleDashed
} from "lucide-react";

const integrationTypes = [
  {
    id: "meta_pixel",
    name: "Meta Pixel",
    description: "Rastreamento de conversões do Facebook/Instagram",
    icon: Facebook,
    type: "tracking",
    fields: [{ key: "pixel_id", label: "Pixel ID", placeholder: "123456789" }],
  },
  {
    id: "google_analytics",
    name: "Google Analytics 4",
    description: "Análise de tráfego e comportamento",
    icon: BarChart3,
    type: "tracking",
    fields: [{ key: "measurement_id", label: "Measurement ID", placeholder: "G-XXXXXXXXXX" }],
  },
  {
    id: "google_tag_manager",
    name: "Google Tag Manager",
    description: "Gerenciamento centralizado de tags",
    icon: Tag,
    type: "tracking",
    fields: [{ key: "container_id", label: "Container ID", placeholder: "GTM-XXXXXXX" }],
  },
  {
    id: "webhook",
    name: "Webhook",
    description: "Envie dados para URLs externas",
    icon: Webhook,
    type: "webhook",
    fields: [
      { key: "url", label: "URL do Webhook", placeholder: "https://..." },
      { key: "events", label: "Eventos (separados por vírgula)", placeholder: "lead, newsletter" },
    ],
  },
];

export default function IntegrationsPage() {
  const { integrations, isLoading, createIntegration, updateIntegration, deleteIntegration } = useIntegrations();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<typeof integrationTypes[0] | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = async () => {
    if (!selectedType) return;

    // Validar se pelo menos um campo foi preenchido
    const hasValues = selectedType.fields.some(field => formData[field.key]?.trim());
    if (!hasValues) {
      toast({ title: "Preencha pelo menos um campo", variant: "destructive" });
      return;
    }

    try {
      const existing = integrations.find((i) => i.name === selectedType.id);
      
      if (existing) {
        await updateIntegration.mutateAsync({
          id: existing.id,
          config: formData,
        });
        toast({ title: "Integração atualizada com sucesso!" });
      } else {
        await createIntegration.mutateAsync({
          name: selectedType.id,
          type: selectedType.type,
          config: formData,
          active: true,
        });
        toast({ title: "Integração adicionada com sucesso!" });
      }
      
      setIsDialogOpen(false);
      setSelectedType(null);
      setFormData({});
    } catch (error) {
      toast({ title: "Erro ao salvar integração", variant: "destructive" });
    }
  };

  const handleToggle = async (integration: Integration) => {
    try {
      await updateIntegration.mutateAsync({
        id: integration.id,
        active: !integration.active,
      });
      toast({
        title: integration.active
          ? "Integração desativada"
          : "Integração ativada",
      });
    } catch (error) {
      toast({ title: "Erro ao atualizar integração", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta integração?")) return;
    try {
      await deleteIntegration.mutateAsync(id);
      toast({ title: "Integração excluída com sucesso!" });
    } catch (error) {
      toast({ title: "Erro ao excluir integração", variant: "destructive" });
    }
  };

  const openConfig = (type: typeof integrationTypes[0]) => {
    const existing = integrations.find((i) => i.name === type.id);
    setSelectedType(type);
    setFormData(existing?.config as Record<string, string> || {});
    setIsDialogOpen(true);
  };

  // Verifica se a integração está configurada (tem valores reais nos campos)
  const isIntegrationConfigured = (typeId: string) => {
    const integration = integrations.find((i) => i.name === typeId);
    if (!integration) return false;
    
    const config = integration.config as Record<string, string> | null;
    if (!config) return false;
    
    // Verificar se pelo menos um campo tem valor
    const type = integrationTypes.find(t => t.id === typeId);
    if (!type) return false;
    
    return type.fields.some(field => config[field.key]?.trim?.());
  };

  const getIntegration = (typeId: string) => {
    return integrations.find((i) => i.name === typeId);
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
      <div className="border-b border-border pb-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Integrações</h1>
        <p className="text-muted-foreground mt-2">
          Configure pixels de rastreamento e webhooks para potencializar sua comunicação
        </p>
      </div>

      {/* Tracking Integrations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Rastreamento</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {integrationTypes
            .filter((t) => t.type === "tracking")
            .map((type) => {
              const isConfigured = isIntegrationConfigured(type.id);
              const integration = getIntegration(type.id);
              const Icon = type.icon;
              
              return (
                <Card 
                  key={type.id} 
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    isConfigured ? 'border-green-500/30 bg-green-500/5' : 'border-border'
                  }`}
                >
                  {/* Status indicator */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${
                    isConfigured ? 'bg-green-500' : 'bg-muted'
                  }`} />
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${
                        isConfigured 
                          ? 'bg-green-500/10 text-green-600' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold">{type.name}</CardTitle>
                        <CardDescription className="text-sm mt-0.5">
                          {type.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {isConfigured && integration ? (
                      <div className="space-y-4">
                        {/* Status badge */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-400">
                            Configurado
                          </span>
                          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                            integration.active 
                              ? 'bg-green-500 text-white' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {integration.active ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={integration.active}
                            onCheckedChange={() => handleToggle(integration)}
                          />
                          <span className="text-sm text-muted-foreground flex-1">
                            {integration.active ? 'Ativado' : 'Desativado'}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openConfig(type)}
                            className="gap-2"
                          >
                            <Settings className="w-4 h-4" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Not configured status */}
                        <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg">
                          <CircleDashed className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Não configurado
                          </span>
                        </div>
                        
                        <Button
                          variant="default"
                          className="w-full gap-2"
                          onClick={() => openConfig(type)}
                        >
                          <Plus className="w-4 h-4" />
                          Configurar
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>

      {/* Webhooks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Webhook className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Webhooks</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openConfig(integrationTypes.find((t) => t.id === "webhook")!)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Webhook
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            {integrations.filter((i) => i.type === "webhook").length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Webhook className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Nenhum webhook configurado
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Webhooks permitem enviar dados automaticamente para outros sistemas quando eventos ocorrem.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 gap-2"
                  onClick={() => openConfig(integrationTypes.find((t) => t.id === "webhook")!)}
                >
                  <Plus className="w-4 h-4" />
                  Criar primeiro webhook
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {integrations
                  .filter((i) => i.type === "webhook")
                  .map((webhook) => (
                    <div
                      key={webhook.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                        webhook.active 
                          ? 'bg-green-500/5 border-green-500/30' 
                          : 'bg-muted/30 border-border'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        webhook.active ? 'bg-green-500/10' : 'bg-muted'
                      }`}>
                        <Webhook className={`w-5 h-5 ${
                          webhook.active ? 'text-green-600' : 'text-muted-foreground'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-foreground">
                          {(webhook.config as any)?.url || "URL não configurada"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Eventos: {(webhook.config as any)?.events || "Todos"}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={webhook.active}
                            onCheckedChange={() => handleToggle(webhook)}
                          />
                          <span className="text-xs text-muted-foreground min-w-[50px]">
                            {webhook.active ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(webhook.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Config Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedType && (
                <>
                  <selectedType.icon className="w-5 h-5 text-primary" />
                  Configurar {selectedType.name}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para ativar esta integração.
            </DialogDescription>
          </DialogHeader>
          {selectedType && (
            <div className="space-y-4 pt-2">
              {selectedType.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>{field.label}</Label>
                  <Input
                    id={field.key}
                    value={formData[field.key] || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                    className="font-mono text-sm"
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button className="flex-1 gap-2" onClick={handleSave}>
                  <Check className="w-4 h-4" />
                  Salvar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

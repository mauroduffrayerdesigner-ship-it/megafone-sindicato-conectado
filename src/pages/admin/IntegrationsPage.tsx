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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  Check
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

  const getIntegrationStatus = (typeId: string) => {
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold">Integrações</h1>
        <p className="text-muted-foreground mt-1">
          Configure pixels de rastreamento e webhooks
        </p>
      </div>

      {/* Tracking Integrations */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Rastreamento</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {integrationTypes
            .filter((t) => t.type === "tracking")
            .map((type) => {
              const status = getIntegrationStatus(type.id);
              const Icon = type.icon;
              
              return (
                <Card key={type.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{type.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {type.description}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      {status ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-muted-foreground">
                              Configurado
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={status.active}
                              onCheckedChange={() => handleToggle(status)}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openConfig(type)}
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => openConfig(type)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Configurar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>

      {/* Webhooks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Webhooks</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openConfig(integrationTypes.find((t) => t.id === "webhook")!)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Webhook
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            {integrations.filter((i) => i.type === "webhook").length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Webhook className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum webhook configurado.</p>
                <p className="text-sm">
                  Webhooks permitem enviar dados automaticamente para outros sistemas.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {integrations
                  .filter((i) => i.type === "webhook")
                  .map((webhook) => (
                    <div
                      key={webhook.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {(webhook.config as any)?.url || "URL não configurada"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Eventos: {(webhook.config as any)?.events || "Todos"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Switch
                          checked={webhook.active}
                          onCheckedChange={() => handleToggle(webhook)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(webhook.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedType?.name ? `Configurar ${selectedType.name}` : "Configurar Integração"}
            </DialogTitle>
          </DialogHeader>
          {selectedType && (
            <div className="space-y-4">
              {selectedType.fields.map((field) => (
                <div key={field.key}>
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
                  />
                </div>
              ))}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button className="flex-1" onClick={handleSave}>
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

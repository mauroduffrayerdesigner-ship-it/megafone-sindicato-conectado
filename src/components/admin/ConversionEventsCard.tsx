import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code2, 
  Copy, 
  Check, 
  Zap,
  MousePointer,
  Mail,
  FileText,
  MessageCircle,
  Phone,
  Send,
  Eye
} from 'lucide-react';
import { AVAILABLE_EVENTS } from '@/hooks/useConversionTracking';

const eventIcons: Record<string, React.ElementType> = {
  lead_submitted: Send,
  newsletter_signup: Mail,
  page_view: Eye,
  button_click: MousePointer,
  form_start: FileText,
  whatsapp_click: MessageCircle,
  phone_click: Phone,
  email_click: Mail,
};

const categoryColors: Record<string, string> = {
  conversao: 'bg-green-500/10 text-green-600 border-green-500/30',
  engajamento: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  navegacao: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
  contato: 'bg-orange-500/10 text-orange-600 border-orange-500/30',
};

export const ConversionEventsCard = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, eventName: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(eventName);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Gerar código GTM para um evento
  const getGTMTriggerCode = (eventName: string) => {
    return `// GTM Trigger Configuration
// Tipo: Custom Event
// Nome do evento: ${eventName}

// Exemplo de Tag GA4:
// Tag Type: Google Analytics: GA4 Event
// Measurement ID: {{GA4 Measurement ID}}
// Event Name: ${eventName}
// Event Parameters:
//   - event_category: {{DLV - event_category}}
//   - event_label: {{DLV - event_label}}
//   - value: {{DLV - value}}`;
  };

  // Gerar código GA4 para um evento
  const getGA4EventCode = (eventName: string) => {
    return `// Evento GA4 para configurar no Google Analytics
// Acesse: Admin > Events > Create event

// Nome do evento: ${eventName}
// Condições de correspondência:
//   event_name equals ${eventName}

// Marcar como conversão:
// Admin > Conversions > New conversion event
// Event name: ${eventName}`;
  };

  // Gerar código Meta Pixel para um evento
  const getMetaPixelCode = (eventName: string) => {
    const metaEventMap: Record<string, string> = {
      lead_submitted: 'Lead',
      newsletter_signup: 'Subscribe',
      page_view: 'PageView',
      button_click: 'ViewContent',
      form_start: 'InitiateCheckout',
      whatsapp_click: 'Contact',
      phone_click: 'Contact',
      email_click: 'Contact',
    };

    return `// Meta Pixel Event
// Este evento é automaticamente convertido para: ${metaEventMap[eventName] || eventName}

// Para criar conversão personalizada no Meta:
// 1. Acesse Events Manager > Custom Conversions
// 2. Clique em "Create Custom Conversion"
// 3. Selecione o evento: ${metaEventMap[eventName] || eventName}
// 4. Adicione regras se necessário (ex: URL contém "obrigado")
// 5. Nomeie sua conversão e salve`;
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle>Eventos de Conversão</CardTitle>
            <CardDescription>
              Eventos disponíveis para configurar conversões personalizadas
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Lista de eventos */}
          <div className="grid gap-4 md:grid-cols-2">
            {AVAILABLE_EVENTS.map((event) => {
              const Icon = eventIcons[event.name] || Zap;
              
              return (
                <div 
                  key={event.name}
                  className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <code className="text-sm font-mono font-semibold text-foreground">
                          {event.name}
                        </code>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${categoryColors[event.category]}`}
                        >
                          {event.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.description}
                      </p>
                      {event.parameters.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {event.parameters.map((param) => (
                            <code 
                              key={param}
                              className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                            >
                              {param}
                            </code>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Código de exemplo por plataforma */}
          <div className="border-t border-border pt-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Código para Configuração
            </h4>
            
            <Tabs defaultValue="gtm" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="gtm">Google Tag Manager</TabsTrigger>
                <TabsTrigger value="ga4">Google Analytics 4</TabsTrigger>
                <TabsTrigger value="meta">Meta Pixel</TabsTrigger>
              </TabsList>
              
              <TabsContent value="gtm" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Configure triggers no GTM para capturar os eventos do dataLayer:
                  </p>
                  {['lead_submitted', 'newsletter_signup'].map((eventName) => (
                    <div key={eventName} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-primary">{eventName}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(getGTMTriggerCode(eventName), `gtm_${eventName}`)}
                          className="gap-2"
                        >
                          {copiedCode === `gtm_${eventName}` ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copiar
                            </>
                          )}
                        </Button>
                      </div>
                      <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                        {getGTMTriggerCode(eventName)}
                      </pre>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="ga4" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Configure eventos de conversão no Google Analytics 4:
                  </p>
                  {['lead_submitted', 'newsletter_signup'].map((eventName) => (
                    <div key={eventName} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-primary">{eventName}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(getGA4EventCode(eventName), `ga4_${eventName}`)}
                          className="gap-2"
                        >
                          {copiedCode === `ga4_${eventName}` ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copiar
                            </>
                          )}
                        </Button>
                      </div>
                      <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                        {getGA4EventCode(eventName)}
                      </pre>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="meta" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Configure conversões personalizadas no Meta Events Manager:
                  </p>
                  {['lead_submitted', 'newsletter_signup'].map((eventName) => (
                    <div key={eventName} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-primary">{eventName}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(getMetaPixelCode(eventName), `meta_${eventName}`)}
                          className="gap-2"
                        >
                          {copiedCode === `meta_${eventName}` ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copiar
                            </>
                          )}
                        </Button>
                      </div>
                      <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
                        {getMetaPixelCode(eventName)}
                      </pre>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Estrutura do DataLayer */}
          <div className="border-t border-border pt-6">
            <h4 className="font-semibold mb-4">Estrutura do DataLayer</h4>
            <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
{`// Exemplo de evento no dataLayer
window.dataLayer.push({
  'event': 'lead_submitted',
  'event_category': 'conversao',
  'event_label': 'formulario_contato',
  'value': 1,
  'service': 'Gestão de Redes Sociais',
  'organization': 'Nome do Sindicato',
  'email': 'contato@exemplo.com',
  'page_path': '/contato',
  'timestamp': '2024-01-15T10:30:00.000Z'
});`}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

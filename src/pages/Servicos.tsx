import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Share2, Palette, MessageCircle, Video, Globe, TrendingUp, 
  Check, ArrowRight, Zap, Users, BarChart3
} from "lucide-react";

const services = [
  {
    id: "social-media",
    icon: Share2,
    title: "Gestão de Redes Sociais",
    subtitle: "Social Media Completo",
    description: "Cuidamos da comunicação digital do sindicato com a base. Nosso trabalho envolve criar conteúdo estratégico, manter presença ativa e engajar trabalhadores.",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    features: [
      "Criação e/ou reformulação de redes sociais",
      "Criação de conteúdo estratégico e informativo",
      "Publicações diárias e programadas",
      "Atendimento e interação com seguidores",
      "Análise de métricas e relatórios mensais",
      "Instagram, Facebook, Twitter/X, TikTok",
    ],
  },
  {
    id: "design",
    icon: Palette,
    title: "Design Digital e Gráfico",
    subtitle: "Identidade Visual Completa",
    description: "Criação de materiais que fortalecem a presença visual do sindicato, desde cards para redes sociais até materiais impressos de alta qualidade.",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    features: [
      "Criação de logo e identidade visual",
      "Cards para redes sociais e stories",
      "Materiais impressos (panfletos, cartazes, banners)",
      "Enxoval gráfico completo para campanhas",
      "Carrosséis e criativos para reels",
      "Materiais para impulsionamento",
    ],
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "Disparo em Massa no WhatsApp",
    subtitle: "Comunicação Direta",
    description: "Envio diário de mensagens com alcance direto à base trabalhadora. Comunicação instantânea para mobilização e informação.",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
    features: [
      "Envio em massa para até 10 mil contatos",
      "Envios de imagens, textos e links ilimitados",
      "Disparo programado para qualquer dia e horário",
      "Segmentação de listas por categoria",
      "Relatórios de entrega e engajamento",
      "WhatsApp oficial e de apoiadores",
    ],
  },
  {
    id: "video",
    icon: Video,
    title: "Produção de Vídeos e Fotografias",
    subtitle: "Conteúdo Audiovisual",
    description: "Cobertura de atividades, vídeos institucionais e edição profissional para campanhas e comunicação sindical.",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    features: [
      "Cobertura fotográfica de eventos",
      "Vídeos institucionais e promocionais",
      "Edição profissional de vídeos",
      "Conteúdo para reels e stories",
      "Documentação de assembleias e atos",
      "Banco de imagens do sindicato",
    ],
  },
  {
    id: "site",
    icon: Globe,
    title: "Criação de Sites",
    subtitle: "Presença Digital Completa",
    description: "Elaboração, design e desenvolvimento de sites personalizados para atender às necessidades específicas de cada sindicato.",
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    features: [
      "Design personalizado e moderno",
      "Site responsivo (mobile-friendly)",
      "Sistema de notícias e blog",
      "Área do filiado",
      "Formulários de contato e filiação",
      "Manutenção e atualizações",
    ],
  },
  {
    id: "estrategia",
    icon: TrendingUp,
    title: "Estratégia Digital",
    subtitle: "Planejamento e Impulsionamento",
    description: "Elaboração de estratégias para redes sociais, impulsionamento de conteúdo e planejamento de campanhas digitais.",
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    features: [
      "Diagnóstico de comunicação digital",
      "Planejamento estratégico mensal",
      "Definição de público-alvo",
      "Gestão de anúncios pagos",
      "Monitoramento de concorrência",
      "Relatórios de performance",
    ],
  },
];

const highlights = [
  { icon: Zap, label: "Resposta Rápida", value: "24h" },
  { icon: Users, label: "Sindicatos Atendidos", value: "50+" },
  { icon: BarChart3, label: "Taxa de Satisfação", value: "98%" },
];

const Servicos = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-bl-[100px] hidden lg:block" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-display uppercase tracking-widest text-sm">Serviços</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6 text-foreground">
              Soluções Completas em <span className="text-primary">Comunicação</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Oferecemos um pacote completo de serviços para fortalecer a comunicação 
              do seu sindicato com os trabalhadores da base.
            </p>
          </div>
          
          {/* Highlights */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-xl">
            {highlights.map((item) => (
              <div key={item.label} className="text-center bg-card rounded-2xl p-4 border border-border">
                <item.icon className="text-primary mx-auto mb-2" size={24} />
                <span className="block text-2xl font-display font-bold text-foreground">{item.value}</span>
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div 
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className={`inline-flex items-center gap-2 ${service.color} rounded-full px-4 py-2 mb-4`}>
                    <service.icon size={18} />
                    <span className="text-sm font-medium">{service.subtitle}</span>
                  </div>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4 text-foreground">{service.title}</h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contato">
                      Solicitar Proposta
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                </div>
                
                <div className={`bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-soft ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}>
                  <h3 className="font-display text-lg font-bold mb-6 text-primary">
                    O que está incluso:
                  </h3>
                  <ul className="space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="text-primary" size={12} />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Pronto para <span className="text-primary">Fortalecer</span> sua Comunicação?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Entre em contato e solicite uma proposta personalizada para o seu sindicato.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contato">
                  Solicitar Proposta
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="border-2" asChild>
                <a href="https://wa.me/5541998504505" target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Servicos;

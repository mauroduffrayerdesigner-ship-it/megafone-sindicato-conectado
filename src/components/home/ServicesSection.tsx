import { Link } from "react-router-dom";
import { Palette, Share2, MessageCircle, Video, Globe, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Palette,
    title: "Design Digital e Gráfico",
    description: "Criação de cards, materiais impressos e identidade visual que fortalecem a presença do sindicato.",
  },
  {
    icon: Share2,
    title: "Gestão de Redes Sociais",
    description: "Conteúdo estratégico, publicações diárias, atendimento e análise de métricas completa.",
  },
  {
    icon: MessageCircle,
    title: "Disparo no WhatsApp",
    description: "Envio em massa com alcance direto à base trabalhadora. Comunicação instantânea e eficaz.",
  },
  {
    icon: Video,
    title: "Produção de Vídeos",
    description: "Cobertura de atividades, vídeos institucionais e edição profissional para suas campanhas.",
  },
  {
    icon: Globe,
    title: "Criação de Sites",
    description: "Sites personalizados para sindicatos com design moderno e funcionalidades sob medida.",
  },
  {
    icon: TrendingUp,
    title: "Estratégia Digital",
    description: "Elaboração de estratégias para redes sociais e impulsionamento de conteúdo.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-display uppercase tracking-widest text-sm">O que fazemos</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Nossos Serviços
          </h2>
          <p className="text-muted-foreground text-lg">
            Soluções completas de comunicação para fortalecer a conexão entre sindicatos e suas bases.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-gradient-card border border-border rounded-xl p-8 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/servicos">
              Ver Todos os Serviços
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

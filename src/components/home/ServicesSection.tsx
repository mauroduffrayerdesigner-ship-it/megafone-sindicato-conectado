import { Link } from "react-router-dom";
import { Palette, Share2, MessageCircle, Video, Globe, Newspaper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Share2,
    title: "Gestão de Redes Sociais",
    description: "Conteúdo estratégico, publicações diárias, atendimento e análise de métricas completa.",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Palette,
    title: "Design Digital e Gráfico",
    description: "Criação de cards, materiais impressos e identidade visual que fortalecem a presença do sindicato.",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    icon: MessageCircle,
    title: "Disparo no WhatsApp",
    description: "Envio em massa com alcance direto à base trabalhadora. Comunicação instantânea e eficaz.",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    icon: Video,
    title: "Produção de Vídeos",
    description: "Cobertura de atividades, vídeos institucionais e edição profissional para suas campanhas.",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    icon: Globe,
    title: "Criação de Sites",
    description: "Sites personalizados para sindicatos com design moderno e funcionalidades sob medida.",
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: Newspaper,
    title: "Assessoria de Imprensa",
    description: "Elaboração e distribuição de releases, matérias e kit mídia.",
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-display uppercase tracking-widest text-sm">O que fazemos</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6">
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
              className="group bg-card border border-border rounded-2xl p-8 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                <service.icon size={28} />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-foreground">{service.title}</h3>
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

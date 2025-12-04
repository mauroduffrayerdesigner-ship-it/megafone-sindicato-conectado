import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Megaphone, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-[20rem] font-display font-bold text-primary">M</div>
        <div className="absolute bottom-20 right-10 text-[20rem] font-display font-bold text-primary">F</div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/50 border border-border rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Megaphone className="text-primary" size={18} />
            <span className="text-sm text-muted-foreground">Comunicação que mobiliza</span>
          </div>

          {/* Title with Echo Effect */}
          <div className="relative mb-6">
            <h1 
              className="megafone-title text-5xl sm:text-6xl lg:text-8xl text-primary megafone-echo animate-slide-up"
              data-text="MEGAFONE"
            >
              MEGAFONE
            </h1>
            <p className="font-display text-xl sm:text-2xl tracking-[0.3em] text-muted-foreground mt-2 animate-slide-up delay-100">
              COMUNICAÇÃO SINDICAL
            </p>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up delay-200">
            Fortalecemos a luta dos trabalhadores através de estratégias de comunicação digital eficazes. 
            <span className="text-foreground font-semibold"> Redes sociais, design, WhatsApp e muito mais.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-300">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contato">
                Solicitar Proposta
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/servicos">
                Nossos Serviços
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in delay-400">
            <div className="text-center">
              <span className="block text-3xl sm:text-4xl font-display font-bold text-primary">5+</span>
              <span className="text-sm text-muted-foreground">Anos de Experiência</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl sm:text-4xl font-display font-bold text-primary">50+</span>
              <span className="text-sm text-muted-foreground">Sindicatos Atendidos</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl sm:text-4xl font-display font-bold text-primary">10K+</span>
              <span className="text-sm text-muted-foreground">Trabalhadores Alcançados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

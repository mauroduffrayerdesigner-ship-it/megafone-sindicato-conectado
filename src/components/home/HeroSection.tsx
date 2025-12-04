import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import logoMegafone from "@/assets/logo-megafone.png";

const highlights = [
  "Gestão de Redes Sociais",
  "Disparo em Massa WhatsApp",
  "Criação de Sites",
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-light pt-20">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-bl-[100px] hidden lg:block" />
      <div className="absolute top-40 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl hidden lg:block" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary font-medium">Comunicação que mobiliza</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up text-foreground">
              Fortaleça a <span className="text-primary">Comunicação</span> do seu Sindicato
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed animate-slide-up delay-100">
              Somos especialistas em comunicação sindical. Conectamos sindicatos às suas bases 
              através de estratégias digitais eficazes e conteúdo que engaja.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-4 mb-8 animate-slide-up delay-200">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="text-primary" size={18} />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contato">
                  Solicitar Proposta
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="border-2">
                <Link to="/servicos">
                  Nossos Serviços
                </Link>
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl bg-card shadow-card flex items-center justify-center border border-border">
                <img 
                  src={logoMegafone} 
                  alt="Megafone Comunicação Sindical" 
                  className="w-4/5 h-auto"
                />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl p-4 shadow-soft animate-float">
                <span className="block text-2xl font-display font-bold text-primary">50+</span>
                <span className="text-xs text-muted-foreground">Sindicatos Atendidos</span>
              </div>
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-soft animate-float delay-300">
                <span className="block text-2xl font-display font-bold text-primary">5+</span>
                <span className="text-xs text-muted-foreground">Anos de Experiência</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

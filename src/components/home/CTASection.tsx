import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Megaphone, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.3),transparent)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 mb-8 animate-pulse-glow">
            <Megaphone className="text-primary-foreground" size={40} />
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Vamos Juntos Comunicar os Trabalhadores!
          </h2>
          
          <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            Entre em contato conosco e descubra como podemos fortalecer a comunicação do seu sindicato.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              className="bg-background text-primary hover:bg-background/90 font-display uppercase tracking-wider"
              asChild
            >
              <Link to="/contato">
                Solicitar Proposta
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-display uppercase tracking-wider"
              asChild
            >
              <a href="https://wa.me/5541998504505" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

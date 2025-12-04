import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-primary-foreground">
            Vamos Amplificar a Voz do seu Sindicato?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 leading-relaxed">
            Entre em contato e descubra como podemos fortalecer a comunicação 
            com sua base trabalhadora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90 font-bold"
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
              className="border-2 border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <a href="https://wa.me/5541998504505" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

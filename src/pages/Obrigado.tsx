import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, MessageCircle } from "lucide-react";
import { useConversionTracking } from "@/hooks/useConversionTracking";

const Obrigado = () => {
  const { trackRegistrationComplete } = useConversionTracking();

  useEffect(() => {
    // Dispara evento de conversão ao carregar a página
    trackRegistrationComplete();
  }, [trackRegistrationComplete]);

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-dark relative overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 text-[20rem] font-display font-bold text-primary">✓</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Ícone de sucesso animado */}
            <div className="mb-8 inline-flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-primary animate-scale-in" />
                </div>
              </div>
            </div>

            {/* Título */}
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              Obrigado pelo seu <span className="text-primary">Contato!</span>
            </h1>

            {/* Mensagem */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Recebemos sua mensagem com sucesso! Nossa equipe entrará em contato em breve 
              para discutir como podemos ajudar na comunicação do seu sindicato.
            </p>

            {/* Info adicional */}
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Tempo médio de resposta:</strong> até 24 horas úteis
              </p>
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/">
                  <Home size={18} />
                  Voltar ao Início
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a 
                  href="https://wa.me/5541998504505" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={18} />
                  Falar pelo WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Obrigado;

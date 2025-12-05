import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { subscribeToNewsletter } from "@/hooks/useNewsletter";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, insira seu e-mail.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await subscribeToNewsletter(email);
      
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas novidades em breve.",
      });
      
      setEmail("");
    } catch (error: any) {
      if (error.message?.includes("duplicate")) {
        toast({
          title: "Email já cadastrado",
          description: "Este email já está inscrito na nossa newsletter.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro ao inscrever",
          description: "Por favor, tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-display font-bold text-primary">
          @
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 sm:p-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <Mail className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Fique Por Dentro das <span className="text-primary">Novidades</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Assine nossa newsletter e receba dicas de comunicação sindical, 
                estratégias digitais e novidades diretamente no seu e-mail.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu melhor e-mail"
                  className="w-full px-5 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <Button 
                variant="hero" 
                size="xl" 
                type="submit"
                disabled={isLoading}
                className="group"
              >
                {isLoading ? (
                  "Enviando..."
                ) : (
                  <>
                    Inscrever-se
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Prometemos não enviar spam. Você pode cancelar a qualquer momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

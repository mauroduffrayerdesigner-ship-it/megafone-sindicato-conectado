import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Tivemos uma ótima experiência com as soluções da MegaFone, nos ajudaram a melhorar a comunicação com os trabalhadores na base.",
    author: "Sindicato",
    role: "Cliente desde 2021",
  },
  {
    quote: "A Megafone vem realizado diversas campanhas sindicais, em todas elas os trabalhadores da categoria receberam o informe de forma imediata e participativa.",
    author: "Núcleo Sindical Toledo",
    role: "Cliente desde 2020",
  },
  {
    quote: "Tínhamos certa dificuldade nas redes sociais, mas desde quando vocês começaram a gerenciar, os/as trabalhadores/as tem acompanhado as ações do nosso núcleo.",
    author: "Núcleo Sindical",
    role: "Cliente desde 2022",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-display uppercase tracking-widest text-sm">Depoimentos</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-foreground">
            O Que Nossos Parceiros Dizem
          </h2>
          <p className="text-muted-foreground text-lg">
            Leia o que nossos companheiros têm a dizer sobre nossa parceria.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-card border border-border rounded-2xl p-8 card-hover"
            >
              <Quote className="text-primary/20 absolute top-6 right-6" size={48} />
              <p className="text-foreground leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 border-t border-border pt-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-display font-bold text-primary">
                    {testimonial.author[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

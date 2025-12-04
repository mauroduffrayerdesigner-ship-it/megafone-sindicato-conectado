import { Layout } from "@/components/layout/Layout";
import { Users, Target, Heart, Award } from "lucide-react";

const team = [
  { role: "Jornalistas", icon: "📰" },
  { role: "Designers", icon: "🎨" },
  { role: "Social Media", icon: "📱" },
  { role: "Cientistas Sociais", icon: "📊" },
  { role: "Fotógrafos", icon: "📷" },
  { role: "Videomakers", icon: "🎬" },
];

const values = [
  {
    icon: Target,
    title: "Missão",
    description: "Ajudar sindicatos a se conectarem com suas bases por meio da comunicação digital, ampliar a visibilidade das ações sindicais e fortalecer a presença digital.",
  },
  {
    icon: Heart,
    title: "Compromisso",
    description: "Unimos técnica, criatividade e compromisso político para fortalecer a comunicação dos sindicatos e gerar mais filiações, mobilização e força para a luta.",
  },
  {
    icon: Award,
    title: "Experiência",
    description: "Nossa equipe nasceu nas lutas dos movimentos sociais, cobrindo manifestações e criando conteúdos que mobilizavam estudantes e trabalhadores.",
  },
];

const Sobre = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 text-[15rem] font-display font-bold text-primary">S</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-display uppercase tracking-widest text-sm">Quem Somos</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold mt-4 mb-6">
              Olá, Somos a <span className="text-primary">MegaFone</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A Megafone é uma agência de comunicação sindical fundada há 5 anos. Nosso objetivo é 
              fortalecer a luta dos trabalhadores por meio de estratégias de comunicação eficazes.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-display uppercase tracking-widest text-sm">Nossa História</span>
              <h2 className="font-display text-4xl font-bold mt-4 mb-6">
                Compromisso e Profissionalismo
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Nossa equipe nasceu nas lutas dos movimentos sociais, cobrindo manifestações, 
                  e criando conteúdos que mobilizavam estudantes a lutar em defesa de uma 
                  educação pública gratuita e de qualidade.
                </p>
                <p>
                  Anos depois, aquela equipe que se conheceu em 2016 se reencontrou em 2020 
                  para criar a <strong className="text-foreground">MegaFone Comunicação Sindical</strong> - 
                  Unindo compromisso e profissionalismo a serviço da classe trabalhadora.
                </p>
                <p>
                  Nossa empresa é especializada em assessoria de imprensa, produção de conteúdo 
                  para redes sociais como imagens e vídeos, para sindicatos e movimentos sociais.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-card rounded-2xl border border-border p-8 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-8xl font-display font-bold text-primary mb-4">5+</span>
                  <span className="text-xl text-muted-foreground">Anos de Experiência</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-display uppercase tracking-widest text-sm">Nossos Valores</span>
            <h2 className="font-display text-4xl font-bold mt-4">O Que Nos Move</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-background border border-border rounded-xl p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-display uppercase tracking-widest text-sm">Nossa Equipe</span>
            <h2 className="font-display text-4xl font-bold mt-4 mb-6">
              Profissionais Comprometidos
            </h2>
            <p className="text-muted-foreground text-lg">
              Nossa equipe é formada por profissionais comprometidos com as lutas sociais 
              e especializados em diversas áreas.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member) => (
              <div 
                key={member.role}
                className="bg-gradient-card border border-border rounded-xl p-6 text-center card-hover"
              >
                <span className="text-4xl mb-4 block">{member.icon}</span>
                <span className="font-semibold text-sm">{member.role}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
              <Users className="text-primary" size={24} />
              <span className="text-foreground font-medium">
                Unimos técnica, criatividade e compromisso político
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;

import { Layout } from "@/components/layout/Layout";
import { Users, Target, Heart, Award } from "lucide-react";
import wellingtonPhoto from "@/assets/team/wellington-tiago.jpeg";
import milenaPhoto from "@/assets/team/milena-isabel.jpeg";
import isabelaPhoto from "@/assets/team/isabela-veiga.jpeg";
import leonardoPhoto from "@/assets/team/leonardo-costa.jpeg";
const teamMembers = [{
  name: "Wellington Tiago",
  role: "Proprietário e Relações Públicas",
  photo: wellingtonPhoto
}, {
  name: "Milena Isabel",
  role: "Coordenadora de Comunicação",
  photo: milenaPhoto
}, {
  name: "Isabela Veiga",
  role: "Social Media",
  photo: isabelaPhoto
}, {
  name: "Leonardo Costa",
  role: "Design e Fotógrafo",
  photo: leonardoPhoto
}];
const expertise = [{
  role: "Jornalistas",
  icon: "📰"
}, {
  role: "Designers",
  icon: "🎨"
}, {
  role: "Social Media",
  icon: "📱"
}, {
  role: "Cientistas Sociais",
  icon: "📊"
}, {
  role: "Fotógrafos",
  icon: "📷"
}, {
  role: "Videomakers",
  icon: "🎬"
}];
const values = [{
  icon: Target,
  title: "Missão",
  description: "Ajudar sindicatos a se conectarem com suas bases por meio da comunicação digital, ampliar a visibilidade das ações sindicais e fortalecer a presença digital."
}, {
  icon: Heart,
  title: "Compromisso",
  description: "Unimos técnica, criatividade e compromisso político para fortalecer a comunicação dos sindicatos e gerar mais filiações, mobilização e força para a luta."
}, {
  icon: Award,
  title: "Experiência",
  description: "Nossa equipe nasceu nas lutas dos movimentos sociais, cobrindo manifestações e criando conteúdos que mobilizavam estudantes e trabalhadores."
}];
const Sobre = () => {
  return <Layout>
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
                  Nossa empresa é especializada em todo conjunto de técnicas de comunicação para sindicatos e entidades de classe, nossa equipe é composta por profissionais da area de assessoria de imprensa, design, videomaker, entre outros.



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
            {values.map(value => <div key={value.title} className="bg-background border border-border rounded-xl p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-display uppercase tracking-widest text-sm">Nossa Equipe</span>
            <h2 className="font-display text-4xl font-bold mt-4 mb-6">
              Conheça Nossos Profissionais
            </h2>
            <p className="text-muted-foreground text-lg">
              Pessoas comprometidas com a luta dos trabalhadores e especializadas 
              em comunicação estratégica.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map(member => <div key={member.name} className="group bg-gradient-card border border-border rounded-2xl overflow-hidden card-hover">
                <div className="relative overflow-hidden">
                  <img src={member.photo} alt={member.name} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-display text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-display uppercase tracking-widest text-sm">Áreas de Atuação</span>
            <h2 className="font-display text-3xl font-bold mt-4">Especialistas em Comunicação</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {expertise.map(item => <div key={item.role} className="bg-background border border-border rounded-xl p-5 text-center card-hover">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <span className="font-semibold text-sm">{item.role}</span>
              </div>)}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
              <Users className="text-primary" size={24} />
              <span className="text-foreground font-medium">
                Unimos técnica, criatividade e compromisso político
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Sobre;
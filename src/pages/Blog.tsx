import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: 1,
    slug: "importancia-comunicacao-sindical",
    title: "A Importância da Comunicação Sindical na Era Digital",
    excerpt: "Descubra como a comunicação digital pode fortalecer a relação entre sindicatos e trabalhadores, aumentando o engajamento e a mobilização.",
    category: "Estratégia",
    date: "2024-01-15",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    slug: "whatsapp-ferramenta-mobilizacao",
    title: "WhatsApp como Ferramenta de Mobilização Sindical",
    excerpt: "Aprenda estratégias eficazes para usar o WhatsApp na comunicação com a base trabalhadora e aumentar a participação em ações sindicais.",
    category: "WhatsApp",
    date: "2024-01-10",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    slug: "redes-sociais-sindicatos",
    title: "Redes Sociais para Sindicatos: Guia Completo",
    excerpt: "Um guia prático para sindicatos que desejam melhorar sua presença nas redes sociais e alcançar mais trabalhadores.",
    category: "Redes Sociais",
    date: "2024-01-05",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    slug: "design-grafico-campanhas",
    title: "Design Gráfico Eficaz para Campanhas Sindicais",
    excerpt: "Dicas de design para criar materiais visuais impactantes que comunicam a mensagem do sindicato de forma clara e atrativa.",
    category: "Design",
    date: "2024-01-01",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    slug: "video-marketing-sindical",
    title: "Vídeo Marketing para Sindicatos: Por Onde Começar",
    excerpt: "Entenda como o vídeo pode ser uma ferramenta poderosa na comunicação sindical e aprenda a criar conteúdos que engajam.",
    category: "Vídeo",
    date: "2023-12-28",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    slug: "metricas-comunicacao",
    title: "Métricas Essenciais para Avaliar sua Comunicação",
    excerpt: "Aprenda a medir o sucesso de suas estratégias de comunicação e tomar decisões baseadas em dados.",
    category: "Estratégia",
    date: "2023-12-20",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
  },
];

const categories = ["Todos", "Estratégia", "WhatsApp", "Redes Sociais", "Design", "Vídeo"];

const Blog = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 text-[15rem] font-display font-bold text-primary">B</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-display uppercase tracking-widest text-sm">Blog</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold mt-4 mb-6">
              Notícias e <span className="text-primary">Dicas</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Conteúdos relevantes sobre comunicação sindical, estratégias digitais 
              e dicas para fortalecer a conexão com os trabalhadores.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === "Todos"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="group bg-card border border-border rounded-xl overflow-hidden card-hover"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                      <Tag size={12} />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ler mais
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="hero-outline" size="lg">
              Carregar Mais Artigos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Receba Nossas Novidades
            </h2>
            <p className="text-muted-foreground mb-8">
              Assine nossa newsletter e receba dicas de comunicação sindical diretamente no seu e-mail.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero" size="lg">
                Assinar
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;

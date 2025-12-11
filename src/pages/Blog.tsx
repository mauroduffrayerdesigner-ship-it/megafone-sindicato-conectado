import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Tag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { subscribeToNewsletter } from "@/hooks/useNewsletter";
import { useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const { posts, isLoading } = useBlogPosts(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await subscribeToNewsletter(email);
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas novidades em breve.",
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Erro na inscrição",
        description: error.code === "DUPLICATE_EMAIL" 
          ? "Este e-mail já está cadastrado." 
          : "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(posts.map(p => p.category).filter(Boolean))];
    return ["Todos", ...uniqueCategories];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "Todos") return posts;
    return posts.filter(p => p.category === selectedCategory);
  }, [posts, selectedCategory]);

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
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === selectedCategory
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
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden card-hover"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image_url || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {post.category && (
                        <span className="inline-flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                          <Tag size={12} />
                          {post.category}
                        </span>
                      )}
                      {post.read_time && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={12} />
                          {post.read_time}
                        </span>
                      )}
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
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Ler mais
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero" size="lg" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Assinar"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
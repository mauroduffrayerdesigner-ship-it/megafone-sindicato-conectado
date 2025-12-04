import { Layout } from "@/components/layout/Layout";
import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const relatedPosts = posts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);
  const otherPosts = relatedPosts.length < 2 
    ? [...relatedPosts, ...posts.filter((p) => p.slug !== slug && p.category !== post.category).slice(0, 2 - relatedPosts.length)]
    : relatedPosts;

  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(post.title);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 text-[15rem] font-display font-bold text-primary">A</div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Voltar para o Blog
          </Link>
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                <Tag size={14} />
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock size={14} />
                {post.readTime} de leitura
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString('pt-BR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative -mt-4">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden shadow-card">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Article Content */}
            <article 
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-display prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground
                prose-strong:text-foreground
                prose-ul:my-4 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Share2 size={18} className="text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">Compartilhar:</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Twitter size={18} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="grid sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    to={`/blog/${prevPost.slug}`}
                    className="group p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors"
                  >
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                      <ArrowLeft size={12} />
                      Anterior
                    </span>
                    <span className="font-display font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost && (
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    className="group p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors text-right"
                  >
                    <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 mb-2">
                      Próximo
                      <ArrowRight size={12} />
                    </span>
                    <span className="font-display font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-center mb-12">
              Artigos Relacionados
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {otherPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-background border border-border rounded-xl overflow-hidden card-hover"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs text-primary font-medium">{relatedPost.category}</span>
                      <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Gostou do Conteúdo?
            </h2>
            <p className="text-muted-foreground mb-8">
              Assine nossa newsletter e receba mais dicas de comunicação sindical diretamente no seu e-mail.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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

export default BlogPost;

import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook, Linkedin } from "lucide-react";
import logoMegafone from "@/assets/logo-megafone.png";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoMegafone} alt="Megafone" className="h-10 w-auto" />
              <div>
                <span className="font-display text-lg font-bold text-primary">MEGAFONE</span>
                <span className="block text-xs text-muted-foreground tracking-widest">COMUNICAÇÃO SINDICAL</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Fortalecendo a luta dos trabalhadores através de comunicação estratégica e eficaz há mais de 5 anos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Navegação</h4>
            <ul className="space-y-3">
              {["Home", "Sobre", "Serviços", "Blog", "Contato"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Serviços</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>Social Media</li>
              <li>Design Gráfico</li>
              <li>Disparo WhatsApp</li>
              <li>Produção de Vídeo</li>
              <li>Estratégia Digital</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:megafone.criacao@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={18} />
                  megafone.criacao@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+5541998504505"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone size={18} />
                  (41) 99850-4505
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Megafone Comunicação Sindical. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-sm">
            Unindo militância e profissionalismo a serviço da classe trabalhadora.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoMegafone from "@/assets/logo-megafone.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Sobre", path: "/sobre" },
  { name: "Serviços", path: "/servicos" },
  { name: "Blog", path: "/blog" },
  { name: "Contato", path: "/contato" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logoMegafone} alt="Megafone" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <span className="font-display text-xl font-bold text-primary">MEGAFONE</span>
              <span className="block text-xs text-muted-foreground tracking-widest">COMUNICAÇÃO SINDICAL</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body font-medium transition-colors link-underline ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contato">Fale Conosco</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-body font-medium text-lg py-2 transition-colors ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="hero" size="lg" className="mt-4" asChild>
              <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
                Fale Conosco
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

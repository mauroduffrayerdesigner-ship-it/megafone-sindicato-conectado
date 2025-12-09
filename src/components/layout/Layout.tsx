import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  // Não exibir o botão flutuante em rotas do blog e admin
  const showWhatsAppButton = !location.pathname.startsWith('/blog') && 
                              !location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      {showWhatsAppButton && <WhatsAppFloatButton />}
    </div>
  );
}

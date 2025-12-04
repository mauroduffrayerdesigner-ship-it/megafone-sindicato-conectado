import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <ClientsSection />
      <BlogSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
    </Layout>
  );
};

export default Index;

import sindarspenLogo from "@/assets/clients/sindarspen.png";
import sintesparLogo from "@/assets/clients/sintespar.png";
import sismmarLogo from "@/assets/clients/sismmar.png";
import appToledoLogo from "@/assets/clients/app-toledo.png";
import sinsepLogo from "@/assets/clients/sinsep.png";
import bancariosCuritibaLogo from "@/assets/clients/bancarios-curitiba.png";

const clients = [
  { name: "Sindicato da Polícia Penal do Paraná", logo: sindarspenLogo },
  { name: "Sindicato dos Técnicos em Segurança do Trabalho", logo: sintesparLogo },
  { name: "Sindicato do Magistério de Araucária", logo: sismmarLogo },
  { name: "APP Sindicato - Núcleo Toledo", logo: appToledoLogo },
  { name: "Sindicato dos Servidores Públicos", logo: sinsepLogo },
  { name: "Sindicato dos Bancários de Curitiba", logo: bancariosCuritibaLogo },
];

export function ClientsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-display uppercase tracking-widest text-sm">
            Portfólio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-4">
            Quem Confia na Megafone
          </h2>
          <p className="text-muted-foreground">
            Trabalhamos com sindicatos de todo o Brasil, fortalecendo a comunicação com suas bases.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {clients.map((client, index) => (
            <div
              key={client.name}
              className="group bg-card border border-border rounded-xl p-6 text-center card-hover"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-background flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                <img 
                  src={client.logo} 
                  alt={`Logo ${client.name}`}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-tight">
                {client.name}
              </p>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            <span className="text-primary font-bold text-2xl">50+</span>{" "}
            sindicatos atendidos em todo o Brasil
          </p>
        </div>
      </div>
    </section>
  );
}

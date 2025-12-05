const clients = [
  { name: "SINDICATO DOS SERVIDORES DE SÃO JOSÉ DOS PINHAIS", initials: "SS" },
  { name: "SINDICATO DOS BANCÁRIOS", initials: "SB" },
  { name: "SINDPETRO", initials: "SP" },
  { name: "SINDICATO DOS PROFESSORES", initials: "SE" },
  { name: "SINDICATO DOS ENFERMEIROS", initials: "EN" },
  { name: "SINDICATO DOS RODOVIÁRIOS", initials: "SR" },
  { name: "SIND. TRAB. CORREIOS", initials: "CT" },
  { name: "SIND. SERVIDORES PÚBLICOS", initials: "SS" },
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {clients.map((client, index) => (
            <div
              key={client.name}
              className="group bg-card border border-border rounded-xl p-6 text-center card-hover"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="font-display font-bold text-xl text-primary">
                  {client.initials}
                </span>
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

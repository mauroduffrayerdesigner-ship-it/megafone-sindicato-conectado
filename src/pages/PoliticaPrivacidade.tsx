import { Layout } from "@/components/layout/Layout";

export default function PoliticaPrivacidade() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Política de Privacidade
            </h1>
            <p className="text-xl text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            
            {/* Introdução */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">1. Introdução</h2>
              <p className="text-muted-foreground leading-relaxed">
                A Megafone Comunicação Sindical ("nós", "nosso" ou "empresa") está comprometida com a proteção 
                da privacidade e dos dados pessoais de nossos usuários e clientes. Esta Política de Privacidade 
                descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em 
                conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </div>

            {/* Dados Coletados */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">2. Dados que Coletamos</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Coletamos os seguintes tipos de dados pessoais:
              </p>
              
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">2.1 Formulário de Contato</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de telefone</li>
                <li>Nome da organização/sindicato</li>
                <li>Serviço de interesse</li>
                <li>Mensagem enviada</li>
              </ul>

              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">2.2 Newsletter</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Endereço de e-mail</li>
              </ul>

              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">2.3 Dados de Navegação (Analytics)</h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Páginas visitadas</li>
                <li>Data e hora do acesso</li>
                <li>Página de origem (referrer)</li>
                <li>Informações do navegador (user agent)</li>
                <li>Identificador de sessão anônimo</li>
              </ul>
            </div>

            {/* Finalidade */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">3. Finalidade do Tratamento</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos seus dados pessoais para as seguintes finalidades:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Atendimento de solicitações:</strong> Responder às suas mensagens e solicitações de orçamento enviadas pelo formulário de contato</li>
                <li><strong>Comunicação:</strong> Enviar nossa newsletter com novidades, artigos e conteúdos relevantes sobre comunicação sindical (mediante seu consentimento expresso)</li>
                <li><strong>Melhoria do site:</strong> Analisar dados de navegação para melhorar a experiência do usuário e o desempenho do site</li>
                <li><strong>Relacionamento comercial:</strong> Entrar em contato sobre nossos serviços quando você demonstrar interesse</li>
              </ul>
            </div>

            {/* Base Legal */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">4. Base Legal (LGPD)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O tratamento de seus dados pessoais é realizado com base nas seguintes hipóteses legais previstas na LGPD:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Consentimento (Art. 7º, I):</strong> Para envio de newsletter e comunicações de marketing</li>
                <li><strong>Execução de contrato ou procedimentos preliminares (Art. 7º, V):</strong> Para atender suas solicitações de contato e orçamento</li>
                <li><strong>Legítimo interesse (Art. 7º, IX):</strong> Para análise de dados de navegação visando melhorias no site</li>
              </ul>
            </div>

            {/* Compartilhamento */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">5. Compartilhamento de Dados</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Seus dados pessoais podem ser compartilhados com:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Prestadores de serviços:</strong> Empresas que nos auxiliam na operação do site e prestação de serviços (hospedagem, e-mail, etc.), sempre mediante contratos que garantam a proteção de seus dados</li>
                <li><strong>Autoridades públicas:</strong> Quando exigido por lei ou ordem judicial</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Não vendemos, alugamos ou comercializamos seus dados pessoais.</strong>
              </p>
            </div>

            {/* Armazenamento e Segurança */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">6. Armazenamento e Segurança</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Seus dados são armazenados em servidores seguros com as seguintes medidas de proteção:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Criptografia de dados em trânsito (HTTPS/TLS)</li>
                <li>Controle de acesso restrito aos dados</li>
                <li>Backups regulares</li>
                <li>Monitoramento de segurança</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Os dados são retidos pelo tempo necessário para cumprir as finalidades descritas nesta política 
                ou conforme exigido por lei.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">7. Cookies e Tecnologias de Rastreamento</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos cookies e tecnologias similares para:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Cookies essenciais:</strong> Necessários para o funcionamento básico do site</li>
                <li><strong>Cookies de análise:</strong> Para entender como os visitantes interagem com o site</li>
                <li><strong>Cookies de preferências:</strong> Para lembrar suas preferências (como tema claro/escuro)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </div>

            {/* Direitos do Titular */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">8. Seus Direitos (LGPD)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Confirmação e acesso:</strong> Confirmar a existência de tratamento e acessar seus dados</li>
                <li><strong>Correção:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados</li>
                <li><strong>Anonimização, bloqueio ou eliminação:</strong> Solicitar o tratamento de dados desnecessários ou excessivos</li>
                <li><strong>Portabilidade:</strong> Solicitar a portabilidade dos dados a outro fornecedor</li>
                <li><strong>Eliminação:</strong> Solicitar a eliminação dos dados tratados com base no consentimento</li>
                <li><strong>Informação:</strong> Ser informado sobre entidades com as quais compartilhamos seus dados</li>
                <li><strong>Revogação do consentimento:</strong> Revogar o consentimento a qualquer momento</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">9. Newsletter</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao se inscrever em nossa newsletter, você consente expressamente com o recebimento de 
                comunicações por e-mail. Você pode cancelar sua inscrição a qualquer momento através do 
                link de descadastramento presente em cada e-mail ou entrando em contato conosco.
              </p>
            </div>

            {/* Alterações */}
            <div className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">10. Alterações nesta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Esta Política de Privacidade pode ser atualizada periodicamente. Quaisquer alterações 
                significativas serão comunicadas através de aviso em nosso site. Recomendamos que você 
                revise esta página regularmente para se manter informado sobre nossas práticas de privacidade.
              </p>
            </div>

            {/* Contato */}
            <div className="mb-12 p-6 bg-muted/50 rounded-lg">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">11. Contato</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta Política de Privacidade, 
                entre em contato conosco:
              </p>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>E-mail:</strong> megafone.criacao@gmail.com</li>
                <li><strong>Telefone:</strong> (41) 99850-4505</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Responderemos à sua solicitação no prazo de até 15 dias úteis, conforme previsto na LGPD.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}

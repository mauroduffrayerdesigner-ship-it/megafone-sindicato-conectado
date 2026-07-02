## Plano: Publicar pelo Lovable e abandonar a VPS

Mantemos o Supabase atual (todos os dados, edge functions e configurações permanecem intactos) e passamos a servir o frontend pela hospedagem do Lovable, eliminando o problema de tela branca no build da VPS.

### Por que essa abordagem
- O backend (Supabase `mkozkrpyjehtfqsfnymr`) já funciona: banco, RLS, edge functions, tracking, usuários — nada muda.
- O erro de tela branca é do processo de build/serve da VPS. Publicando pelo Lovable, o build é feito e servido por infra otimizada — sem Nginx, sem cache, sem `.env` mal configurado.
- SSL, CDN, SPA fallback (deep links / refresh) e cache já vêm prontos.

### Passos

1. **Verificar segurança antes de publicar**
   - Rodar `security--run_security_scan` e revisar findings críticos.
   - Corrigir qualquer bloqueador antes do publish.

2. **Publicar o projeto**
   - Usar o botão Publish (ou o tool `preview_ui--publish`).
   - Isso gera a URL `megafone-sindicato-conectado.lovable.app` (já existente) atualizada com o código atual.

3. **Conectar o domínio `megafone.duffrayerdesigner.com`**
   - Em **Project Settings → Domains → Connect Domain**, adicionar o subdomínio.
   - No painel DNS do `duffrayerdesigner.com` (Hostinger), criar:
     - Registro **A**: nome `megafone` → valor `185.158.133.1`
     - Registro **TXT**: nome `_lovable.megafone` → valor fornecido pelo Lovable
   - Aguardar propagação (minutos a algumas horas) — Lovable provisiona SSL automaticamente.

4. **Desligar/redirecionar a VPS**
   - Parar o container Docker do site na Hostinger (opcional, mas evita conflito).
   - Não é mais necessário manter build/deploy manual.

5. **Atualizar README**
   - Remover/marcar como legado a seção de deploy Docker VPS.
   - Adicionar seção "Deploy via Lovable" com o novo fluxo simplificado.
   - Manter o manual Docker apenas como referência histórica (opcional).

### O que NÃO muda
- Supabase continua o mesmo (URL, chaves, tabelas, edge functions).
- Código-fonte não sofre alterações funcionais.
- Todos os dados (leads, blog, analytics, usuários) permanecem.

### Resultado esperado
- Site no ar em `megafone.duffrayerdesigner.com` com HTTPS.
- Zero tela branca — o Lovable resolve bundling automaticamente.
- Deploys futuros: basta clicar em "Update" no botão Publish após alterações.

### Observação sobre Lovable Cloud
Não é possível ativar o Lovable Cloud nativo neste projeto porque ele já está vinculado a um Supabase externo. Migrar para Cloud exigiria recriar o projeto do zero e reimportar todos os dados manualmente — não recomendado dado que tudo já funciona no Supabase atual.

<div align="center">

# 📣 MegaFone - Comunicação Estratégica

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/Licença-MIT-green?style=for-the-badge)

**Plataforma completa de comunicação estratégica para sindicatos e associações**

[🌐 Ver Demo](https://lovable.dev/projects/f24b09b4-2f9e-40d4-a80c-a6006c68c660) • [📖 Documentação](#-índice) • [🚀 Deploy](#-manual-de-deploy)

---

<img src="src/assets/logo-megafone.png" alt="MegaFone Logo" width="200"/>

</div>

---

## 📑 Índice

- [📋 Visão Geral](#-visão-geral)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Stack Tecnológica](#️-stack-tecnológica)
- [📁 Arquitetura do Projeto](#-arquitetura-do-projeto)
- [⚡ Edge Functions](#-edge-functions)
- [🗄️ Banco de Dados](#️-banco-de-dados)
- [🔐 Segurança](#-segurança)
- [🚀 Manual de Deploy](#-manual-de-deploy)
- [🔧 Variáveis de Ambiente](#-variáveis-de-ambiente)
- [📜 Scripts Disponíveis](#-scripts-disponíveis)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)
- [📞 Contato](#-contato)

---

## 📋 Visão Geral

O **MegaFone** é uma plataforma web moderna e completa desenvolvida para agências de comunicação estratégica, com foco em sindicatos, associações e entidades de classe. O sistema oferece um site institucional responsivo, painel administrativo robusto, sistema de blog, gestão de leads e newsletter integrada.

### 🎯 Principais Características

- 🏠 **Site Institucional** - Landing page profissional com design moderno
- 📊 **Painel Administrativo** - Gestão completa de conteúdo e leads
- 📝 **Blog Integrado** - Sistema de publicação com categorias e SEO
- 📧 **Newsletter** - Captação e gestão de assinantes
- 📈 **Analytics** - Rastreamento de pageviews e comportamento
- 🔒 **Autenticação Segura** - Sistema de login com roles (Admin/Gerenciador de Conteúdo)

---

## ✨ Funcionalidades

### 🌐 Site Institucional

| Página | Descrição |
|--------|-----------|
| **Home** | Landing page com hero, serviços, clientes, depoimentos e CTA |
| **Sobre** | História da empresa, equipe e valores |
| **Serviços** | Catálogo detalhado de serviços oferecidos |
| **Blog** | Artigos e notícias com sistema de categorias |
| **Contato** | Formulário de contato integrado com captura de leads |

### 📊 Painel Administrativo

```
/admin
├── /dashboard      → Métricas e visão geral
├── /leads          → Gestão de leads capturados
├── /posts          → Editor de posts do blog
├── /newsletter     → Gestão de assinantes
└── /integracoes    → Configuração de integrações
```

| Módulo | Funcionalidades |
|--------|-----------------|
| **Dashboard** | Estatísticas de leads, newsletter, pageviews e posts |
| **Leads** | Lista, filtros, status, notas e exportação |
| **Blog Posts** | CRUD completo, editor rich-text, categorias, publicação |
| **Newsletter** | Lista de assinantes, status ativo/inativo, remoção |
| **Integrações** | Configuração de serviços externos |

### 🔐 Sistema de Autenticação

- Login seguro com email/senha via Supabase Auth
- Sistema de roles simplificado:
  - **Admin**: Acesso total (Dashboard, Blog, Leads, Newsletter, Usuários, Integrações)
  - **Gerenciador de Conteúdo** (editor): Acesso a Dashboard, Blog, Leads e Newsletter
- Proteção de rotas administrativas baseada em permissões
- Verificação de permissões via RPC (`has_role`)

### 📈 Analytics e Tracking

- Rastreamento automático de pageviews
- Identificação de visitantes únicos
- Captura de referrer e user-agent
- Métricas de sessão

---

## 🛠️ Stack Tecnológica

### Frontend

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) | 18.3.1 | UI Library |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) | 5.x | Type Safety |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) | 5.x | Build Tool |
| ![TailwindCSS](https://img.shields.io/badge/-Tailwind-06B6D4?logo=tailwindcss&logoColor=white) | 3.4 | Styling |
| ![React Router](https://img.shields.io/badge/-React_Router-CA4245?logo=reactrouter&logoColor=white) | 6.x | Routing |
| ![TanStack Query](https://img.shields.io/badge/-TanStack_Query-FF4154?logo=reactquery&logoColor=white) | 5.x | Data Fetching |

### UI Components

| Biblioteca | Uso |
|------------|-----|
| **shadcn/ui** | Componentes base acessíveis |
| **Radix UI** | Primitivos de UI |
| **Lucide Icons** | Ícones SVG |
| **Sonner** | Notificações toast |
| **Recharts** | Gráficos e visualizações |

### Backend (Supabase)

| Serviço | Uso |
|---------|-----|
| **PostgreSQL** | Banco de dados relacional |
| **Auth** | Autenticação e autorização |
| **Edge Functions** | APIs serverless (Deno) |
| **RLS** | Row Level Security |
| **Realtime** | Atualizações em tempo real |

---

## 📁 Arquitetura do Projeto

```
megafone/
├── 📂 public/                    # Arquivos estáticos
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── 📂 src/
│   ├── 📂 assets/               # Imagens e recursos
│   │   ├── 📂 clients/          # Logos de clientes
│   │   └── 📂 team/             # Fotos da equipe
│   │
│   ├── 📂 components/
│   │   ├── 📂 home/             # Componentes da home
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── ClientsSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── NewsletterSection.tsx
│   │   │
│   │   ├── 📂 layout/           # Layout global
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   │
│   │   └── 📂 ui/               # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ... (50+ componentes)
│   │
│   ├── 📂 hooks/                # Custom hooks
│   │   ├── useAdmin.tsx         # Autenticação admin
│   │   ├── useAnalytics.tsx     # Métricas
│   │   ├── useBlogPosts.tsx     # CRUD de posts
│   │   ├── useIntegrations.tsx  # Gestão de integrações
│   │   ├── useLeads.tsx         # Gestão de leads
│   │   ├── useNewsletter.tsx    # Newsletter
│   │   └── useTheme.tsx         # Dark/Light mode
│   │
│   ├── 📂 integrations/
│   │   └── 📂 supabase/
│   │       ├── client.ts        # Cliente Supabase
│   │       └── types.ts         # Tipos gerados
│   │
│   ├── 📂 pages/
│   │   ├── Index.tsx            # Home
│   │   ├── Sobre.tsx            # Sobre nós
│   │   ├── Servicos.tsx         # Serviços
│   │   ├── Blog.tsx             # Lista de posts
│   │   ├── BlogPost.tsx         # Post individual
│   │   ├── Contato.tsx          # Formulário de contato
│   │   ├── PoliticaPrivacidade.tsx
│   │   ├── NotFound.tsx
│   │   │
│   │   └── 📂 admin/            # Área administrativa
│   │       ├── AdminLogin.tsx
│   │       ├── AdminLayout.tsx
│   │       ├── AdminDashboard.tsx
│   │       ├── LeadsPage.tsx
│   │       ├── BlogPostsPage.tsx
│   │       ├── BlogPostEditor.tsx
│   │       ├── NewsletterPage.tsx
│   │       └── IntegrationsPage.tsx
│   │
│   ├── 📂 lib/
│   │   └── utils.ts             # Utilitários (cn, etc.)
│   │
│   ├── App.tsx                  # Rotas principais
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos globais + Design System
│
├── 📂 supabase/
│   ├── config.toml              # Configuração do Supabase
│   │
│   ├── 📂 functions/            # Edge Functions
│   │   ├── 📂 create-lead/
│   │   │   └── index.ts         # Criação de leads
│   │   ├── 📂 subscribe-newsletter/
│   │   │   └── index.ts         # Inscrição newsletter
│   │   └── 📂 track-page-view/
│   │       └── index.ts         # Analytics
│   │
│   └── 📂 migrations/           # Migrações SQL
│
├── .env                         # Variáveis de ambiente
├── tailwind.config.ts           # Configuração Tailwind
├── vite.config.ts               # Configuração Vite
├── tsconfig.json                # Configuração TypeScript
└── package.json                 # Dependências
```

---

## ⚡ Edge Functions

O projeto utiliza **Supabase Edge Functions** (Deno) para lógica serverless:

### `create-lead`

Processa e valida novos leads do formulário de contato.

```typescript
// Endpoint: POST /functions/v1/create-lead
{
  "name": "string (obrigatório, 2-100 chars)",
  "email": "string (obrigatório, email válido)",
  "phone": "string (opcional, formato brasileiro)",
  "organization": "string (opcional)",
  "service": "string (opcional)",
  "message": "string (opcional, max 5000 chars)"
}
```

**Recursos de Segurança:**
- ✅ Validação de todos os campos
- ✅ Sanitização de inputs (XSS prevention)
- ✅ Rate limiting: 5 req/min por IP
- ✅ Validação de email com regex
- ✅ Limite de tamanho de payload

---

### `subscribe-newsletter`

Gerencia inscrições na newsletter.

```typescript
// Endpoint: POST /functions/v1/subscribe-newsletter
{
  "email": "string (obrigatório)"
}
```

**Recursos:**
- ✅ Validação de email
- ✅ Prevenção de duplicatas
- ✅ Rate limiting: 3 req/min por IP

---

### `track-page-view`

Registra visualizações de página para analytics.

```typescript
// Endpoint: POST /functions/v1/track-page-view
{
  "path": "string",
  "referrer": "string (opcional)",
  "visitor_id": "string (opcional)",
  "session_id": "string (opcional)"
}
```

**Recursos:**
- ✅ Captura de user-agent
- ✅ Rate limiting: 60 req/min por IP

---

## 🗄️ Banco de Dados

### Diagrama de Tabelas

```
┌─────────────────────┐     ┌─────────────────────┐
│      blog_posts     │     │        leads        │
├─────────────────────┤     ├─────────────────────┤
│ id (uuid, PK)       │     │ id (uuid, PK)       │
│ slug (text, unique) │     │ name (text)         │
│ title (text)        │     │ email (text)        │
│ content (text)      │     │ phone (text)        │
│ excerpt (text)      │     │ organization (text) │
│ image_url (text)    │     │ service (text)      │
│ category (text)     │     │ message (text)      │
│ author_id (uuid)    │     │ status (text)       │
│ published (bool)    │     │ notes (text)        │
│ read_time (text)    │     │ created_at          │
│ created_at          │     │ updated_at          │
│ updated_at          │     └─────────────────────┘
└─────────────────────┘

┌─────────────────────┐     ┌─────────────────────┐
│newsletter_subscribers│    │     page_views      │
├─────────────────────┤     ├─────────────────────┤
│ id (uuid, PK)       │     │ id (uuid, PK)       │
│ email (text, unique)│     │ path (text)         │
│ active (bool)       │     │ referrer (text)     │
│ subscribed_at       │     │ visitor_id (text)   │
│ unsubscribed_at     │     │ session_id (text)   │
└─────────────────────┘     │ user_agent (text)   │
                            │ created_at          │
┌─────────────────────┐     └─────────────────────┘
│     user_roles      │
├─────────────────────┤     ┌─────────────────────┐
│ id (uuid, PK)       │     │    integrations     │
│ user_id (uuid)      │     ├─────────────────────┤
│ role (app_role)     │     │ id (uuid, PK)       │
│ created_at          │     │ name (text)         │
└─────────────────────┘     │ type (text)         │
                            │ config (jsonb)      │
app_role ENUM:              │ active (bool)       │
- admin (acesso total)      │ created_at          │
- editor (gerenciador)      │ updated_at          │
                            └─────────────────────┘
```

### Políticas RLS (Row Level Security)

Todas as tabelas possuem **RLS habilitado** com políticas específicas:

| Tabela | SELECT | INSERT | UPDATE | DELETE |
|--------|--------|--------|--------|--------|
| `blog_posts` | Public (published) | Admin only | Admin only | Admin only |
| `leads` | Admin only | Via Edge Function | Admin only | Admin only |
| `newsletter_subscribers` | Admin only | Via Edge Function | Admin only | Admin only |
| `page_views` | Admin only | Via Edge Function | - | - |
| `integrations` | Admin only | Admin only | Admin only | Admin only |
| `user_roles` | Own role only | - | - | - |

---

## 🔐 Segurança

O projeto implementa múltiplas camadas de segurança:

### ✅ Implementado

| Camada | Recurso |
|--------|---------|
| **Autenticação** | Supabase Auth com JWT |
| **Autorização** | Sistema de roles (Admin/Gerenciador de Conteúdo) com permissões granulares |
| **RLS** | Políticas em todas as tabelas |
| **Input Validation** | Validação server-side nas Edge Functions |
| **Rate Limiting** | Proteção contra abuse em todas as APIs públicas |
| **Sanitização** | Prevenção de XSS nos inputs |
| **CORS** | Headers configurados corretamente |

### 🔧 Recomendações Adicionais

1. **Habilitar Leaked Password Protection** no Supabase:
   - Acesse: Supabase Dashboard → Authentication → Settings
   - Ative a proteção contra senhas vazadas

2. **Sanitização de HTML no Blog**:
   - Usar biblioteca como `DOMPurify` para renderizar conteúdo do blog

---

## 🚀 Manual de Deploy

### 📋 Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** 9.x ou superior (ou pnpm/yarn)
- **Conta Supabase** (para o banco de dados)
- **Git** (para controle de versão)

### 🔧 Configuração do Ambiente Local

#### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/megafone.git
cd megafone
```

#### 2. Instale as Dependências

```bash
npm install
```

#### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_PROJECT_ID="seu_project_id"
VITE_SUPABASE_PUBLISHABLE_KEY="sua_anon_key"
VITE_SUPABASE_URL="https://seu_project_id.supabase.co"
```

#### 4. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

O site estará disponível em `http://localhost:8080`

---

### 🗄️ Configuração do Supabase

#### 1. Crie um Novo Projeto

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em "New Project"
3. Escolha organização, nome e senha do banco
4. Aguarde a criação (2-3 minutos)

#### 2. Execute as Migrações

No dashboard do Supabase, acesse **SQL Editor** e execute os scripts de migração localizados em `supabase/migrations/` na ordem cronológica.

Ou use a CLI do Supabase:

```bash
# Instale a CLI
npm install -g supabase

# Faça login
supabase login

# Vincule ao projeto
supabase link --project-ref seu_project_id

# Execute as migrações
supabase db push
```

#### 3. Deploy das Edge Functions

```bash
# Deploy de todas as funções
supabase functions deploy create-lead
supabase functions deploy subscribe-newsletter
supabase functions deploy track-page-view
```

#### 4. Configure a Autenticação

1. Acesse **Authentication → Settings**
2. Configure os provedores desejados (Email, Google, etc.)
3. Defina as URLs de redirecionamento

#### 5. Crie um Usuário Admin

1. Acesse **Authentication → Users**
2. Clique em "Add User" → "Create new user"
3. Insira email e senha
4. No **SQL Editor**, adicione a role de admin:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('uuid-do-usuario-criado', 'admin');
```

---

### 🌐 Deploy em Produção

#### ✅ Opção Recomendada: Publicar via Lovable

Este é o método **oficialmente suportado e recomendado**. O Lovable cuida do build, bundling, SSL, CDN e SPA fallback automaticamente — **zero configuração de servidor**.

**Passo a passo:**

1. Abra o projeto no [Lovable](https://lovable.dev/projects/f24b09b4-2f9e-40d4-a80c-a6006c68c660)
2. Clique no botão **Publish** (canto superior direito)
3. O site fica disponível em `https://megafone-sindicato-conectado.lovable.app`
4. Para deploys futuros, basta clicar em **Update** após alterações

**Conectar domínio personalizado (ex: `megafone.duffrayerdesigner.com`):**

1. **Project Settings → Domains → Connect Domain**
2. Digite o subdomínio desejado
3. No painel DNS do seu registrador (Hostinger, Cloudflare, etc), adicione:
   - Registro **A** → nome `megafone` (ou `@` para raiz) → valor `185.158.133.1`
   - Registro **TXT** → nome `_lovable` (ou conforme instruído) → valor fornecido pelo Lovable
4. Aguarde propagação DNS (minutos a algumas horas)
5. SSL é provisionado automaticamente ✅

**Vantagens:**
- ✅ Sem tela branca (Vite bundling resolvido automaticamente)
- ✅ SSL/HTTPS automático
- ✅ CDN global
- ✅ SPA routing funciona (deep links + refresh sem 404)
- ✅ Deploys em 1 clique
- ✅ Rollback fácil pelo histórico do Lovable

---

#### ⚠️ Opções Alternativas (Legado)

As opções abaixo (Vercel, Netlify, Docker, VPS) são mantidas como referência histórica, mas **não são mais recomendadas**. O deploy via Lovable elimina os problemas de bundling que causavam tela branca em ambientes self-hosted.

<details>
<summary><strong>Vercel</strong></summary>

```bash
npm install -g vercel
vercel
# Configure variáveis: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY, VITE_SUPABASE_PROJECT_ID
```
</details>

<details>
<summary><strong>Netlify</strong></summary>

```bash
npm run build
# Faça upload da pasta 'dist' ou conecte o repositório
```
</details>

<details>
<summary><strong>Docker (Self-Hosting Básico)</strong></summary>

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t megafone .
docker run -p 80:80 megafone
```
</details>

---

### 🐳 Manual Legado: Docker + Hostinger VPS

> ⚠️ **AVISO:** Este manual é mantido apenas como referência. O método recomendado é **Publish via Lovable** (ver acima). O deploy em VPS pode gerar tela branca por problemas de bundling do Vite, cache de Nginx ou configuração de variáveis de ambiente. Se você optar por este caminho, terá que lidar manualmente com esses problemas.

Este guia detalha o deploy completo em uma VPS Hostinger usando Docker.

#### 📋 Pré-requisitos

- VPS Hostinger com Ubuntu 22.04 ou superior
- Domínio configurado apontando para o IP da VPS
- Acesso SSH à VPS

#### Passo 1: Preparar a VPS

```bash
# Conecte via SSH
ssh root@seu-ip-da-vps

# Atualize o sistema
apt update && apt upgrade -y

# Instale o Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instale o Docker Compose
apt install docker-compose-plugin -y

# Verifique a instalação
docker --version
docker compose version
```

#### Passo 2: Criar a Estrutura do Projeto

```bash
# Crie o diretório do projeto
mkdir -p /opt/megafone
cd /opt/megafone
```

#### Passo 3: Dockerfile Otimizado

Crie o arquivo `Dockerfile`:

```dockerfile
# Estágio de build
FROM node:18-alpine AS builder

WORKDIR /app

# Instala dependências primeiro (cache otimizado)
COPY package*.json ./
RUN npm ci --silent

# Copia código fonte e faz build
COPY . .

# Variáveis de ambiente em build time
ARG VITE_SUPABASE_PROJECT_ID
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_URL

ENV VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL

RUN npm run build

# Estágio de produção com Nginx
FROM nginx:alpine

# Copia configuração customizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia arquivos buildados
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe porta 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

#### Passo 4: Configuração do Nginx

Crie o arquivo `nginx.conf`:

```nginx
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Compressão Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript 
               application/rss+xml application/atom+xml image/svg+xml;

    server {
        listen 80;
        server_name _;
        root /usr/share/nginx/html;
        index index.html;

        # SPA routing - redireciona todas as rotas para index.html
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache para assets estáticos
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Segurança headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }
}
```

#### Passo 5: Docker Compose

Crie o arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  megafone:
    build:
      context: .
      args:
        VITE_SUPABASE_PROJECT_ID: ${VITE_SUPABASE_PROJECT_ID}
        VITE_SUPABASE_PUBLISHABLE_KEY: ${VITE_SUPABASE_PUBLISHABLE_KEY}
        VITE_SUPABASE_URL: ${VITE_SUPABASE_URL}
    container_name: megafone-web
    restart: unless-stopped
    ports:
      - "80:80"
    networks:
      - megafone-network
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  megafone-network:
    driver: bridge
```

#### Passo 6: Variáveis de Ambiente

Crie o arquivo `.env` na VPS:

```bash
nano /opt/megafone/.env
```

```env
VITE_SUPABASE_PROJECT_ID=seu_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=sua_anon_key
VITE_SUPABASE_URL=https://seu_project_id.supabase.co
```

#### Passo 7: Deploy

```bash
# Clone ou copie seu código para /opt/megafone
git clone https://github.com/seu-usuario/megafone.git /opt/megafone

# OU via SCP do seu computador local:
scp -r ./megafone root@seu-ip-da-vps:/opt/

# Navegue até o diretório
cd /opt/megafone

# Build e inicie os containers
docker compose up -d --build

# Verifique se está rodando
docker compose ps
docker compose logs -f
```

#### Passo 8: Configurar SSL com Certbot (HTTPS)

```bash
# Instale o Certbot
apt install certbot python3-certbot-nginx -y

# Gere o certificado (substitua pelo seu domínio)
certbot --nginx -d megafone.com.br -d www.megafone.com.br

# O certificado será renovado automaticamente
certbot renew --dry-run
```

#### Passo 9: Comandos Úteis

```bash
# Parar os containers
docker compose down

# Reiniciar
docker compose restart

# Ver logs em tempo real
docker compose logs -f megafone

# Atualizar a aplicação
cd /opt/megafone
git pull origin main
docker compose up -d --build

# Limpar imagens antigas
docker system prune -af
```

#### Passo 10: Configurar Firewall

```bash
# Habilite o UFW
ufw allow ssh
ufw allow http
ufw allow https
ufw enable

# Verifique as regras
ufw status
```

---

#### 📊 Diagrama de Arquitetura Docker/VPS

```
┌─────────────────────────────────────────────────────────────────────┐
│                         HOSTINGER VPS                                │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                        Docker                                │    │
│  │   ┌──────────────────────────────────────────────────────┐  │    │
│  │   │              megafone-web container                   │  │    │
│  │   │  ┌─────────────────┐    ┌───────────────────────┐   │  │    │
│  │   │  │     Nginx       │    │    React App (dist)    │   │  │    │
│  │   │  │  (Porta 80/443) │ -> │   - HTML/CSS/JS        │   │  │    │
│  │   │  │  + SSL + Gzip   │    │   - Assets estáticos   │   │  │    │
│  │   │  └─────────────────┘    └───────────────────────┘   │  │    │
│  │   └──────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                  │                                   │
│                                  ▼                                   │
│                          Internet (HTTPS)                            │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────┐
                    │       Supabase Cloud        │
                    │  - PostgreSQL Database      │
                    │  - Edge Functions           │
                    │  - Authentication           │
                    └─────────────────────────────┘
```

---

## 🔧 Variáveis de Ambiente

| Variável | Descrição | Obrigatório |
|----------|-----------|-------------|
| `VITE_SUPABASE_PROJECT_ID` | ID do projeto Supabase | ✅ |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Chave anônima (anon key) do Supabase | ✅ |
| `VITE_SUPABASE_URL` | URL do projeto Supabase | ✅ |

> **Nota:** Variáveis com prefixo `VITE_` são expostas ao cliente. Nunca use para secrets sensíveis.

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (porta 8080) |
| `npm run build` | Gera build de produção em `dist/` |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Executa ESLint para verificar código |

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos:

1. **Fork** o repositório
2. Crie uma **branch** para sua feature: `git checkout -b feature/nova-feature`
3. **Commit** suas mudanças: `git commit -m 'feat: adiciona nova feature'`
4. **Push** para a branch: `git push origin feature/nova-feature`
5. Abra um **Pull Request**

### Convenções de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação (sem mudança de código)
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2024 MegaFone Comunicação

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 📞 Contato

<div align="center">

**MegaFone Comunicação Estratégica**

[![Website](https://img.shields.io/badge/Website-megafone.com.br-FF6B35?style=for-the-badge&logo=google-chrome&logoColor=white)](https://megafone.com.br)
[![Email](https://img.shields.io/badge/Email-contato@megafone.com.br-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:contato@megafone.com.br)
[![Instagram](https://img.shields.io/badge/Instagram-@megafone-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/megafone)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-MegaFone-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/company/megafone)

---

### 👥 Equipe

| | Nome | Cargo |
|---|------|-------|
| <img src="src/assets/team/wellington-tiago.jpeg" width="50" style="border-radius:50%"/> | **Wellington Tiago** | Diretor de Comunicação |
| <img src="src/assets/team/leonardo-costa.jpeg" width="50" style="border-radius:50%"/> | **Leonardo Costa** | Diretor de Criação |
| <img src="src/assets/team/milena-isabel.jpeg" width="50" style="border-radius:50%"/> | **Milena Isabel** | Gestora de Projetos |
| <img src="src/assets/team/isabela-veiga.jpeg" width="50" style="border-radius:50%"/> | **Isabela Veiga** | Social Media |

</div>

---

<div align="center">

**Feito com ❤️ pela equipe MegaFone**

*Transformando comunicação em resultados desde 2020*

---

### 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido por **Duffrayer Designer**, com dedicação e cuidado.

</div>

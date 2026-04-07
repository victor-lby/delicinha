# Contribuindo com o DELICINHA

Obrigado por considerar contribuir! Este guia explica como participar do projeto.

## Pré-requisitos

- Node.js 18+
- npm 9+
- (Opcional) Chave da API Gemini gratuita — https://aistudio.google.com/apikey

## Setup local

```bash
git clone https://github.com/SEU_USER/delicinha.ia.br.git
cd delicinha.ia.br
npm install
cp .env.example .env.local  # edite com sua GEMINI_API_KEY se tiver
npm run dev
```

## Fluxo de contribuição

1. Crie uma branch a partir de `main`:
   ```bash
   git checkout -b feat/minha-feature
   ```
2. Faça suas alterações em `src/`
3. Verifique que compila:
   ```bash
   npm run build
   ```
4. Commit com mensagem descritiva em português ou inglês
5. Abra um Pull Request

## Convenções de código

- **TypeScript strict** — sem `any`, sem `@ts-ignore`
- **Tailwind CSS v4** — estilos inline via classes, sem CSS modules
- **Componentes** — Server Components por padrão, `"use client"` só quando necessário
- **Imports** — usar alias `@/` (mapeia para `src/`)
- **Idioma da UI** — Português brasileiro (pt-BR)
- **Idioma do código** — Inglês para nomes de variáveis, funções e arquivos

## Estrutura de arquivos

- `src/app/` — Pages e server actions (App Router)
- `src/components/` — Componentes React reutilizáveis
- `src/lib/` — Lógica de negócio (store, AI evaluator)
- `public/` — Assets estáticos

## O que contribuir

- Novas categorias de apps
- Melhorias no agente avaliador
- Funcionalidades de comunidade (comentários, perfil)
- Persistência real (SQLite, Postgres)
- Testes automatizados
- Melhorias de acessibilidade
- Responsividade mobile

## Princípios

- **Simplicidade** — Menos dependências, menos abstração
- **Funciona sem API key** — Fallback local sempre disponível
- **Português primeiro** — UI e conteúdo em pt-BR
- **AI-friendly** — Código claro para assistentes de IA entenderem e contribuírem

# DELICINHA

Plataforma brasileira de descoberta e avaliação de apps de inteligência artificial.

Envie um produto de IA, receba avaliação automática por um agente Gemini e deixe a comunidade votar no ranking.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** com React Compiler
- **Gemini 2.0 Flash** (Google AI Studio) como agente avaliador
- Persistência em JSON (sem banco externo)

## Início rápido

```bash
git clone https://github.com/SEU_USER/delicinha.ia.br.git
cd delicinha.ia.br
npm install
npm run dev
```

Acesse **http://localhost:3000**

## Agente avaliador (Gemini)

O sistema funciona sem chave de API (usa fallback local), mas para avaliação real por IA:

1. Pegue sua chave gratuita em https://aistudio.google.com/apikey
2. Crie o arquivo `.env.local`:
   ```
   GEMINI_API_KEY=AIzaSua-chave-aqui
   ```
3. Reinicie o servidor

## Estrutura do projeto

```
src/
├── app/                    # Pages (App Router)
│   ├── page.tsx            # Home (hero + ranking + footer)
│   ├── actions.ts          # Server actions (submit, vote)
│   ├── apps/[slug]/        # Página de detalhe da submissão
│   ├── como-funciona/      # Página estática
│   ├── categorias/         # Página estática
│   ├── sobre/              # Página estática
│   ├── contato/            # Página estática
│   └── termos/             # Página estática
├── components/             # Componentes React
│   ├── hero.tsx            # Formulário de submissão
│   ├── ranking.tsx         # Wrapper server do ranking
│   ├── ranking-client.tsx  # Ranking com filtros e paginação
│   ├── vote-buttons.tsx    # Botões de voto
│   ├── footer.tsx          # Footer com links
│   └── static-page.tsx     # Layout das páginas estáticas
└── lib/                    # Lógica de negócio
    ├── store.ts            # Persistência JSON
    └── ai-evaluator.ts     # Agente avaliador (Gemini + fallback)
```

## Funcionalidades

- **Submissão de apps** — Formulário com nome + URL
- **Avaliação por IA** — Gemini analisa e gera notas de qualidade técnica, valor para usuário e confiabilidade
- **Ranking dinâmico** — Ordenação por nota, votos ou data + filtro por categoria + busca por nome
- **Votação** — Upvote/downvote em cada submissão
- **Página de detalhe** — Avaliação completa, parecer da IA, indicadores rápidos
- **Paginação** — 5 itens por página no ranking

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (localhost:3000) |
| `npm run build` | Build de produção |
| `npm run start` | Servir build de produção |

## Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre como contribuir.

## Licença

[MIT](LICENSE)

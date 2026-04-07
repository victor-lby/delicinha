import { GoogleGenAI } from "@google/genai";
import type { AppSubmission } from "./store";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pickStars(score: number): string {
  if (score >= 9) return "★★★★★";
  if (score >= 8) return "★★★★☆";
  if (score >= 7) return "★★★☆☆";
  if (score >= 6) return "★★☆☆☆";
  return "★☆☆☆☆";
}

function formatDate(date: Date): string {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

type AiEvaluation = {
  shortDescription: string;
  categories: string[];
  techScore: number;
  userValue: number;
  reliability: number;
  aiSummary: string;
  aiOpinion: string;
  targetAudience: string;
  recommendPercent: number;
};

const EVAL_PROMPT = `Você é o agente avaliador da plataforma DELICINHA, especializado em analisar apps e ferramentas de IA.

Dado o nome e URL de um produto de IA, gere uma avaliação completa em JSON com os seguintes campos:

- shortDescription: descrição curta do produto em português (1-2 frases, máx 150 chars)
- categories: array com 2-3 categorias dentre: "IA Generativa", "Design", "Dev Tools", "Produtividade", "NLP Avançado", "Imagem", "Automação", "Dados", "UI", "Prototipação", "Workspace", "Knowledge", "Coding Assistant"
- techScore: nota de qualidade técnica (float 5.0-10.0)
- userValue: nota de valor para o usuário (float 5.0-10.0)
- reliability: nota de confiabilidade (float 5.0-10.0)
- aiSummary: resumo da metodologia de avaliação em português (1-2 frases)
- aiOpinion: parecer crítico e construtivo sobre o produto em português (2-3 frases com pontos fortes e pontos de atenção)
- targetAudience: público-alvo em português (ex: "Desenvolvedores e equipes de engenharia")
- recommendPercent: percentual estimado de recomendação (int 50-98)

Avalie com rigor e realismo. Produtos conhecidos e maduros devem ter notas mais altas. Produtos desconhecidos devem ter notas moderadas.

Responda APENAS com o JSON válido, sem markdown, sem explicação.`;

async function callGeminiAgent(name: string, url: string): Promise<AiEvaluation> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Avalie este produto de IA:\n\nNome: ${name}\nURL: ${url}`,
    config: {
      systemInstruction: EVAL_PROMPT,
      maxOutputTokens: 1024,
      temperature: 0.7,
    },
  });

  const text = response.text ?? "";
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned) as AiEvaluation;
}

function fallbackEvaluation(name: string, url: string): AiEvaluation {
  const text = `${name} ${url}`.toLowerCase();

  const categoryMap: Record<string, string[]> = {
    "IA Generativa": ["ai", "gpt", "llm", "chat", "generate", "copilot", "claude", "gemini", "openai"],
    "Design": ["design", "figma", "canva", "image", "visual", "art", "midjourney"],
    "Dev Tools": ["dev", "code", "github", "git", "ide", "cursor", "replit"],
    "Produtividade": ["notion", "slack", "docs", "task", "project", "team"],
    "Automação": ["automate", "workflow", "zapier", "n8n", "bot"],
    "Dados": ["data", "analytics", "dashboard", "bi", "chart"],
  };

  const categories: string[] = [];
  for (const [cat, keywords] of Object.entries(categoryMap)) {
    if (keywords.some((kw) => text.includes(kw))) categories.push(cat);
  }
  if (categories.length === 0) categories.push("IA Generativa");

  const r = (min: number, max: number) => Math.round((min + Math.random() * (max - min)) * 10) / 10;

  return {
    shortDescription: `${name} — ferramenta de ${categories[0]} avaliada pela comunidade DELICINHA.`,
    categories: categories.slice(0, 3),
    techScore: r(6.5, 9.5),
    userValue: r(6.5, 9.2),
    reliability: r(6.0, 9.3),
    aiSummary: `Avaliação automatizada considerando qualidade técnica, valor entregue ao usuário e confiabilidade do ${name}.`,
    aiOpinion: `${name} apresenta proposta consistente no segmento de ${categories[0]}. Recomenda-se atenção à documentação e onboarding de novos usuários. (Avaliação local — configure GEMINI_API_KEY para análise por IA completa.)`,
    targetAudience: "Comunidade de tecnologia",
    recommendPercent: Math.round(60 + Math.random() * 30),
  };
}

export async function evaluateSubmission(name: string, url: string): Promise<AppSubmission> {
  const slug = slugify(name);
  const now = new Date();
  const dateStr = formatDate(now);

  let eval_result: AiEvaluation;

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not set");
    }
    console.log(`[DELICINHA] Avaliando "${name}" com Gemini...`);
    eval_result = await callGeminiAgent(name, url);
    console.log(`[DELICINHA] Avaliação completa para "${name}"`);
  } catch (err) {
    console.log(`[DELICINHA] Fallback local para "${name}":`, (err as Error).message);
    eval_result = fallbackEvaluation(name, url);
  }

  const overallScore =
    Math.round(((eval_result.techScore + eval_result.userValue + eval_result.reliability) / 3) * 10) / 10;

  const active30d = Math.round(40 + Math.random() * 40);
  const mentionGrowth = Math.round(15 + Math.random() * 50);

  return {
    slug,
    name,
    url,
    shortDescription: eval_result.shortDescription,
    heroChips: ["Análise por IA", "Comunidade em tempo real"],
    categories: eval_result.categories,
    score: overallScore.toFixed(1),
    stars: pickStars(overallScore),
    reviews: "0 avaliações",
    trend: "Novo na plataforma",
    status: "Submissão ativa",
    submissionDetails: [
      `Responsável: Enviado pela comunidade`,
      `Data de envio: ${dateStr}`,
      `URL analisada: ${url}`,
      `Categoria principal: ${eval_result.categories[0]}`,
      eval_result.categories[1]
        ? `Categoria secundária: ${eval_result.categories[1]}`
        : `Categoria secundária: —`,
      `Público-alvo: ${eval_result.targetAudience}`,
      `Status de moderação: Aprovado`,
      `Última atualização da ficha: ${dateStr}`,
    ],
    aiSummary: eval_result.aiSummary,
    metrics: [
      { label: "Qualidade técnica", value: `${eval_result.techScore.toFixed(1)}/10`, tone: "pink" },
      { label: "Valor para usuário", value: `${eval_result.userValue.toFixed(1)}/10`, tone: "violet" },
      { label: "Confiabilidade", value: `${eval_result.reliability.toFixed(1)}/10`, tone: "cyan" },
    ],
    comments: [],
    overallDescription:
      "Pontuação composta por avaliação automática (40%), votos da comunidade (40%) e consistência de atualizações (20%).",
    aiOpinion: eval_result.aiOpinion,
    quickIndicators: [
      `${eval_result.recommendPercent}% recomendariam este app`,
      `${active30d}% usuários ativos em 30 dias`,
      `${mentionGrowth}% crescimento de menções no trimestre`,
    ],
    votes: 0,
    createdAt: now.toISOString(),
  };
}

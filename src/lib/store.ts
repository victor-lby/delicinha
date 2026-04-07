import fs from "fs";
import path from "path";

export type SubmissionMetric = {
  label: string;
  value: string;
  tone: "pink" | "violet" | "cyan";
};

export type SubmissionComment = {
  author: string;
  role: string;
  date: string;
  body: string;
};

export type AppSubmission = {
  slug: string;
  name: string;
  url: string;
  shortDescription: string;
  heroChips: string[];
  categories: string[];
  score: string;
  stars: string;
  reviews: string;
  trend: string;
  status: string;
  submissionDetails: string[];
  aiSummary: string;
  metrics: SubmissionMetric[];
  comments: SubmissionComment[];
  overallDescription: string;
  aiOpinion: string;
  quickIndicators: string[];
  votes: number;
  createdAt: string;
};

const DATA_FILE = path.join(process.cwd(), "data", "submissions.json");

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readStore(): AppSubmission[] {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    return [];
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeStore(data: AppSubmission[]) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export function getAllSubmissions(): AppSubmission[] {
  return readStore().sort((a, b) => b.votes - a.votes);
}

export function getSubmissionBySlug(slug: string): AppSubmission | undefined {
  return readStore().find((s) => s.slug === slug);
}

export function addSubmission(submission: AppSubmission): void {
  const data = readStore();
  data.push(submission);
  writeStore(data);
}

export function voteOnSubmission(slug: string, direction: "up" | "down"): number {
  const data = readStore();
  const item = data.find((s) => s.slug === slug);
  if (!item) return 0;
  item.votes += direction === "up" ? 1 : -1;
  if (item.votes < 0) item.votes = 0;
  item.reviews = `${item.votes.toLocaleString("pt-BR")} avaliações`;
  writeStore(data);
  return item.votes;
}


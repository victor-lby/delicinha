import { Redis } from "@upstash/redis";

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

const redis = new Redis({
  url: process.env.STORAGE_KV_REST_API_URL!,
  token: process.env.STORAGE_KV_REST_API_TOKEN!,
});

const SUBMISSIONS_KEY = "submissions";

function submissionKey(slug: string) {
  return `submission:${slug}`;
}

export async function getAllSubmissions(): Promise<AppSubmission[]> {
  const slugs = await redis.smembers(SUBMISSIONS_KEY);
  if (slugs.length === 0) return [];

  const pipeline = redis.pipeline();
  for (const slug of slugs) {
    pipeline.get(submissionKey(slug));
  }
  const results = await pipeline.exec<(AppSubmission | null)[]>();

  return results
    .filter((s): s is AppSubmission => s !== null)
    .sort((a, b) => b.votes - a.votes);
}

export async function getSubmissionBySlug(slug: string): Promise<AppSubmission | null> {
  return await redis.get<AppSubmission>(submissionKey(slug));
}

export async function addSubmission(submission: AppSubmission): Promise<void> {
  const pipeline = redis.pipeline();
  pipeline.set(submissionKey(submission.slug), submission);
  pipeline.sadd(SUBMISSIONS_KEY, submission.slug);
  await pipeline.exec();
}

export async function voteOnSubmission(slug: string, direction: "up" | "down"): Promise<number> {
  const item = await redis.get<AppSubmission>(submissionKey(slug));
  if (!item) return 0;

  item.votes += direction === "up" ? 1 : -1;
  if (item.votes < 0) item.votes = 0;
  item.reviews = `${item.votes.toLocaleString("pt-BR")} avaliações`;

  await redis.set(submissionKey(slug), item);
  return item.votes;
}

import { getAllSubmissions } from "@/lib/store";
import { RankingClient } from "./ranking-client";

export async function Ranking() {
  const submissions = await getAllSubmissions();
  return <RankingClient submissions={submissions} />;
}

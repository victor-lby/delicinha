import { getAllSubmissions } from "@/lib/store";
import { RankingClient } from "./ranking-client";

export function Ranking() {
  const submissions = getAllSubmissions();
  return <RankingClient submissions={submissions} />;
}

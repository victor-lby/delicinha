import { Hero } from "@/components/hero";
import { Ranking } from "@/components/ranking";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Ranking />
      <Footer />
    </main>
  );
}

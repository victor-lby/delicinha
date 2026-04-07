import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getSubmissionBySlug } from "@/lib/store";
import { VoteButtons } from "@/components/vote-buttons";
import { Footer } from "@/components/footer";

type DetailPageProps = {
  params: Promise<{ slug: string }>;
};

function metricToneClasses(tone: "pink" | "violet" | "cyan") {
  if (tone === "pink") {
    return {
      box: "bg-[#FDF2F8]",
      label: "text-[#BE185D]",
      value: "text-[#9D174D]",
    };
  }

  if (tone === "violet") {
    return {
      box: "bg-[#F5F3FF]",
      label: "text-[#6D28D9]",
      value: "text-[#5B21B6]",
    };
  }

  return {
    box: "bg-[#ECFEFF]",
    label: "text-[#0E7490]",
    value: "text-[#155E75]",
  };
}

export const dynamic = "force-dynamic";

export default async function AppDetailPage({ params }: DetailPageProps) {
  const { slug } = await params;
  const app = getSubmissionBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <main className="w-full bg-white">
      <section className="w-full bg-[#0D001A] px-6 pb-10 pt-7 md:px-14 lg:px-[88px]">
        <div className="mx-auto w-full max-w-[1440px] space-y-7">
          <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Link href="/">
              <h1 className="text-5xl font-extrabold tracking-tight text-transparent md:text-6xl bg-gradient-to-b from-[#FFD700] to-[#FF6B00] bg-clip-text font-adlam">
                DELICINHA
              </h1>
            </Link>

            <div className="flex flex-wrap items-center gap-5 text-sm font-semibold">
              <Link href="/" className="text-white">Ranking</Link>
              <Link href="/#enviar" className="text-[#E879F9]">Enviar App</Link>
              <span className="text-white">Comunidade</span>
            </div>
          </header>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <h2 className="text-4xl font-extrabold text-white md:text-[44px]">{app.name}</h2>
              <p className="max-w-[760px] text-[18px] font-medium leading-[1.45] text-[#E879F9]">{app.shortDescription}</p>

              <div className="flex flex-wrap gap-2 pt-1">
                {app.heroChips.map((chip) => (
                  <span key={chip} className="rounded-full bg-white/15 px-3 py-2 text-xs font-bold text-white">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative h-[280px] w-[220px] shrink-0 overflow-hidden rounded-xl border border-white/10 md:h-[360px] md:w-[280px] lg:h-[411px] lg:w-[320px]">
              <Image src="/personagem.png" alt="Personagem" fill className="object-contain object-bottom" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-12 md:px-14 lg:px-[88px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E4E4E7] bg-white px-[18px] py-3 text-[15px] font-bold text-[#52525B]"
            >
              <ArrowLeft className="h-[18px] w-[18px] text-[#71717A]" />
              Voltar ao ranking
            </Link>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#FF1493] to-[#8B008B] p-[30px] text-white">
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
              <div className="space-y-3">
                <span className="inline-flex rounded-full bg-white/20 px-3 py-2 text-xs font-bold">{app.status}</span>
                <h3 className="text-[42px] font-extrabold leading-tight">{app.name}</h3>
                <p className="max-w-[760px] text-[17px] font-medium leading-[1.35] text-[#FDF2F8]">{app.shortDescription}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {app.categories.map((chip) => (
                    <span key={chip} className="rounded-full bg-white/15 px-3 py-2 text-xs font-bold text-white">
                      {chip}
                    </span>
                  ))}
                </div>
                {app.url && (
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-bold text-white hover:bg-white/30 transition-colors"
                  >
                    Visitar site →
                  </a>
                )}
              </div>

              <div className="w-full max-w-[260px] space-y-1 rounded-[20px] bg-white/15 p-[18px] text-center">
                <p className="text-[14px] font-bold text-[#FDF2F8]">Nota geral</p>
                <p className="text-[68px] font-extrabold leading-none">{app.score}</p>
                <p className="text-[20px] text-[#FDE68A]">{app.stars}</p>
                <p className="text-[13px] font-semibold text-[#FDF2F8]">{app.votes.toLocaleString("pt-BR")} votos</p>
                <p className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{app.trend}</p>
                <div className="flex justify-center mt-3">
                  <VoteButtons slug={app.slug} isPremium />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              <article className="rounded-3xl border border-[#E4E4E7] bg-white p-7">
                <h4 className="text-[26px] font-extrabold text-[#8B008B]">Detalhes da submissão</h4>
                <ul className="mt-4 space-y-1 text-[15px] font-medium leading-[1.55] text-[#52525B]">
                  {app.submissionDetails.map((detail) => (
                    <li key={detail}>• {detail}</li>
                  ))}
                </ul>
              </article>

              <article className="rounded-3xl border border-[#E4E4E7] bg-white p-7">
                <h4 className="text-[26px] font-extrabold text-[#8B008B]">Avaliação da IA (sistema DELICINHA)</h4>
                <p className="mt-3 text-[15px] font-medium leading-[1.45] text-[#52525B]">{app.aiSummary}</p>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {app.metrics.map((metric) => {
                    const style = metricToneClasses(metric.tone);
                    return (
                      <div key={metric.label} className={`rounded-2xl p-[14px] ${style.box}`}>
                        <p className={`text-[13px] font-bold ${style.label}`}>{metric.label}</p>
                        <p className={`mt-1 text-[32px] font-extrabold ${style.value}`}>{metric.value}</p>
                      </div>
                    );
                  })}
                </div>
              </article>

              {app.comments.length > 0 && (
                <article className="rounded-3xl border border-[#E4E4E7] bg-white p-7">
                  <h4 className="text-[26px] font-extrabold text-[#8B008B]">Comentários dos usuários</h4>
                  <p className="mt-2 text-[15px] font-medium text-[#52525B]">
                    Feedback recente da comunidade sobre utilidade, velocidade e confiabilidade.
                  </p>

                  <div className="mt-5 space-y-3">
                    {app.comments.map((comment) => (
                      <article key={`${comment.author}-${comment.date}`} className="rounded-2xl border border-[#E4E4E7] bg-[#FAFAFB] p-4">
                        <p className="text-[13px] font-bold text-[#71717A]">
                          {comment.author} · {comment.role} · {comment.date}
                        </p>
                        <p className="mt-2 text-[14px] font-medium leading-[1.45] text-[#3F3F46]">{comment.body}</p>
                      </article>
                    ))}
                  </div>
                </article>
              )}
            </div>

            <aside className="space-y-6">
              <article className="rounded-3xl border border-[#E4E4E7] bg-white p-6">
                <h4 className="text-[22px] font-extrabold text-[#8B008B]">Resumo da nota geral</h4>
                <p className="mt-2 text-[60px] font-extrabold leading-none text-[#BE185D]">{app.score}</p>
                <p className="text-[20px] text-[#F59E0B]">{app.stars}</p>
                <p className="mt-2 text-[14px] font-medium leading-[1.45] text-[#52525B]">{app.overallDescription}</p>
              </article>

              <article className="rounded-3xl border border-[#E4E4E7] bg-white p-6">
                <h4 className="text-[22px] font-extrabold text-[#8B008B]">Parecer da IA</h4>
                <p className="mt-2 text-[14px] font-medium leading-[1.5] text-[#52525B]">{app.aiOpinion}</p>
              </article>

              <article className="rounded-[20px] bg-[#F4F4F5] p-5">
                <h4 className="text-[18px] font-extrabold text-[#27272A]">Indicadores rápidos</h4>
                <ul className="mt-2 space-y-1 text-[14px] font-semibold leading-[1.45] text-[#52525B]">
                  {app.quickIndicators.map((indicator) => (
                    <li key={indicator}>• {indicator}</li>
                  ))}
                </ul>
              </article>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

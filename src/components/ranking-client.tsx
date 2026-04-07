"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { VoteButtons } from "./vote-buttons";
import type { AppSubmission } from "@/lib/store";

const TAG_COLORS: Record<string, string> = {
  "IA Generativa": "bg-[#B139FF]/20 text-[#B139FF]",
  "Produtividade": "bg-[#00D9F9]/20 text-[#00A395]",
  "Design": "bg-[#FF008A]/10 text-[#FF008A]",
  "Dev Tools": "bg-[#9D00FF]/10 text-[#9D00FF]",
  "NLP Avançado": "bg-[#B139FF]/10 text-[#B139FF]",
  "Imagem": "bg-[#FFC700]/20 text-[#C27A00]",
  "Automação": "bg-[#00D9F9]/10 text-[#0284C7]",
  "Dados": "bg-[#14B8A6]/20 text-[#0D9488]",
  "UI": "bg-[#FFC700]/20 text-[#C27A00]",
  "Prototipação": "bg-[#A6F0E8]/30 text-[#099B8B]",
  "Workspace": "bg-[#A6F0E8]/30 text-[#099B8B]",
  "Knowledge": "bg-[#00D9F9]/10 text-[#00A395]",
  "Coding Assistant": "bg-[#9D00FF]/10 text-[#9D00FF]",
};

function getTagColor(tag: string) {
  return TAG_COLORS[tag] || "bg-[#E4E4E7] text-[#52525B]";
}

const RANK_COLORS = [
  "text-[#FFD600]",
  "text-[#FF008A]",
  "text-[#8C39F4]",
  "text-[#00A9E8]",
  "text-[#F57D17]",
  "text-[#14B8A6]",
  "text-[#E879F9]",
  "text-[#FF6B00]",
];

type SortOption = "votes" | "score" | "newest";

const SORT_LABELS: Record<SortOption, string> = {
  votes: "Mais Votados",
  score: "Maior Nota",
  newest: "Mais Recentes",
};

const FILTER_CATEGORIES = ["IA Generativa", "Produtividade", "Dev Tools", "Design", "Automação", "Dados"];

export function RankingClient({ submissions }: { submissions: AppSubmission[] }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("score");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    submissions.forEach((s) => s.categories.forEach((c) => cats.add(c)));
    return FILTER_CATEGORIES.filter((c) => cats.has(c));
  }, [submissions]);

  const filtered = useMemo(() => {
    let result = submissions;

    if (activeFilter) {
      result = result.filter((s) => s.categories.includes(activeFilter));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(q));
    }

    result = [...result].sort((a, b) => {
      if (sort === "votes") return b.votes - a.votes;
      if (sort === "score") return parseFloat(b.score) - parseFloat(a.score);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [submissions, activeFilter, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  function changeFilter(f: string | null) {
    setActiveFilter(f);
    setPage(1);
  }

  function changeSearch(q: string) {
    setSearch(q);
    setPage(1);
  }

  function changeSort(s: SortOption) {
    setSort(s);
    setPage(1);
    setSortOpen(false);
  }

  return (
    <section className="w-full bg-[#F3F4F6] flex justify-center py-20 px-4 md:px-8">
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-[#8A139E] text-4xl md:text-[64px] font-black font-adlam tracking-tight flex items-center gap-4 drop-shadow-sm">
            <span className="text-4xl md:text-5xl">🏆</span> RANKING DELICINHA
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-[760px]">
            Os apps e produtos de IA mais aprovados pela comunidade
          </p>
        </div>

        <div className="w-full bg-[#E9EAEE] rounded-[22px] p-3 flex flex-col md:flex-row justify-between items-center gap-3 border border-[#DDDFE5] shadow-sm">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => changeFilter(null)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-colors ${
                activeFilter === null
                  ? "bg-[#FF008A] text-white shadow-md"
                  : "bg-[#DCDDDF] text-zinc-600 hover:bg-[#D0D1D3]"
              }`}
            >
              Todos
            </button>
            {allCategories.map((f) => (
              <button
                key={f}
                onClick={() => changeFilter(activeFilter === f ? null : f)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-colors ${
                  activeFilter === f
                    ? "bg-[#FF008A] text-white shadow-md"
                    : "bg-[#DCDDDF] text-zinc-600 hover:bg-[#D0D1D3]"
                }`}
              >
                {f}
              </button>
            ))}
            <div className="px-5 py-3 bg-white rounded-xl text-sm min-w-[220px] flex items-center gap-2">
              <Search className="w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => changeSearch(e.target.value)}
                placeholder="Buscar por nome do projeto"
                className="bg-transparent border-none outline-none text-zinc-600 font-medium w-full placeholder:text-zinc-400"
              />
            </div>
            <button className="px-5 py-3 rounded-xl bg-[#FCE8F3] text-[#D81B86] font-bold text-xs uppercase tracking-wide">
              {filtered.length} projetos
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="bg-transparent px-4 py-3 rounded-xl flex items-center gap-2 font-bold text-[#8A139E] text-sm"
            >
              <span>Ordenar: {SORT_LABELS[sort]}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E4E4E7] z-30 overflow-hidden min-w-[180px]">
                {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => changeSort(key)}
                    className={`w-full px-4 py-3 text-left text-sm font-bold transition-colors ${
                      sort === key
                        ? "bg-[#FCE8F3] text-[#D81B86]"
                        : "text-zinc-600 hover:bg-[#F4F4F5]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-5">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-zinc-400 text-lg font-medium">
              {submissions.length === 0
                ? "Nenhum app cadastrado ainda. Seja o primeiro a enviar!"
                : "Nenhum resultado encontrado."}
            </div>
          )}

          {paginated.map((item, index) => {
            const rank = (safePage - 1) * perPage + index + 1;
            const isPremium = rank === 1;
            const colorClass = RANK_COLORS[index % RANK_COLORS.length];

            return (
              <div
                key={item.slug}
                className={`relative w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-10 p-6 md:p-8 rounded-[32px] ${
                  isPremium
                    ? "bg-gradient-to-r from-[#8C39F4] to-[#FF0AA0] text-white shadow-xl"
                    : "bg-white border-2"
                }`}
                style={{
                  borderColor: isPremium
                    ? "transparent"
                    : rank === 2
                    ? "#FF008A"
                    : "#D9DCE2",
                }}
              >
                <div
                  className={`text-[70px] md:text-[80px] font-black italic tracking-tighter shrink-0 leading-none min-w-[90px] text-center ${
                    isPremium ? "text-[#FFD600]" : colorClass
                  }`}
                >
                  {rank}
                </div>

                <div className="flex flex-col gap-2 grow items-center lg:items-start text-center lg:text-left w-full z-10 relative">
                  <h3
                    className={`text-2xl md:text-[42px] font-black leading-tight ${
                      isPremium ? "text-white" : "text-[#321B58]"
                    }`}
                  >
                    <Link href={`/apps/${item.slug}`} className="hover:underline">
                      {item.name}
                    </Link>
                  </h3>
                  <p
                    className={`text-base md:text-[28px] font-medium leading-snug max-w-[760px] ${
                      isPremium ? "text-white/90" : "text-zinc-600"
                    }`}
                  >
                    {item.shortDescription}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-3">
                    {item.categories.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                          isPremium ? "bg-white/15 text-white" : getTagColor(tag)
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/apps/${item.slug}`}
                    className={`mt-2 text-sm font-bold ${
                      isPremium ? "text-white" : "text-[#8A139E]"
                    }`}
                  >
                    Ver detalhes da submissão
                  </Link>
                </div>

                {isPremium && (
                  <div className="hidden xl:block absolute right-[240px] top-1/2 -translate-y-1/2 pointer-events-none z-20">
                    <Image src="/selo.png" alt="Selo de Qualidade" width={140} height={140} className="rotate-[10deg]" />
                  </div>
                )}

                <div className="flex items-center gap-6 shrink-0 min-w-[190px] justify-center lg:justify-end relative z-10">
                  <div className="flex flex-col items-center">
                    <div
                      className={`text-[40px] md:text-[56px] font-black tracking-tighter leading-none ${
                        isPremium ? "text-[#FFD600]" : colorClass
                      }`}
                    >
                      {item.votes.toLocaleString("pt-BR")}
                    </div>
                    <div
                      className={`text-[11px] font-black uppercase tracking-[0.2em] ${
                        isPremium ? "text-white/80" : "text-zinc-500"
                      }`}
                    >
                      votos
                    </div>
                    <div
                      className={`mt-3 px-3 py-1 rounded-full text-[11px] font-bold ${
                        isPremium
                          ? "bg-white/20 text-white"
                          : "bg-[#E4F4FF] text-[#0284C7]"
                      }`}
                    >
                      Nota: {item.score}
                    </div>
                  </div>
                  <VoteButtons slug={item.slug} isPremium={isPremium} />
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="w-10 h-10 rounded-xl bg-white border border-[#E4E4E7] flex items-center justify-center text-zinc-500 disabled:opacity-30 hover:bg-[#F4F4F5] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-colors ${
                  p === safePage
                    ? "bg-[#FF008A] text-white shadow-md"
                    : "bg-white border border-[#E4E4E7] text-zinc-600 hover:bg-[#F4F4F5]"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="w-10 h-10 rounded-xl bg-white border border-[#E4E4E7] flex items-center justify-center text-zinc-500 disabled:opacity-30 hover:bg-[#F4F4F5] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

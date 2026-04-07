"use client";

import Image from "next/image";
import { useActionState } from "react";
import { submitApp } from "@/app/actions";

export function Hero() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return await submitApp(formData);
    },
    null
  );

  return (
    <section className="w-full bg-[#0D001A] min-h-[950px] flex justify-center relative overflow-hidden px-4 md:px-8 pb-20">
      <div className="absolute top-[-20%] right-[-10%] w-[1200px] h-[1200px] bg-[#B139FF] opacity-20 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-center lg:items-start pt-16 md:pt-32 relative z-10">
        <div className="w-full lg:w-[55%] flex flex-col gap-10 md:gap-12 relative z-20">
          <div className="flex flex-col gap-4">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFC700] to-[#FF9900] text-[80px] md:text-[130px] font-black tracking-tighter font-adlam leading-[0.85] drop-shadow-lg">
              DELICINHA
            </h1>

            <h2 className="text-white text-3xl md:text-[50px] font-bold leading-[1.1] max-w-[650px] tracking-tight">
              Descubra os Melhores Apps de IA
            </h2>
          </div>

          <p className="text-[#FF2D92] text-xl md:text-[24px] font-bold leading-relaxed max-w-[550px]">
            Envie seu produto, receba análise com IA e ganhe votos da comunidade!
          </p>

          <form
            action={formAction}
            className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl w-full max-w-[580px] flex flex-col gap-6 relative mt-4 border border-gray-100"
          >
            <h3 className="text-[#9D00FF] text-[36px] font-black tracking-tight">Envie Seu Link</h3>

            <div className="flex flex-col gap-3">
              <label className="text-[#333333] text-sm font-bold uppercase tracking-wider">
                Nome do App / Produto
              </label>
              <div className="w-full h-[72px] bg-[#F5F5F5] border border-[#E5E5E5] rounded-2xl px-6 flex items-center transition-all hover:border-[#D1D1D1]">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ex: MeuApp IA"
                  className="w-full bg-transparent border-none outline-none text-zinc-600 font-bold text-lg placeholder:text-zinc-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[#333333] text-sm font-bold uppercase tracking-wider">
                URL do Produto/App
              </label>
              <div className="w-full h-[72px] bg-[#F5F5F5] border border-[#E5E5E5] rounded-2xl px-6 flex items-center transition-all hover:border-[#D1D1D1]">
                <input
                  type="url"
                  name="url"
                  required
                  placeholder="https://seu-produto.com"
                  className="w-full bg-transparent border-none outline-none text-zinc-600 font-bold text-lg placeholder:text-zinc-400"
                />
              </div>
            </div>

            {state?.error && (
              <p className="text-red-500 font-bold text-sm text-center">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-[72px] bg-gradient-to-r from-[#C026D3] to-[#DB2777] rounded-2xl text-white text-xl font-bold uppercase tracking-wide hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-pink-500/25 disabled:opacity-60"
            >
              {isPending ? "ANALISANDO COM IA..." : "ENVIAR PARA ANÁLISE"}
            </button>

            <div className="flex items-center justify-center gap-2 text-[#9D00FF] font-bold text-base">
              <span className="text-xl">✨</span>
              <span>Análise automática por IA em segundos</span>
            </div>
          </form>
        </div>

        <div className="absolute top-0 right-0 w-[55%] h-full hidden lg:block pointer-events-none overflow-visible">
          <div className="relative w-full h-full">
            <Image
              src="/personagem.png"
              alt="Personagem"
              fill
              className="object-contain object-right-bottom scale-[1.15] translate-y-[5%] translate-x-[5%]"
              priority
              sizes="(max-width: 1440px) 50vw, 800px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

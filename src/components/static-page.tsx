import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NAV_LINKS = [
  { label: "Ranking", href: "/" },
  { label: "Como Funciona", href: "/como-funciona" },
  { label: "Categorias", href: "/categorias" },
  { label: "Sobre", href: "/sobre" },
];

export function StaticPage({
  title,
  path,
  children,
}: {
  title: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen bg-white">
      <section className="w-full bg-[#0D001A] px-6 pb-10 pt-7 md:px-14 lg:px-[88px]">
        <div className="mx-auto w-full max-w-[1440px] space-y-7">
          <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Link href="/">
              <h1 className="text-5xl font-extrabold tracking-tight text-transparent md:text-6xl bg-gradient-to-b from-[#FFD700] to-[#FF6B00] bg-clip-text font-adlam">
                DELICINHA
              </h1>
            </Link>
            <div className="flex flex-wrap items-center gap-5 text-sm font-semibold">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={path === link.href ? "text-[#E879F9]" : "text-white"}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </header>
          <h2 className="text-4xl font-extrabold text-white md:text-[44px] pt-4 pb-2">{title}</h2>
        </div>
      </section>

      <section className="w-full px-6 py-12 md:px-14 lg:px-[88px]">
        <div className="mx-auto w-full max-w-[1440px] space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#E4E4E7] bg-white px-[18px] py-3 text-[15px] font-bold text-[#52525B]"
          >
            <ArrowLeft className="h-[18px] w-[18px] text-[#71717A]" />
            Voltar ao início
          </Link>

          <div className="prose prose-lg max-w-none text-[#3F3F46]">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}

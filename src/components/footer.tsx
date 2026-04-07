import Link from "next/link";
import { Twitter, Linkedin, Instagram } from "lucide-react";

const FOOTER_LINKS = {
  Produto: [
    { label: "Como Funciona", href: "/como-funciona" },
    { label: "Categorias", href: "/categorias" },
    { label: "Ranking", href: "/#ranking" },
  ],
  Comunidade: [
    { label: "Enviar Produto", href: "/#enviar" },
    { label: "Votar", href: "/#ranking" },
  ],
  Sobre: [
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Contato", href: "/contato" },
    { label: "Termos de Uso", href: "/termos" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full bg-[#0D001A] flex justify-center py-20 px-6 border-t-[8px] border-[#300066]">
      <div className="w-full max-w-[1200px] flex flex-col gap-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="flex flex-col gap-4">
            <Link href="/">
              <h2 className="text-[#FFD600] text-[56px] font-black font-adlam tracking-tighter leading-none">
                DELICINHA
              </h2>
            </Link>
            <p className="text-pink-200 text-xl font-medium">Descubra os melhores apps de IA</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 w-full md:w-auto">
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section} className="flex flex-col gap-6">
                <h3 className="text-white text-base font-bold uppercase tracking-wider">{section}</h3>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-zinc-400 font-medium text-sm hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-white/10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-zinc-500 font-medium text-sm">© 2026 DELICINHA. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            {[Twitter, Linkedin, Instagram].map((Icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/20 hover:text-white transition-all">
                <Icon size={20} strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

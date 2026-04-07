import { StaticPage } from "@/components/static-page";
import { Mail, MessageCircle, Github } from "lucide-react";

export default function Contato() {
  return (
    <StaticPage title="Contato" path="/contato">
      <div className="space-y-8">
        <p className="text-lg font-medium text-[#52525B]">
          Tem dúvidas, sugestões ou quer reportar um problema? Entre em contato com a gente.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#E4E4E7] p-6 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#FCE8F3] flex items-center justify-center">
              <Mail className="w-6 h-6 text-[#FF1493]" />
            </div>
            <h4 className="text-lg font-extrabold text-[#8B008B]">E-mail</h4>
            <p className="text-[15px] font-medium text-[#52525B]">contato@delicinha.ia.br</p>
          </div>

          <div className="rounded-2xl border border-[#E4E4E7] p-6 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-[#9B30FF]" />
            </div>
            <h4 className="text-lg font-extrabold text-[#8B008B]">Comunidade</h4>
            <p className="text-[15px] font-medium text-[#52525B]">Participe das discussões na plataforma</p>
          </div>

          <div className="rounded-2xl border border-[#E4E4E7] p-6 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#ECFEFF] flex items-center justify-center">
              <Github className="w-6 h-6 text-[#0E7490]" />
            </div>
            <h4 className="text-lg font-extrabold text-[#8B008B]">GitHub</h4>
            <p className="text-[15px] font-medium text-[#52525B]">Abra uma issue ou contribua com o projeto</p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#F4F4F5] p-6">
          <h4 className="text-xl font-extrabold text-[#27272A]">Tempo de resposta</h4>
          <p className="mt-2 text-[15px] font-medium text-[#52525B]">
            Respondemos em até 48 horas úteis. Para problemas urgentes com submissões ou avaliações, use o e-mail com o assunto [URGENTE].
          </p>
        </div>
      </div>
    </StaticPage>
  );
}

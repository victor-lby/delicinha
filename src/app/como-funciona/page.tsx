import { StaticPage } from "@/components/static-page";

export default function ComoFunciona() {
  return (
    <StaticPage title="Como Funciona" path="/como-funciona">
      <div className="space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#FF1493] to-[#8B008B] p-8 text-white">
          <h3 className="text-2xl font-extrabold">A plataforma DELICINHA em 3 passos</h3>
          <p className="mt-2 text-lg font-medium text-pink-100">
            Descubra, avalie e vote nos melhores apps de IA do mercado.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-[#E4E4E7] p-6">
            <div className="text-4xl font-black text-[#FF1493]">1</div>
            <h4 className="mt-3 text-xl font-extrabold text-[#8B008B]">Envie seu app</h4>
            <p className="mt-2 text-[15px] font-medium text-[#52525B]">
              Preencha o nome e a URL do produto de IA que quer cadastrar. Qualquer pessoa pode enviar — é rápido e gratuito.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4E4E7] p-6">
            <div className="text-4xl font-black text-[#9B30FF]">2</div>
            <h4 className="mt-3 text-xl font-extrabold text-[#8B008B]">IA avalia automaticamente</h4>
            <p className="mt-2 text-[15px] font-medium text-[#52525B]">
              Nosso agente de IA (Gemini) analisa o produto e gera notas de qualidade técnica, valor para o usuário e confiabilidade — tudo em segundos.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E4E4E7] p-6">
            <div className="text-4xl font-black text-[#FFD700]">3</div>
            <h4 className="mt-3 text-xl font-extrabold text-[#8B008B]">Comunidade vota</h4>
            <p className="mt-2 text-[15px] font-medium text-[#52525B]">
              Cada submissão recebe votos da comunidade. O ranking é atualizado em tempo real com base na nota da IA e nos votos dos usuários.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#F4F4F5] p-6">
          <h4 className="text-xl font-extrabold text-[#27272A]">Composição da nota</h4>
          <ul className="mt-3 space-y-2 text-[15px] font-medium text-[#52525B]">
            <li>• <strong>40%</strong> — Avaliação automática por IA (qualidade técnica, valor, confiabilidade)</li>
            <li>• <strong>40%</strong> — Votos da comunidade</li>
            <li>• <strong>20%</strong> — Consistência de atualizações e engajamento</li>
          </ul>
        </div>
      </div>
    </StaticPage>
  );
}

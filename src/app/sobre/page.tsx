import { StaticPage } from "@/components/static-page";

export default function Sobre() {
  return (
    <StaticPage title="Sobre Nós" path="/sobre">
      <div className="space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#FF1493] to-[#8B008B] p-8 text-white">
          <h3 className="text-2xl font-extrabold">DELICINHA</h3>
          <p className="mt-2 text-lg font-medium text-pink-100">
            A plataforma brasileira de descoberta e avaliação de apps de inteligência artificial.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-extrabold text-[#8B008B]">Nossa missão</h4>
          <p className="text-[15px] font-medium leading-relaxed text-[#52525B]">
            Democratizar o acesso à informação sobre ferramentas de IA. Acreditamos que todo mundo merece saber quais são os melhores produtos disponíveis — e a comunidade é a melhor fonte para isso.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-extrabold text-[#8B008B]">Como nasceu</h4>
          <p className="text-[15px] font-medium leading-relaxed text-[#52525B]">
            O DELICINHA nasceu da necessidade de ter um lugar centralizado, em português, para descobrir e comparar apps de IA. Com tantas ferramentas surgindo todos os dias, ficava difícil saber o que realmente vale a pena.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-extrabold text-[#8B008B]">Tecnologia</h4>
          <p className="text-[15px] font-medium leading-relaxed text-[#52525B]">
            A plataforma usa IA (Gemini) para avaliar automaticamente cada submissão, gerando notas de qualidade técnica, valor para o usuário e confiabilidade. A nota final combina avaliação da IA com votos da comunidade.
          </p>
        </div>

        <div className="rounded-2xl bg-[#F4F4F5] p-6">
          <h4 className="text-xl font-extrabold text-[#27272A]">Valores</h4>
          <ul className="mt-3 space-y-2 text-[15px] font-medium text-[#52525B]">
            <li>• <strong>Transparência</strong> — Notas e critérios sempre visíveis</li>
            <li>• <strong>Comunidade</strong> — A voz dos usuários pesa tanto quanto a IA</li>
            <li>• <strong>Acessibilidade</strong> — Conteúdo em português, gratuito e aberto</li>
            <li>• <strong>Imparcialidade</strong> — Sem patrocínio ou viés comercial no ranking</li>
          </ul>
        </div>
      </div>
    </StaticPage>
  );
}

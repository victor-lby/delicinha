import { StaticPage } from "@/components/static-page";

const CATEGORIES = [
  { name: "IA Generativa", color: "from-[#B139FF] to-[#8C39F4]", description: "Chatbots, assistentes conversacionais, geradores de texto e conteúdo com modelos de linguagem." },
  { name: "Design", color: "from-[#FF008A] to-[#FF1493]", description: "Ferramentas de geração de imagens, edição visual, prototipação e criação gráfica assistida por IA." },
  { name: "Dev Tools", color: "from-[#9D00FF] to-[#6D28D9]", description: "Assistentes de código, autocompletar, debug, deploy e ferramentas de desenvolvimento com IA." },
  { name: "Produtividade", color: "from-[#00D9F9] to-[#0284C7]", description: "Gestão de tarefas, documentos, calendário, automação de workflows e organização de equipes." },
  { name: "NLP Avançado", color: "from-[#B139FF] to-[#9D00FF]", description: "Tradução, transcrição, análise de sentimento, processamento de linguagem natural e speech-to-text." },
  { name: "Imagem", color: "from-[#FFC700] to-[#FF6B00]", description: "Geração, edição e processamento de imagens com inteligência artificial." },
  { name: "Automação", color: "from-[#14B8A6] to-[#0D9488]", description: "Bots, integrações, workflows automatizados e RPA com inteligência artificial." },
  { name: "Dados", color: "from-[#0284C7] to-[#0E7490]", description: "Analytics, dashboards, BI, visualização de dados e insights automatizados." },
];

export default function Categorias() {
  return (
    <StaticPage title="Categorias" path="/categorias">
      <div className="space-y-6">
        <p className="text-lg font-medium text-[#52525B]">
          Os apps enviados para a plataforma são classificados automaticamente pela IA em uma ou mais categorias.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="rounded-2xl border border-[#E4E4E7] overflow-hidden">
              <div className={`bg-gradient-to-r ${cat.color} px-6 py-4`}>
                <h4 className="text-lg font-extrabold text-white">{cat.name}</h4>
              </div>
              <div className="px-6 py-4">
                <p className="text-[15px] font-medium text-[#52525B]">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticPage>
  );
}

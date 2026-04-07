import { StaticPage } from "@/components/static-page";

export default function Termos() {
  return (
    <StaticPage title="Termos de Uso" path="/termos">
      <div className="space-y-6">
        <p className="text-sm font-medium text-[#71717A]">Última atualização: Abril de 2026</p>

        <div className="space-y-4">
          <h4 className="text-xl font-extrabold text-[#8B008B]">1. Aceitação dos termos</h4>
          <p className="text-[15px] font-medium leading-relaxed text-[#52525B]">
            Ao acessar e utilizar a plataforma DELICINHA, você concorda com estes Termos de Uso. Se não concordar com algum dos termos, não utilize a plataforma.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-extrabold text-[#8B008B]">2. Submissão de produtos</h4>
          <p className="text-[15px] font-medium leading-relaxed text-[#52525B]">
            Qualquer usuário pode enviar produtos de IA para avaliação. Ao submeter um produto, você declara que as informações fornecidas são verdadeiras e que tem autorização para representar ou indicar o produto.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-extrabold text-[#8B008B]">3. Avaliação por IA</h4>
          <p className="text-[15px] font-medium leading-relaxed text-[#52525B]">
            As avaliações são geradas automaticamente por inteligência artificial e não representam opinião editorial da equipe DELICINHA. As notas são indicativas e podem variar conforme atualizações do modelo de avaliação.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-extrabold text-[#8B008B]">4. Votação</h4>
          <p className="text-[15px] font-medium leading-relaxed text-[#52525B]">
            Os votos devem refletir a opinião genuína do usuário. Manipulação de votos (bots, múltiplas contas, coordenação artificial) resultará em remoção dos votos e possível banimento.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-extrabold text-[#8B008B]">5. Conteúdo e propriedade</h4>
          <p className="text-[15px] font-medium leading-relaxed text-[#52525B]">
            Os nomes, logos e descrições dos produtos pertencem aos seus respectivos proprietários. O DELICINHA não reivindica propriedade sobre os produtos listados.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-extrabold text-[#8B008B]">6. Limitação de responsabilidade</h4>
          <p className="text-[15px] font-medium leading-relaxed text-[#52525B]">
            A plataforma é fornecida "como está". Não garantimos a precisão das avaliações da IA nem a disponibilidade contínua do serviço. O uso dos produtos listados é por conta e risco do usuário.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-extrabold text-[#8B008B]">7. Alterações</h4>
          <p className="text-[15px] font-medium leading-relaxed text-[#52525B]">
            Estes termos podem ser atualizados a qualquer momento. Alterações significativas serão comunicadas na plataforma. O uso continuado após alterações implica aceitação dos novos termos.
          </p>
        </div>
      </div>
    </StaticPage>
  );
}

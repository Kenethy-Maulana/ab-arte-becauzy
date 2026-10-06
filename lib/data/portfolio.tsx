// TODO(Supabase): estes dados virão da tabela `portfolio` + Storage.
// Peças de exemplo para validar o sistema até existir o catálogo real.

export type PortfolioCategory =
  | "Alfaiataria"
  | "Vestidos"
  | "Feminino"
  | "Masculino"
  | "Personalizados"
  | "Detalhes";

export type PortfolioPiece = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  details: string[];
};

export const portfolioCategories: PortfolioCategory[] = [
  "Alfaiataria",
  "Vestidos",
  "Feminino",
  "Masculino",
  "Personalizados",
  "Detalhes",
];

export const portfolioPieces: PortfolioPiece[] = [
  {
    slug: "fato-sob-medida",
    title: "Fato Sob Medida",
    category: "Alfaiataria",
    description:
      "Fato de duas peças construído a partir das medidas do cliente, com estrutura leve e caimento natural.",
    details: [
      "Corte personalizado",
      "Acabamento artesanal",
      "Escolha de tecido em ateliê",
      "Prova intermédia incluída",
    ],
  },
  {
    slug: "vestido-de-cerimonia",
    title: "Vestido de Cerimónia",
    category: "Vestidos",
    description:
      "Vestido desenhado para uma ocasião especial, com modelagem exclusiva e acabamento interno limpo.",
    details: [
      "Modelagem exclusiva",
      "Forro selecionado",
      "Ajuste final em prova",
      "Detalhes concluídos à mão",
    ],
  },
  {
    slug: "camisa-artesanal",
    title: "Camisa Artesanal",
    category: "Masculino",
    description:
      "Camisa de medida com colarinho estruturado e costuras finas, pensada para uso diário elegante.",
    details: [
      "Medida de colarinho e punho",
      "Costura de ponto fino",
      "Botões escolhidos com o cliente",
    ],
  },
  {
    slug: "saia-de-alfaiataria",
    title: "Saia de Alfaiataria",
    category: "Feminino",
    description:
      "Saia de corte reto com cintura ajustada ao corpo, confecionada em tecido de alfaiataria.",
    details: ["Cintura sob medida", "Fenda e acabamento definidos com o cliente"],
  },
  {
    slug: "peca-personalizada",
    title: "Peça Personalizada",
    category: "Personalizados",
    description:
      "Peça desenvolvida a partir de uma referência trazida pelo cliente, reinterpretada no ateliê.",
    details: [
      "Análise de referência",
      "Proposta de tecido e corte",
      "Acompanhamento por WhatsApp",
    ],
  },
  {
    slug: "detalhe-de-acabamento",
    title: "Detalhe de Acabamento",
    category: "Detalhes",
    description:
      "Casa de botão feita à mão — o detalhe que distingue uma peça de ateliê.",
    details: ["Casa à mão", "Linha de seda", "Reforço interno"],
  },
];

export function getPieceBySlug(slug: string): PortfolioPiece | undefined {
  return portfolioPieces.find((piece) => piece.slug === slug);
}
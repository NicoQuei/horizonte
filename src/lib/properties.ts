export type Property = {
  slug: string;
  title: string;
  location: string;
  city: string;
  /** preço em reais */
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // m²
  /** distância da orla em metros — 0 = pé na areia */
  beachDistance: number;
  oceanfront: boolean;
  tags: string[];
  excerpt: string;
  story: string;
  images: string[];
};

// imagens servidas localmente de /public/images (sempre carregam, sem depender de rede externa)
const U = (id: string) => `/images/${id.replace(/^photo-/, "")}.jpg`;

export const PROPERTIES: Property[] = [
  {
    slug: "casa-cumbuco-pe-na-areia",
    title: "Casa Maré Alta",
    location: "Cumbuco",
    city: "Caucaia · CE",
    price: 4200000,
    bedrooms: 4,
    bathrooms: 5,
    area: 420,
    beachDistance: 0,
    oceanfront: true,
    tags: ["pé na areia", "frente mar", "piscina de borda infinita"],
    excerpt:
      "Onde o quintal termina e o Atlântico começa. A linha entre dentro e fora foi apagada de propósito.",
    story:
      "Projetada para a hora dourada: às 17h40 a luz entra rasante pela varanda de 18 metros e incendeia o concreto aparente. Quatro suítes, todas de frente para o mar, e uma piscina que some no horizonte quando a maré sobe.",
    images: [
      U("photo-1613490493576-7fde63acd811"),
      U("photo-1502672260266-1c1ef2d93688"),
      U("photo-1512917774080-9991f1c4c750"),
    ],
  },
  {
    slug: "apto-beira-mar-fortaleza",
    title: "Cobertura Horizonte 2401",
    location: "Beira Mar",
    city: "Fortaleza · CE",
    price: 3650000,
    bedrooms: 3,
    bathrooms: 4,
    area: 310,
    beachDistance: 120,
    oceanfront: true,
    tags: ["frente mar", "cobertura", "vista 180°"],
    excerpt:
      "No 24º andar, a cidade vira moldura e o mar vira a obra. Pôr do sol sobre a Beira Mar todos os dias.",
    story:
      "Uma cobertura duplex com terraço de vidro suspenso sobre a avenida mais cinematográfica do Ceará. A vista de 180° cobre da Ponte dos Ingleses ao Mucuripe. Acabamento em pedra calcária e madeira freijó.",
    images: [
      U("photo-1545324418-cc1a3fa10c00"),
      U("photo-1567496898669-ee935f5f647a"),
      U("photo-1560448204-e02f11c3d0e2"),
    ],
  },
  {
    slug: "bangalo-jericoacoara",
    title: "Bangalô Duna Branca",
    location: "Jericoacoara",
    city: "Jijoca · CE",
    price: 1850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 160,
    beachDistance: 300,
    oceanfront: false,
    tags: ["vila de Jeri", "arquitetura orgânica", "pôr do sol na duna"],
    excerpt:
      "Pé descalço na vila mais famosa do litoral. Estrutura de madeira e palha, conforto de hotel-boutique.",
    story:
      "A 4 minutos a pé da Duna do Pôr do Sol. Construção bioclimática em eucalipto e telha cerâmica, ventilação cruzada que dispensa ar-condicionado na maior parte do ano. Um refúgio que cabe como segunda casa ou ativo de temporada.",
    images: [
      U("photo-1505691938895-1758d7feb511"),
      U("photo-1502005229762-cf1b2da7c5d6"),
      U("photo-1522708323590-d24dbb6b0267"),
    ],
  },
  {
    slug: "villa-porto-das-dunas",
    title: "Villa Sal & Sol",
    location: "Porto das Dunas",
    city: "Aquiraz · CE",
    price: 2950000,
    bedrooms: 4,
    bathrooms: 4,
    area: 360,
    beachDistance: 80,
    oceanfront: false,
    tags: ["condomínio fechado", "família", "piscina privativa"],
    excerpt:
      "A 80 metros da praia, dentro do condomínio mais seguro do litoral leste. Feita para crescer com a família.",
    story:
      "Em um dos condomínios mais procurados de Aquiraz, perto do Beach Park. Pé-direito duplo na sala, cozinha gourmet integrada ao deck da piscina e um jardim tropical desenhado por paisagista. Pensada para quem quer praia sem abrir mão de infraestrutura.",
    images: [
      U("photo-1600596542815-ffad4c1539a9"),
      U("photo-1600585154340-be6161a56a0c"),
      U("photo-1600607687939-ce8a6c25118c"),
    ],
  },
  {
    slug: "loft-mucuripe",
    title: "Loft Maresia",
    location: "Mucuripe",
    city: "Fortaleza · CE",
    price: 980000,
    bedrooms: 1,
    bathrooms: 1,
    area: 78,
    beachDistance: 200,
    oceanfront: false,
    tags: ["primeiro imóvel", "investimento", "vista parcial mar"],
    excerpt:
      "Compacto, luminoso e a dois passos do mar. O primeiro endereço de quem entende de luz.",
    story:
      "Um loft de 78 m² com pé-direito alto e janela do piso ao teto que captura a brisa do Mucuripe. Excelente para morar sozinho ou rentabilizar por temporada — a vacância na região é quase nula.",
    images: [
      U("photo-1502672260266-1c1ef2d93688"),
      U("photo-1493809842364-78817add7ffb"),
      U("photo-1522708323590-d24dbb6b0267"),
    ],
  },
  {
    slug: "mansao-taiba",
    title: "Mansão Vento Leste",
    location: "Taíba",
    city: "São Gonçalo do Amarante · CE",
    price: 6800000,
    bedrooms: 5,
    bathrooms: 6,
    area: 620,
    beachDistance: 0,
    oceanfront: true,
    tags: ["pé na areia", "frente mar", "kitesurf", "alto padrão"],
    excerpt:
      "620 m² de frente para uma das praias de kite mais cobiçadas do mundo. O vento aqui é o luxo.",
    story:
      "Erguida sobre uma falésia baixa na Taíba, com acesso privativo à praia. Cinco suítes, adega climatizada, home theater e um deck panorâmico onde o vento leste cruza o ano inteiro — o paraíso de quem vive de kitesurf e de quem vive de horizonte.",
    images: [
      U("photo-1613977257363-707ba9348227"),
      U("photo-1613490493576-7fde63acd811"),
      U("photo-1600566753086-00f18fb6b3ea"),
    ],
  },
];

export function getProperty(slug: string) {
  return PROPERTIES.find((p) => p.slug === slug);
}

export const PRICE_BOUNDS = {
  min: Math.min(...PROPERTIES.map((p) => p.price)),
  max: Math.max(...PROPERTIES.map((p) => p.price)),
};

export function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export type Review = {
  id: number;
  name: string;
  handle: string;
  location: string;
  rating: number;
  text: string;
  /** Gradient stops for the generated initials avatar. */
  avatar: [string, string];
};

export const reviews: Review[] = [
  {
    id: 1,
    name: "Marina Albuquerque",
    handle: "@marina.alb",
    location: "Fortaleza, CE",
    rating: 5,
    text: "Comprei pra ver e acabei viciada. O Super Lemon é absurdo, não consigo parar. 'Só mais uma' virou o pacote inteiro.",
    avatar: ["#C82830", "#EF841A"],
  },
  {
    id: 2,
    name: "Rafael Tavares",
    handle: "@rafa.tvrs",
    location: "São Paulo, SP",
    rating: 5,
    text: "O Spicy Mix tem o equilíbrio perfeito entre o doce e o picante. Já é item fixo no meu setup de home office.",
    avatar: ["#E8451A", "#7A1F0C"],
  },
  {
    id: 3,
    name: "Juliana Prado",
    handle: "@ju.prado",
    location: "Belo Horizonte, MG",
    rating: 5,
    text: "Montei um kit de 12 pra dividir com a equipe e sumiu em um dia. A embalagem é linda e o sabor entrega tudo.",
    avatar: ["#EF841A", "#C82830"],
  },
  {
    id: 4,
    name: "Diego Nóbrega",
    handle: "@diegonbg",
    location: "Recife, PE",
    rating: 5,
    text: "Castanha premium de verdade. O Dark Cocoa parece sobremesa. Atendimento pelo WhatsApp foi rápido demais.",
    avatar: ["#8B5A2B", "#3A2417"],
  },
  {
    id: 5,
    name: "Camila Rocha",
    handle: "@camirocha",
    location: "Curitiba, PR",
    rating: 5,
    text: "Crocância de outro nível. Já fiz 3 pedidos esse mês. O Classic Salted é perigoso de tão bom.",
    avatar: ["#D8D2C4", "#8A8578"],
  },
  {
    id: 6,
    name: "Thiago Mendes",
    handle: "@thi.mendes",
    location: "Salvador, BA",
    rating: 5,
    text: "Marca com personalidade e produto à altura. Virei embaixador não-oficial, já indiquei pra meio escritório.",
    avatar: ["#C82830", "#EF841A"],
  },
];

export type Product = {
  id: number;
  name: string;
  flavor: string;
  category: "Cítrico" | "Picante" | "Clássico" | "Cacau";
  price: number;
  badge: "Mais Vendido" | "Novo" | null;
  description: string;
  /** Driver for the branded SVG packshot + card glow. */
  color: string;
  color2: string;
  /** 1–5 heat/flavour intensity meter shown on the card. */
  intensity: number;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Super Lemon",
    flavor: "Limão Intenso",
    category: "Cítrico",
    price: 24.9,
    badge: "Mais Vendido",
    description:
      "Crocância explosiva com toque cítrico que vicia na primeira mordida.",
    color: "#C82830",
    color2: "#EF841A",
    intensity: 4,
  },
  {
    id: 2,
    name: "Spicy Mix",
    flavor: "Pimenta + Mel",
    category: "Picante",
    price: 26.9,
    badge: "Novo",
    description:
      "O equilíbrio impossível entre o fogo da pimenta e a doçura do mel.",
    color: "#C82830",
    color2: "#EF841A",
    intensity: 5,
  },
  {
    id: 3,
    name: "Classic Salted",
    flavor: "Sal Grosso",
    category: "Clássico",
    price: 22.9,
    badge: null,
    description: "O clássico que nunca falha. Sal grosso na medida certa.",
    color: "#D8D2C4",
    color2: "#8A8578",
    intensity: 2,
  },
  {
    id: 4,
    name: "Dark Cocoa",
    flavor: "Cacau Amargo",
    category: "Cacau",
    price: 25.9,
    badge: null,
    description:
      "Para quem quer intensidade sem concessões. Cacau 70% no snack.",
    color: "#8B5A2B",
    color2: "#3A2417",
    intensity: 3,
  },
];

export const categories = [
  "Todos",
  ...Array.from(new Set(products.map((p) => p.category))),
] as const;

export type Category = (typeof categories)[number];

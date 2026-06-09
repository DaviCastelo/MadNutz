export type InstaPost = {
  id: number;
  caption: string;
  likes: number;
  comments: number;
  /** Gradient stops for the generated post tile. */
  gradient: [string, string];
  label: string;
};

export const instaPosts: InstaPost[] = [
  {
    id: 1,
    caption: "Só mais uma, tá? 🔥 #madnutz",
    likes: 1284,
    comments: 96,
    gradient: ["#F5A623", "#E8451A"],
    label: "SÓ MAIS UMA",
  },
  {
    id: 2,
    caption: "Super Lemon chegando pra explodir seu paladar.",
    likes: 982,
    comments: 54,
    gradient: ["#C9D400", "#F5A623"],
    label: "SUPER LEMON",
  },
  {
    id: 3,
    caption: "Pimenta + mel = o crime perfeito. Spicy Mix.",
    likes: 1567,
    comments: 142,
    gradient: ["#E8451A", "#7A1F0C"],
    label: "SPICY MIX",
  },
  {
    id: 4,
    caption: "Monta o teu kit e divide (ou não).",
    likes: 743,
    comments: 38,
    gradient: ["#1A1A1A", "#F5A623"],
    label: "MONTA O KIT",
  },
  {
    id: 5,
    caption: "Cacau 70% que parece sobremesa. Dark Cocoa.",
    likes: 1102,
    comments: 71,
    gradient: ["#8B5A2B", "#3A2417"],
    label: "DARK COCOA",
  },
  {
    id: 6,
    caption: "99% nuts, 1% malícia. Sempre.",
    likes: 2034,
    comments: 188,
    gradient: ["#F5A623", "#1A1A1A"],
    label: "99% NUTS",
  },
];

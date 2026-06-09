import type { InstagramPost } from "@/lib/instagram";

/** Fallback estático caso a API pública do Instagram falhe no build/runtime. */
export const fallbackInstaPosts: InstagramPost[] = [
  {
    id: "fallback-1",
    caption: "Só mais uma, tá? 🔥 #madnutz",
    likes: 1284,
    comments: 96,
    imageUrl: "",
    permalink: "https://www.instagram.com/madnutzbr/",
  },
  {
    id: "fallback-2",
    caption: "Super Lemon chegando pra explodir seu paladar.",
    likes: 982,
    comments: 54,
    imageUrl: "",
    permalink: "https://www.instagram.com/madnutzbr/",
  },
  {
    id: "fallback-3",
    caption: "Pimenta + mel = o crime perfeito. Spicy Mix.",
    likes: 1567,
    comments: 142,
    imageUrl: "",
    permalink: "https://www.instagram.com/madnutzbr/",
  },
  {
    id: "fallback-4",
    caption: "Monta o teu kit e divide (ou não).",
    likes: 743,
    comments: 38,
    imageUrl: "",
    permalink: "https://www.instagram.com/madnutzbr/",
  },
  {
    id: "fallback-5",
    caption: "Cacau 70% que parece sobremesa. Dark Cocoa.",
    likes: 1102,
    comments: 71,
    imageUrl: "",
    permalink: "https://www.instagram.com/madnutzbr/",
  },
  {
    id: "fallback-6",
    caption: "99% nuts, 1% malícia. Sempre.",
    likes: 2034,
    comments: 188,
    imageUrl: "",
    permalink: "https://www.instagram.com/madnutzbr/",
  },
];

import { products } from "./products";

export type KitTier = {
  size: 3 | 6 | 12;
  discount: number;
  label: string;
  note: string;
};

export const kitTiers: KitTier[] = [
  { size: 3, discount: 0, label: "Trio", note: "Pra testar sem compromisso." },
  { size: 6, discount: 0.08, label: "Meia dúzia", note: "O equilíbrio perfeito." },
  { size: 12, discount: 0.15, label: "Dúzia cheia", note: "Pro viciado assumido." },
];

const priceOf = (id: number): number =>
  products.find((p) => p.id === id)?.price ?? 0;

/** Sum of the selected units at full price. */
export function kitGross(units: number[]): number {
  return units.reduce((sum, id) => sum + priceOf(id), 0);
}

/** Kit price after the tier's bulk discount. */
export function kitNet(units: number[], discount: number): number {
  return kitGross(units) * (1 - discount);
}

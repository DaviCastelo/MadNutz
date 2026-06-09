import type { Product } from "@/data/products";

/** Branded vector packshot — a stand-up snack pouch themed per flavour.
 *  Authored as inline SVG (not a raster photo, none were provided) so it
 *  stays razor-sharp and uses the real display font. */
export function Packshot({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { id, name, flavor, color, color2 } = product;
  const [first, ...rest] = name.split(" ");
  const second = rest.join(" ");
  const uid = `pk-${id}`;

  return (
    <svg
      viewBox="0 0 200 260"
      className={className}
      role="img"
      aria-label={`Embalagem ${name}, sabor ${flavor}`}
    >
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color2} />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
      </defs>

      {/* pouch body + top seal */}
      <rect x="26" y="22" width="148" height="222" rx="16" fill={`url(#${uid}-body)`} stroke="#2a2a2a" />
      <rect x="26" y="22" width="148" height="18" rx="9" fill="#15110b" />
      <rect x="34" y="27" width="132" height="3" rx="1.5" fill={color} opacity="0.5" />

      {/* left gloss */}
      <rect x="40" y="48" width="16" height="184" rx="8" fill="#ffffff" opacity="0.06" />

      {/* brand mark */}
      <text x="100" y="64" textAnchor="middle" className="font-mono" fontSize="9" letterSpacing="2.5" fill={color}>
        MADNUTZ
      </text>

      {/* flavour band */}
      <g transform="rotate(-7 100 140)">
        <rect x="12" y="112" width="176" height="58" fill={color} />
        <rect x="12" y="112" width="176" height="4" fill="#ffffff" opacity="0.25" />
      </g>
      <text x="100" y="138" textAnchor="middle" className="font-display" fontSize="23" fontWeight="800" fill="#0a0a0a">
        {first.toUpperCase()}
      </text>
      {second && (
        <text x="100" y="161" textAnchor="middle" className="font-display" fontSize="23" fontWeight="800" fill="#0a0a0a">
          {second.toUpperCase()}
        </text>
      )}

      {/* footer copy */}
      <text x="100" y="200" textAnchor="middle" className="font-mono" fontSize="9" letterSpacing="1.5" fill="#cfcabd">
        {flavor.toUpperCase()}
      </text>
      <text x="100" y="230" textAnchor="middle" className="font-mono" fontSize="8" letterSpacing="1" fill="#777777">
        90g · 99% NUTS
      </text>
    </svg>
  );
}

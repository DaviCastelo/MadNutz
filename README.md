# MadNutz — Site (E-commerce + Vitrine de Marca)

Site da **MadNutz**, marca brasileira de snacks premium de castanha. Dark
premium com energia streetwear, tipografia pesada, detalhes em âmbar e
elementos 3D (logo + mascote em GLB) renderizados com React Three Fiber.

> **Slogan:** _Só mais uma, tá?_ · **DNA:** 99% nuts, 1% malícia.

---

## Stack

| Camada      | Tecnologia                                            |
| ----------- | ----------------------------------------------------- |
| Framework   | Next.js 14 (App Router) · TypeScript (strict)         |
| Estilo      | Tailwind CSS v3 + design tokens                       |
| Animação    | Framer Motion                                         |
| 3D          | Three.js · @react-three/fiber · @react-three/drei     |
| Estado      | Zustand (carrinho, persistido em `localStorage`)      |
| Ícones      | Lucide React (+ SVGs de marca para WhatsApp/TikTok)   |
| Fontes      | Syne (display) · Plus Jakarta Sans (corpo) · Space Mono (mono) via `next/font` |
| Deploy      | Vercel                                                |

---

## Começando

```bash
npm install
npm run dev        # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm run start
```

> **Os modelos 3D já estão otimizados e incluídos** em `public/assets/`
> (`logo.glb`, `mascote.glb`). O site roda direto, sem passos extras.

---

## Modelos 3D (importante)

Os arquivos originais entregues eram **enormes e inutilizáveis na web**:

| Arquivo      | Original | Otimizado | Triângulos        |
| ------------ | -------- | --------- | ----------------- |
| `logo.glb`   | ~132 MB  | **0,4 MB** | 1.374.736 → 109.956 |
| `mascote.glb`| ~238 MB  | **1,1 MB** | 2.481.856 → 297.804 |

Eram pura geometria não-indexada e super-tesselada (sem texturas). O pipeline
de otimização (`scripts/optimize-glb.mjs`) faz:

1. remove normais por-vértice + UVs não usadas;
2. **weld** (indexa e funde vértices coincidentes);
3. **simplify** (meshoptimizer — corta a contagem de triângulos);
4. **normals** (regenera normais suaves para iluminação);
5. **weld** novamente (re-indexa para o Draco);
6. **compressão Draco** na escrita.

O decoder Draco é **auto-hospedado** em `public/draco/` (sem depender de CDN),
e `useGLTF` é apontado para ele.

### Regenerar os GLBs a partir das fontes

Só é necessário se você tiver **novos** arquivos brutos. Coloque-os em
`assets-src/` com os nomes corretos e rode o script:

```bash
# Copie os fontes brutos para a pasta de origem (ignorada pelo git):
#   <fonte do logo>     -> assets-src/logo.glb
#   <fonte do mascote>  -> assets-src/mascote.glb

npm run optimize:assets   # gera public/assets/logo.glb e mascote.glb
```

No Windows (PowerShell), por exemplo:

```powershell
New-Item -ItemType Directory -Force assets-src | Out-Null
Copy-Item "D:\3dsvg.glb"      "assets-src\logo.glb"    -Force
Copy-Item "D:\3dsvg (1).glb"  "assets-src\mascote.glb" -Force
npm run optimize:assets
```

Ajuste a agressividade da simplificação em `scripts/optimize-glb.mjs`
(`ratio` por arquivo) se quiser mais detalhe ou arquivos menores.

### Fallbacks (sem 3D)

O WebGL é desligado e substituído por imagens estáticas quando:

- a tela é **< 768px** (mobile), **ou**
- o navegador **não suporta WebGL**, **ou**
- o usuário pediu **`prefers-reduced-motion`**.

Nesses casos aparecem `public/assets/mascote-fallback.svg` e o wordmark em CSS
(`<LogoWordmark />`). Todo `<Canvas>` está dentro de `<Suspense>`.

---

## Deploy na Vercel

O projeto é Vercel-native (zero config):

```bash
npm i -g vercel      # caso ainda não tenha
vercel               # preview
vercel --prod        # produção
```

Ou conecte o repositório em [vercel.com/new](https://vercel.com/new) — a Vercel
detecta Next.js automaticamente. **Garanta que `public/assets/*.glb` e
`public/draco/` estão versionados** (eles são necessários em produção).

---

## Estrutura

```
madnutz/
├── app/                  layout, página, globals.css, not-found, icon.svg
├── components/
│   ├── brand/            wordmark CSS + ícones SVG (WhatsApp, TikTok)
│   ├── three/            engine 3D (Model, ModelStage, Particles, clone hook)
│   ├── hero/             HeroCanvas + LogoModel + MascoteModel + Hero
│   ├── navbar/ products/ kit-builder/ reviews/ instagram/ about/ contact/ cart/
│   └── ui/               Button, Badge, Reveal, Section, Marquee, Stars, ...
├── store/cart.ts         Zustand + persist
├── data/                 products, kits, reviews, instagram (mock)
├── lib/                  utils (cn, waLink, brl) + hooks (use3DEnabled, ...)
├── scripts/optimize-glb.mjs
├── public/assets/        logo.glb, mascote.glb (otimizados), fallback SVG
└── public/draco/         decoder Draco auto-hospedado
```

---

## Contato / Integrações

- **WhatsApp:** `+55 85 99249-2148` — todos os CTAs de compra/contato e o
  checkout do carrinho abrem o WhatsApp com a mensagem pré-formatada.
- **Instagram:** [@madnutzbr](https://www.instagram.com/madnutzbr/)

Os produtos, kits, reviews e o feed do Instagram usam **dados mock** em
`data/` — troque por uma API/CMS quando houver backend.
"# MadNutz" 

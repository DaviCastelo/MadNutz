import { NextRequest } from "next/server";

const IG_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const ALLOWED_SUFFIXES = ["cdninstagram.com", "fbcdn.net", "instagram.com"];

function isAllowedInstagramCdn(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url);
    if (protocol !== "https:") return false;
    return ALLOWED_SUFFIXES.some(
      (suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`),
    );
  } catch {
    return false;
  }
}

/** Proxy de imagens do CDN do Instagram (evita bloqueio do next/image e hotlink). */
export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url");
  if (!raw || !isAllowedInstagramCdn(raw)) {
    return new Response("URL inválida", { status: 400 });
  }

  const upstream = await fetch(raw, {
    headers: {
      "User-Agent": IG_USER_AGENT,
      Referer: "https://www.instagram.com/",
      Accept: "image/*,*/*;q=0.8",
    },
    next: { revalidate: 3600 },
  });

  if (!upstream.ok) {
    return new Response("Falha ao buscar imagem", { status: upstream.status });
  }

  const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
  const buffer = await upstream.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

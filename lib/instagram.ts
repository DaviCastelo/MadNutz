import { fallbackInstaPosts } from "@/data/instagram";

export type InstagramPost = {
  id: string;
  caption: string;
  likes: number;
  comments: number;
  imageUrl: string;
  permalink: string;
  isVideo?: boolean;
};

const IG_APP_ID = "936619743392459";
const IG_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

type IgMediaNode = {
  __typename?: string;
  id?: string;
  shortcode?: string;
  display_url?: string;
  thumbnail_src?: string;
  is_video?: boolean;
  edge_liked_by?: { count?: number };
  edge_media_preview_like?: { count?: number };
  edge_media_to_comment?: { count?: number };
  edge_media_to_caption?: { edges?: { node?: { text?: string } }[] };
  edge_sidecar_to_children?: { edges?: { node?: { display_url?: string } }[] };
};

function imageFromNode(node: IgMediaNode): string {
  if (node.__typename === "GraphSidecar") {
    const first = node.edge_sidecar_to_children?.edges?.[0]?.node?.display_url;
    if (first) return first;
  }
  return node.display_url ?? node.thumbnail_src ?? "";
}

function captionFromNode(node: IgMediaNode): string {
  return node.edge_media_to_caption?.edges?.[0]?.node?.text?.trim() ?? "";
}

function likesFromNode(node: IgMediaNode): number {
  return node.edge_media_preview_like?.count ?? node.edge_liked_by?.count ?? 0;
}

function mapNode(node: IgMediaNode): InstagramPost | null {
  if (!node.shortcode) return null;
  const imageUrl = imageFromNode(node);
  if (!imageUrl) return null;

  return {
    id: node.id ?? node.shortcode,
    caption: captionFromNode(node),
    likes: likesFromNode(node),
    comments: node.edge_media_to_comment?.count ?? 0,
    imageUrl,
    permalink: `https://www.instagram.com/p/${node.shortcode}/`,
    isVideo: node.is_video ?? node.__typename === "GraphVideo",
  };
}

/** Busca os posts públicos mais recentes do perfil (cache de 1h). */
export async function getInstagramPosts(
  username = process.env.INSTAGRAM_USERNAME ?? "madnutzbr",
  limit = 6,
): Promise<InstagramPost[]> {
  try {
    const res = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
      {
        headers: {
          "User-Agent": IG_USER_AGENT,
          "X-IG-App-ID": IG_APP_ID,
          Accept: "*/*",
          "Accept-Language": "pt-BR,pt;q=0.9",
          Referer: `https://www.instagram.com/${username}/`,
          Origin: "https://www.instagram.com",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) throw new Error(`Instagram HTTP ${res.status}`);

    const json = (await res.json()) as {
      data?: {
        user?: {
          edge_owner_to_timeline_media?: { edges?: { node?: IgMediaNode }[] };
        };
      };
    };

    const edges = json.data?.user?.edge_owner_to_timeline_media?.edges ?? [];
    const posts = edges
      .map((edge) => (edge.node ? mapNode(edge.node) : null))
      .filter((post): post is InstagramPost => post !== null)
      .slice(0, limit);

    if (posts.length > 0) return posts;
  } catch {
    // cai no fallback abaixo
  }

  return fallbackInstaPosts;
}

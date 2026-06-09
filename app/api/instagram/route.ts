import { getInstagramPosts } from "@/lib/instagram";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getInstagramPosts();
  return Response.json({ posts });
}

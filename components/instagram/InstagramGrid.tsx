"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { instagramImageSrc, type InstagramPost } from "@/lib/instagram";

const LABELS = ["SÓ MAIS UMA", "SUPER LEMON", "SPICY MIX", "MONTA O KIT", "DARK COCOA", "99% NUTS"];

function hasRealImages(posts: InstagramPost[]) {
  return posts.some((post) => Boolean(post.imageUrl));
}

export function InstagramGrid({ posts: initialPosts }: { posts: InstagramPost[] }) {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    if (hasRealImages(initialPosts)) return;

    let cancelled = false;

    fetch("/api/instagram")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { posts?: InstagramPost[] } | null) => {
        if (cancelled || !data?.posts?.length) return;
        if (hasRealImages(data.posts)) setPosts(data.posts);
      })
      .catch(() => {
        // mantém fallback visual
      });

    return () => {
      cancelled = true;
    };
  }, [initialPosts]);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {posts.map((post, i) => {
        const hasImage = Boolean(post.imageUrl);
        const label = LABELS[i % LABELS.length];

        return (
          <Reveal key={post.id} delay={i * 0.05}>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={post.caption ? `Ver post: ${post.caption}` : `Ver post no Instagram`}
              className="group relative block aspect-square overflow-hidden rounded-xl bg-surface"
            >
              {hasImage ? (
                <Image
                  src={instagramImageSrc(post.imageUrl)}
                  alt={post.caption || "Post MadNutz no Instagram"}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 50vw, 320px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-accent-primary to-accent-orange p-4">
                  <span className="text-center font-display text-xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-2xl">
                    {label}
                  </span>
                </div>
              )}

              {post.isVideo && (
                <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm">
                  <Play className="h-4 w-4 fill-current" />
                </span>
              )}

              <div className="absolute inset-0 flex items-center justify-center gap-5 bg-background/75 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-1.5 font-mono text-sm font-bold text-ink">
                  <Heart className="h-4 w-4 fill-accent-primary text-accent-primary" />
                  {post.likes.toLocaleString("pt-BR")}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-sm font-bold text-ink">
                  <MessageCircle className="h-4 w-4 text-accent-primary" />
                  {post.comments}
                </span>
              </div>
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}

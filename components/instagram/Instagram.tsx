import { Heart, Instagram as InstagramIcon, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { instaPosts } from "@/data/instagram";
import { SOCIAL } from "@/lib/utils";

export function Instagram() {
  return (
    <Section
      id="instagram"
      eyebrow="Comunidade"
      title={<><span className="text-accent-primary">@madnutzbr</span></>}
      description="O dia a dia da marca, os bastidores e a torcida que não para de crescer."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {instaPosts.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.05}>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver post: ${post.caption}`}
              className="group relative block aspect-square overflow-hidden rounded-xl"
              style={{ background: `linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})` }}
            >
              <span className="absolute inset-0 grid place-items-center p-4 text-center font-display text-2xl font-extrabold uppercase leading-none tracking-tight text-background/90 sm:text-3xl">
                {post.label}
              </span>
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
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href={SOCIAL.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          <InstagramIcon className="h-4 w-4" />
          Seguir no Instagram
        </a>
      </div>
    </Section>
  );
}

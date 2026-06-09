import { Instagram as InstagramIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { buttonVariants } from "@/components/ui/Button";
import { InstagramGrid } from "./InstagramGrid";
import { getInstagramPosts } from "@/lib/instagram";
import { SOCIAL } from "@/lib/utils";

export const revalidate = 3600;

export async function Instagram() {
  const posts = await getInstagramPosts();

  return (
    <Section
      id="instagram"
      eyebrow="Comunidade"
      title={
        <>
          <span className="text-accent-primary">@madnutz</span>
          <br className="sm:hidden" />
          <span className="text-accent-primary">br</span>
        </>
      }
      description="O dia a dia da marca, os bastidores e a torcida que não para de crescer."
    >
      <InstagramGrid posts={posts} />

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

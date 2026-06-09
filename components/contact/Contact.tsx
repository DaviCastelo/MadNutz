"use client";

import { useState, type FormEvent } from "react";
import { Section } from "@/components/ui/Section";
import { buttonVariants } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/brand/icons";
import { cn, waLink } from "@/lib/utils";

const fieldClass =
  "w-full rounded-xl border border-edge bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/70 transition-colors focus:border-accent-primary focus:outline-none";
const labelClass =
  "mb-2 block font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink-muted";

export function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Olá MadNutz! Meu nome é ${name.trim() || "(sem nome)"}.\n\n${
      message.trim() || "Quero saber mais sobre os snacks."
    }`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <Section
      id="contato"
      eyebrow="Fala com a gente"
      title={<>Bora <span className="text-accent-primary">conversar?</span></>}
      description="Manda sua mensagem — ela abre direto no nosso WhatsApp, já formatadinha."
    >
      <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Seu nome
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Como te chamamos?"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-message" className={labelClass}>
            Mensagem
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Quero montar um kit, fazer um pedido grande, fechar parceria..."
            className={cn(fieldClass, "resize-none")}
          />
        </div>
        <button
          type="submit"
          className={buttonVariants({ variant: "whatsapp", size: "lg", className: "w-full" })}
        >
          <WhatsAppIcon className="h-5 w-5" />
          Enviar pelo WhatsApp
        </button>
      </form>
    </Section>
  );
}

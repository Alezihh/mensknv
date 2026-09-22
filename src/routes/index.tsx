import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackCtaClick, trackBeginCheckout, type CtaTrackParams } from "@/lib/tracking";
import iphoneMockup from "@/assets/iphone-mockup.png";
import beforeFeed from "@/assets/antes.png";
import afterFeed from "@/assets/depois.jpg";
import beforeFeed2 from "@/assets/antes-2.png";
import afterFeed2 from "@/assets/depois-2.jpg";
import beforeFeed3 from "@/assets/antes-3.png";
import afterFeed3 from "@/assets/depois-3.jpg";
import beforeFeed4 from "@/assets/antes-4.png";
import afterFeed4 from "@/assets/depois-4.jpg";
import beforeFeed5 from "@/assets/antes-5.png";
import afterFeed5 from "@/assets/depois-5.jpg";
import beforeFeed6 from "@/assets/antes-6.png";
import afterFeed6 from "@/assets/depois-6.jpg";
import beforeFeed7 from "@/assets/antes-7.png";
import afterFeed7 from "@/assets/depois-7.jpg";

const galleryImages = Object.values(
  import.meta.glob("@/assets/gallery/*.jpg", {
    eager: true,
    query: "?url",
    import: "default",
  }),
) as string[];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Men's Studio — Figurinhas para Stories Masculinos" },
      {
        name: "description",
        content:
          "Mais de 12.000 figurinhas, frases e elementos para transformar fotos simples em Stories muito mais bonitos. Acesso a partir de R$29,90/mês.",
      },
      { property: "og:title", content: "Men's Studio — Figurinhas para Stories" },
      {
        property: "og:description",
        content:
          "Transforme fotos simples em Stories muito mais bonitos. +12.000 figurinhas e elementos masculinos.",
      },
    ],
  }),
  component: Landing,
});

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, ease: EASE },
};

const fadeLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, ease: EASE },
};

const fadeRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, ease: EASE },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.93 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1.1, ease: EASE },
};

function stagger(i: number, base = 0) {
  return { ...fadeUp, transition: { duration: 0.8, delay: base + i * 0.08, ease: EASE } };
}

function Roman({ n }: { n: string }) {
  return <span className="font-display text-silver text-sm tracking-[0.3em]">{n}</span>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <span className="h-px w-8 bg-hairline" />
      <span className="eyebrow">{children}</span>
      <span className="h-px w-8 bg-hairline" />
    </div>
  );
}

/**
 * Shared CTA. `checkout` marks a link that actually opens the external Kirvano
 * checkout — only those fire begin_checkout. Scroll-only anchors fire cta_click alone.
 */
type CtaVariant = "primary" | "secondary" | "ghost";

function Cta({
  href,
  ctaId,
  position,
  planId,
  offerId,
  price,
  checkout = false,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  ctaId: string;
  position: string;
  planId?: string;
  offerId?: string;
  price?: number;
  checkout?: boolean;
  variant?: CtaVariant;
  className?: string;
  children: React.ReactNode;
}) {
  const handleClick = () => {
    const params: CtaTrackParams = {
      cta_id: ctaId,
      cta_position: position,
      plan_id: planId,
      offer_id: offerId,
      price,
    };
    trackCtaClick(params);
    if (checkout) trackBeginCheckout(params);
  };

  const styles: Record<CtaVariant, string> = {
    primary: "bg-ice text-primary-foreground hover:bg-silver",
    secondary: "border border-silver/50 text-foreground hover:bg-surface-2",
    ghost: "border border-border text-foreground hover:bg-surface-2",
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      {...(checkout ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center px-8 py-4 text-[11px] font-semibold tracking-[0.32em] uppercase transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Counters />
      <BeforeAfterMain />
      <Problem />
      <Categories />
      <HowItWorks />
      <FirstOffer />
      <Testimonials />
      <MoreBeforeAfter />
      <Gallery />
      <Features />
      <Offer />
      <Guarantee />
      <FAQSection />
      <FinalCTA />
      <Footer />
      <StickyCta />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display text-base sm:text-lg tracking-[0.3em]">MEN&rsquo;S</span>
          <span className="font-display italic text-base sm:text-lg text-silver">studio</span>
        </div>
        <a
          href="#oferta"
          onClick={() => trackCtaClick({ cta_id: "nav_acessar", cta_position: "nav" })}
          className="hidden sm:inline-flex items-center text-[11px] tracking-[0.28em] uppercase font-semibold text-foreground/90 hover:text-foreground transition-colors"
        >
          Acessar
          <span className="ml-3 inline-block h-px w-6 bg-foreground/60" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative pt-28 pb-14 sm:pt-36 sm:pb-20">
      {/* Ambient radial */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184,184,184,0.08), transparent 60%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-8 items-center">
        <motion.div {...fadeUp} className="text-center lg:text-left">
          <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
            <span className="h-px w-10 bg-hairline" />
            <span className="eyebrow">+12.000 figurinhas para seus Stories</span>
          </div>

          <h1 className="font-display text-[2.15rem] sm:text-5xl lg:text-[3.85rem] leading-[1.08] text-foreground">
            Transforme fotos simples em{" "}
            <em className="font-serif-elegant italic silver-gradient">
              Stories muito mais bonitos
            </em>
            .
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
            Tenha acesso a milhares de figurinhas, frases e elementos masculinos para academia,
            carros, lifestyle, viagens, trabalho, rotina e muito mais.
          </p>

          <p className="mt-3 text-sm sm:text-base text-foreground/85 font-medium">
            Não precisa saber editar.
          </p>

          <div className="mt-6 flex items-center justify-center lg:justify-start gap-2.5 text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
            <span>Escolha</span>
            <span className="text-silver">→</span>
            <span>Adicione</span>
            <span className="text-silver">→</span>
            <span>Poste</span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <Cta ctaId="hero_primary" position="hero" href="#oferta">
              Quero acessar as figurinhas
            </Cta>
            <a
              href="#categorias"
              onClick={() => trackCtaClick({ cta_id: "hero_secondary", cta_position: "hero" })}
              className="inline-flex items-center justify-center px-8 py-4 border border-border text-[11px] font-semibold tracking-[0.32em] uppercase text-foreground hover:bg-surface-2 transition-colors"
            >
              Ver categorias
            </a>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            A partir de <strong className="text-foreground">R$29,90/mês</strong>
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-[10px] sm:text-[11px] tracking-wider uppercase text-muted-foreground/80">
            <span>Cancele quando quiser</span>
            <span className="opacity-40">•</span>
            <span>Acesso imediato</span>
            <span className="opacity-40">•</span>
            <span>Use pelo celular</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          >
            <div
              aria-hidden
              className="absolute -inset-10 blur-3xl opacity-60 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(184,184,184,0.18), transparent 70%)",
              }}
            />
            <img
              src={iphoneMockup}
              alt="Men's Studio app exibido em iPhone"
              width={1024}
              height={1536}
              className="relative max-w-[260px] sm:max-w-sm lg:max-w-md w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Counters() {
  return (
    <section className="border-y border-border bg-surface/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10">
        {[
          { n: "+12.000", label: "Elementos exclusivos" },
          { n: "+5.000", label: "Homens já utilizam" },
          { n: "Mensal", label: "Novas atualizações", hidden: true },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            {...stagger(i)}
            className={`text-center${s.hidden ? " hidden sm:block" : ""}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="font-display text-2xl sm:text-3xl text-foreground"
            >
              {s.n}
            </motion.div>
            <div className="mt-2 eyebrow">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BeforeAfterPair({
  label,
  before,
  after,
}: {
  label: string;
  before: string;
  after: string;
}) {
  return (
    <>
      <motion.div {...fadeUp} className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="eyebrow">Antes</span>
          <span className="text-xs text-muted-foreground font-light">{label}</span>
        </div>
        <div className="relative aspect-[9/16] overflow-hidden border border-border">
          <img
            src={before}
            alt={`Foto original de ${label.toLowerCase()}, sem edição`}
            loading="lazy"
            width={1080}
            height={1920}
            className="w-full h-full object-cover grayscale-[20%] opacity-90"
          />
        </div>
      </motion.div>
      <motion.div {...fadeUp} className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="eyebrow silver-gradient">Depois</span>
          <span className="text-xs text-muted-foreground font-light">{label}</span>
        </div>
        <div className="relative aspect-[9/16] overflow-hidden border border-silver/30">
          <img
            src={after}
            alt={`Mesma foto de ${label.toLowerCase()} com elementos Men's Studio aplicados`}
            loading="lazy"
            width={1080}
            height={1920}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-silver/20 pointer-events-none" />
        </div>
      </motion.div>
    </>
  );
}

function BeforeAfterMain() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <SectionLabel>Antes e depois</SectionLabel>
          <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-5xl leading-[1.15]">
            A mesma foto. Só que com{" "}
            <em className="font-serif-elegant italic text-silver">Men&rsquo;s Studio</em>.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <BeforeAfterPair label="Academia" before={beforeFeed} after={afterFeed} />
          <BeforeAfterPair label="Rotina" before={beforeFeed2} after={afterFeed2} />
          <BeforeAfterPair label="Trabalho" before={beforeFeed3} after={afterFeed3} />
        </div>

        <div className="mt-14 text-center">
          <Cta
            ctaId="after_before_after"
            position="after_before_after"
            href="#categorias"
            variant="secondary"
          >
            Quero fazer isso nos meus Stories
          </Cta>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-6 sm:px-10 text-center">
        <SectionLabel>O problema</SectionLabel>
        <motion.h2 {...fadeUp} className="font-display text-2xl sm:text-4xl leading-[1.25]">
          Você tira uma foto boa&hellip; mas na hora de postar o Story fica sem graça?
        </motion.h2>
        <motion.p
          {...fadeUp}
          className="mt-6 text-base sm:text-lg text-muted-foreground font-light leading-relaxed"
        >
          O problema muitas vezes não é a foto. São os pequenos detalhes que fazem um Story parecer
          mais bonito, organizado e com mais personalidade. O Men&rsquo;s Studio coloca esses
          elementos na palma da sua mão.
        </motion.p>
      </div>
    </section>
  );
}

const CATEGORIES = [
  "Academia",
  "Trabalho",
  "Rotina & Corrida",
  "Lifestyle & Rua",
  "Estilo & Outfit",
  "Carros",
  "Café",
  "Negócios",
  "Disciplina & Mentalidade",
];

function Categories() {
  const preview = galleryImages.slice(0, 8);
  return (
    <section id="categorias" className="py-20 sm:py-28 bg-surface/40 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <SectionLabel>Categorias</SectionLabel>
          <motion.h2
            {...fadeUp}
            className="font-display text-3xl sm:text-5xl max-w-2xl mx-auto leading-[1.15]"
          >
            Tem figurinha para praticamente tudo.
          </motion.h2>
        </div>

        <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-3 mb-14">
          {CATEGORIES.map((c) => (
            <span
              key={c}
              className="px-4 py-2 border border-border text-xs sm:text-sm tracking-wide text-foreground/90"
            >
              {c}
            </span>
          ))}
        </motion.div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 lg:grid-cols-8">
          {preview.map((src, i) => (
            <div
              key={i}
              className="flex-none w-[140px] sm:w-auto aspect-[9/16] overflow-hidden bg-surface"
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Escolha a figurinha.",
    desc: "Navegue pela biblioteca e ache o elemento certo para a sua foto.",
  },
  {
    n: "02",
    title: "Adicione ao Story.",
    desc: "Salve e insira direto no Instagram, pelo próprio celular.",
  },
  { n: "03", title: "Poste.", desc: "Pronto. Seu Story já fica muito mais bonito." },
];

function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-14">
          <SectionLabel>Como funciona</SectionLabel>
          <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-5xl leading-[1.15]">
            Escolheu a foto? O resto é simples.
          </motion.h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-6">
          {STEPS.map((s, i) => (
            <motion.div key={s.n} {...stagger(i)} className="text-center sm:text-left">
              <Roman n={s.n} />
              <h3 className="font-display text-xl sm:text-2xl mt-4">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FIRST_OFFER_BENEFITS = [
  "+12.000 figurinhas",
  "Diversas categorias",
  "Frases e elementos",
  "Acesso pelo celular",
];

function FirstOffer() {
  return (
    <section className="py-20 sm:py-28 bg-surface/40 border-y border-border">
      <div className="max-w-2xl mx-auto px-6 sm:px-10 text-center">
        <SectionLabel>Oferta</SectionLabel>
        <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-5xl leading-[1.15]">
          Pronto para deixar seus Stories melhores?
        </motion.h2>

        <motion.ul {...fadeUp} className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {FIRST_OFFER_BENEFITS.map((b) => (
            <li
              key={b}
              className="flex items-center gap-2 text-sm font-light text-muted-foreground"
            >
              <span className="text-silver font-display">—</span>
              {b}
            </li>
          ))}
        </motion.ul>

        <motion.div {...fadeUp} className="mt-8">
          <div className="font-display text-4xl sm:text-5xl">A partir de R$29,90</div>
          <div className="text-xs text-muted-foreground tracking-wider mt-1">por mês</div>
        </motion.div>

        <motion.div {...fadeUp} className="mt-8">
          <Cta ctaId="mid_offer" position="mid_offer" href="#oferta">
            Quero o acesso completo
          </Cta>
        </motion.div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { quote: "Meu Instagram mudou completamente.", author: "Lucas R.", role: "Empreendedor" },
  { quote: "Os detalhes fazem toda a diferença.", author: "André M.", role: "Investidor" },
  { quote: "Vale muito mais do que custa.", author: "Felipe T.", role: "Criador" },
  { quote: "Impossível ficar sem postar depois disso.", author: "Rafael C.", role: "Atleta" },
];

function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-surface/40 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <SectionLabel>Membros</SectionLabel>
          <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-5xl leading-[1.15]">
            O que quem já usa está falando.
          </motion.h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-border">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
              className="bg-surface p-6 sm:p-8 cursor-default"
            >
              <blockquote className="font-serif-elegant italic text-xl sm:text-2xl leading-tight text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <span className="h-px w-8 bg-silver/40" />
                <div>
                  <div className="text-sm font-medium">{t.author}</div>
                  <div className="text-xs text-muted-foreground tracking-wider uppercase mt-1">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function MoreBeforeAfter() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <SectionLabel>Mais demonstrações</SectionLabel>
          <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-4xl leading-[1.15]">
            Mais exemplos reais de Stories.
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <BeforeAfterPair label="Lifestyle" before={beforeFeed4} after={afterFeed4} />
          <BeforeAfterPair label="Estilo" before={beforeFeed5} after={afterFeed5} />
          <BeforeAfterPair label="Estilo" before={beforeFeed6} after={afterFeed6} />
          <BeforeAfterPair label="Rotina" before={beforeFeed7} after={afterFeed7} />
        </div>
      </div>
    </section>
  );
}

const GALLERY_SLIDES = [...galleryImages, ...galleryImages];

function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    align: "start",
  });

  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      emblaApi?.scrollNext();
    }, 2200);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    startAutoScroll();
    emblaApi.on("pointerDown", () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    });
    emblaApi.on("pointerUp", startAutoScroll);
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [emblaApi, startAutoScroll]);

  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-12 text-center">
        <SectionLabel>Galeria</SectionLabel>
        <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-4xl leading-[1.15]">
          O que espera por você.
        </motion.h2>
      </div>
      <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex gap-3">
          {GALLERY_SLIDES.map((src, i) => (
            <div
              key={i}
              className="flex-none w-[220px] sm:w-[280px] lg:w-[320px] aspect-[9/16] overflow-hidden bg-surface"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    n: "I",
    title: "Stories Prontos",
    desc: "Stories minimalistas para qualquer ocasião.",
  },
  {
    n: "II",
    title: "Frases Premium",
    desc: "Disciplina, dinheiro, rotina e mentalidade.",
  },
  {
    n: "III",
    title: "Elementos Exclusivos",
    desc: "Ícones, linhas e detalhes masculinos.",
  },
  {
    n: "IV",
    title: "Vídeos para Stories",
    desc: "Lifestyle, carros, café, academia e negócios.",
  },
  {
    n: "V",
    title: "Wallpapers Premium",
    desc: "Minimalistas e sofisticados.",
  },
  {
    n: "VI",
    title: "Atualizações Constantes",
    desc: "Novos conteúdos adicionados regularmente.",
  },
];

function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-surface/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-14 sm:mb-16">
          <SectionLabel>O que você recebe</SectionLabel>
          <motion.h2
            {...fadeUp}
            className="font-display text-3xl sm:text-5xl max-w-2xl mx-auto leading-[1.15]"
          >
            Um arsenal completo para o homem{" "}
            <em className="font-serif-elegant italic text-silver">moderno</em>.
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="glass-card group p-8 sm:p-10 bg-surface hover:bg-surface-2 transition-colors duration-500 min-h-[220px] flex flex-col justify-between cursor-default"
            >
              <Roman n={f.n} />
              <div>
                <h3 className="font-display text-2xl sm:text-[1.75rem] mt-8 leading-tight">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground font-light leading-relaxed">
                  {f.desc}
                </p>
                <div className="mt-6 h-px w-8 bg-silver/40 group-hover:w-16 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PLAN_FEATURES = [
  "Stories prontos para Instagram",
  "Frases e citações premium",
  "Elementos e ícones exclusivos",
  "Vídeos e templates para academia, trabalho, lifestyle, rotina e música",
  "Wallpapers premium para perfil e capas",
  "Acesso direto pelo celular, com atualizações constantes",
  "Suporte prioritário",
  "Acesso antecipado a novidades",
];

const MONTHLY_CHECKOUT_URL = "https://checkout.ticto.app/OB5D896E3";
const ANNUAL_CHECKOUT_URL = "https://checkout.ticto.app/O3B306F20";

function Offer() {
  return (
    <section id="oferta" className="py-24 sm:py-36 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(184,184,184,0.08), transparent 70%)",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-14">
          <SectionLabel>Planos</SectionLabel>
          <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-5xl leading-[1.1]">
            Tudo que você recebe.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Monthly plan */}
          <motion.div
            {...fadeUp}
            className="bg-surface-2 p-8 sm:p-10 text-left border border-border"
          >
            <span className="eyebrow">Mensal</span>
            <div className="flex items-baseline gap-1 mt-4 mb-1">
              <span className="font-display text-5xl sm:text-6xl">R$</span>
              <span className="font-display text-5xl sm:text-6xl">29</span>
              <span className="font-display text-3xl text-muted-foreground">,90</span>
            </div>
            <div className="text-xs text-muted-foreground tracking-wider mb-8">
              por mês · sem fidelidade
            </div>
            <ul className="space-y-3 mb-10">
              {PLAN_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm font-light text-muted-foreground">
                  <span className="text-silver font-display">—</span>
                  {f}
                </li>
              ))}
            </ul>
            <Cta
              ctaId="final_offer_mensal"
              position="final_offer"
              planId="mensal"
              price={29.9}
              checkout
              href={MONTHLY_CHECKOUT_URL}
              variant="ghost"
              className="w-full justify-center"
            >
              Assinar mensal
            </Cta>
          </motion.div>

          {/* Annual plan — highlighted */}
          <motion.div
            {...scaleIn}
            className="relative bg-surface-2 p-8 sm:p-10 text-left border-2 border-silver shadow-[0_0_50px_-10px_rgba(184,184,184,0.4)]"
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at top right, rgba(184,184,184,0.18), transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="eyebrow silver-gradient">Anual</span>
                <span className="text-[10px] font-semibold tracking-[0.22em] uppercase bg-foreground text-background px-2.5 py-1">
                  Mais pedido
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display text-5xl sm:text-6xl silver-gradient">R$</span>
                <span className="font-display text-5xl sm:text-6xl silver-gradient">97</span>
                <span className="font-display text-3xl text-silver">,90</span>
              </div>
              <div className="text-xs text-muted-foreground tracking-wider">
                por ano · equivale a R$8,16/mês
              </div>
              <div className="text-xs text-muted-foreground/60 mb-8 mt-1">
                <span className="line-through">R$358,80</span> no plano mensal
              </div>
              <ul className="space-y-3 mb-10">
                {PLAN_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm font-light">
                    <span className="text-silver font-display">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Cta
                ctaId="final_offer_anual"
                position="final_offer"
                planId="anual"
                price={97.9}
                checkout
                href={ANNUAL_CHECKOUT_URL}
                className="w-full justify-center"
              >
                Liberar meu acesso agora <span className="text-silver ml-2">→</span>
              </Cta>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Guarantee() {
  return (
    <section className="py-20 border-y border-border bg-surface/30">
      <div className="max-w-2xl mx-auto px-6 sm:px-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 border border-silver/40 rounded-full mb-6">
          <span className="font-display text-2xl text-silver">7</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl mb-3">
          Garantia incondicional de 7 dias.
        </h3>
        <p className="text-muted-foreground font-light text-sm sm:text-base">
          Se em qualquer momento dos primeiros 7 dias você sentir que o Men&rsquo;s Studio não é
          para você, devolvemos cada centavo. Sem perguntas.
        </p>
      </div>
    </section>
  );
}

const FAQ = [
  {
    q: "Como funciona o acesso?",
    a: "Após a assinatura, você recebe acesso imediato a toda a biblioteca, incluindo todas as futuras atualizações, enquanto sua assinatura estiver ativa.",
  },
  {
    q: "Posso usar no celular?",
    a: "Sim. Toda a biblioteca foi pensada para ser usada diretamente do iPhone ou Android, sem necessidade de softwares complexos.",
  },
  {
    q: "Os conteúdos são realmente exclusivos?",
    a: "Sim. Todo o material é criado internamente pela curadoria do Men's Studio e atualizado constantemente.",
  },
  {
    q: "Preciso saber editar?",
    a: "Não. Os stories, frases e elementos são prontos para usar — você só precisa publicar.",
  },
  {
    q: "Como funciona a cobrança?",
    a: "Você escolhe entre o plano mensal (R$29,90) ou anual (R$97,90), renovado automaticamente a cada ciclo. Cancele quando quiser.",
  },
];

function FAQSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display text-3xl sm:text-5xl leading-[1.15]">
            Perguntas frequentes.
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="font-display text-lg sm:text-xl hover:no-underline py-6 text-left">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-light text-base leading-relaxed pb-6">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 border-t border-border text-center">
      <div className="max-w-xl mx-auto px-6 sm:px-10">
        <motion.h2 {...fadeUp} className="font-display text-2xl sm:text-4xl leading-[1.25] mb-8">
          Deixe seus Stories muito mais bonitos hoje.
        </motion.h2>
        <Cta ctaId="final_cta" position="final" href="#oferta">
          Quero acessar as figurinhas
        </Cta>
        <div className="mt-4 text-xs text-muted-foreground tracking-wider">
          A partir de R$29,90/mês
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-xl tracking-[0.3em]">MEN&rsquo;S</span>
              <span className="font-display italic text-xl text-silver">studio</span>
            </div>
            <p className="text-sm text-muted-foreground font-light max-w-xs leading-relaxed">
              Um ecossistema para homens que valorizam disciplina, estilo e presença.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-4">
            <div className="flex gap-6 text-xs tracking-[0.28em] uppercase text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Termos
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contato
              </a>
            </div>
            <div className="text-xs text-muted-foreground/70 font-light">
              © {new Date().getFullYear()} Men&rsquo;s Studio. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 sm:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-background/95 backdrop-blur-xl border-t border-border px-4 py-3 flex items-center justify-between gap-3">
        <div className="text-xs leading-tight">
          <div className="font-display text-sm">Men&rsquo;s Studio</div>
          <div className="text-muted-foreground">a partir de R$29,90/mês</div>
        </div>
        <a
          href="#oferta"
          onClick={() => trackCtaClick({ cta_id: "sticky_mobile", cta_position: "sticky" })}
          className="inline-flex items-center justify-center px-5 py-3 bg-ice text-primary-foreground text-[10px] font-semibold tracking-[0.28em] uppercase hover:bg-silver transition-colors shrink-0"
        >
          Quero acessar
        </a>
      </div>
    </div>
  );
}

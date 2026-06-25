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
  })
) as string[];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Men's Studio — Presença, Disciplina e Estética Premium" },
      {
        name: "description",
        content:
          "Stories prontos, frases, vídeos e elementos exclusivos para homens que querem construir um Instagram forte, elegante e premium.",
      },
      { property: "og:title", content: "Men's Studio — Ecossistema Premium" },
      {
        property: "og:description",
        content:
          "Mais de 12.000 elementos exclusivos para elevar a sua presença digital.",
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
  return (
    <span className="font-display text-silver text-sm tracking-[0.3em]">{n}</span>
  );
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

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnnouncementBar />
      <Nav />
      <Hero />
      <Counters />
      <Problem />
      <Features />
      <BeforeAfter />
      <ForWho />
      <Comparison />
      <Testimonials />
      <Gallery />
      <Offer />
      <Guarantee />
      <FAQSection />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-10 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display text-base sm:text-lg tracking-[0.3em]">
            MEN&rsquo;S
          </span>
          <span className="font-display italic text-base sm:text-lg text-silver">
            studio
          </span>
        </div>
        <a
          href="#oferta"
          className="hidden sm:inline-flex items-center text-[11px] tracking-[0.28em] uppercase font-semibold text-foreground/90 hover:text-foreground transition-colors"
        >
          Acessar
          <span className="ml-3 inline-block h-px w-6 bg-foreground/60" />
        </a>
      </div>
    </header>
  );
}

const DEADLINE = new Date("2026-06-21T23:59:59");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      h: Math.floor(diff / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1_000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function AnnouncementBar() {
  const { h, m, s } = useCountdown(DEADLINE);
  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-center gap-4">
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase">
          Oferta encerra em
        </span>
        <div className="flex items-center gap-1 tabular-nums font-display text-sm sm:text-base">
          <span>{String(h).padStart(2, "0")}</span>
          <span className="opacity-50 mx-0.5">:</span>
          <span>{String(m).padStart(2, "0")}</span>
          <span className="opacity-50 mx-0.5">:</span>
          <span>{String(s).padStart(2, "0")}</span>
        </div>
        <span className="hidden sm:inline text-[10px] tracking-[0.18em] uppercase opacity-60">
          — vagas limitadas
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-44 pb-20 sm:pt-52 sm:pb-28">
      {/* Ambient radial */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184,184,184,0.08), transparent 60%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-8 items-center">
        <motion.div {...fadeUp} className="text-center lg:text-left">
          <div className="flex items-center gap-3 justify-center lg:justify-start mb-8">
            <span className="h-px w-10 bg-hairline" />
            <span className="eyebrow">Edição 2026 · Vol. I</span>
          </div>

          <h1 className="font-display text-[2.4rem] sm:text-5xl lg:text-[4.25rem] leading-[1.05] text-foreground">
            Tudo o que você precisa para construir um Instagram{" "}
            <em className="font-serif-elegant italic text-silver">forte</em>,{" "}
            <em className="font-serif-elegant italic text-silver">elegante</em> e{" "}
            <em className="font-serif-elegant italic silver-gradient">premium</em>.
          </h1>

          <p className="mt-7 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
            Stories prontos, frases, elementos, vídeos e conteúdos exclusivos
            para homens que querem transmitir mais presença, disciplina e
            sofisticação nas redes sociais.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <a href="#oferta" className="group inline-flex items-center justify-center px-8 py-4 bg-ice text-primary-foreground text-[11px] font-semibold tracking-[0.32em] uppercase hover:bg-silver transition-colors">
              Quero meu acesso
              <span className="ml-3 inline-block h-px w-4 bg-primary-foreground transition-all group-hover:w-8" />
            </a>
            <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border border-border text-[11px] font-semibold tracking-[0.32em] uppercase text-foreground hover:bg-surface-2 transition-colors">
              Ver tudo incluído
            </a>
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
              className="relative max-w-[280px] sm:max-w-sm lg:max-w-md w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
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
          <motion.div key={s.label} {...stagger(i)} className={`text-center${s.hidden ? " hidden sm:block" : ""}`}>
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

function Problem() {
  return (
    <section className="py-24 sm:py-36">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
        <SectionLabel>O Problema</SectionLabel>
        <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-5xl leading-[1.15]">
          A maioria dos homens publica{" "}
          <em className="font-serif-elegant italic text-silver">sem identidade</em>.
        </motion.h2>
        <motion.div {...fadeUp} className="mt-10 space-y-6 text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
          <p>
            Um Instagram forte não é sobre ter milhares de seguidores. É sobre
            transmitir presença.
          </p>
          <p>
            Pequenos detalhes fazem com que um perfil pareça mais sofisticado,
            interessante e memorável.
          </p>
        </motion.div>
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
    <section id="features" className="py-24 sm:py-32 bg-surface/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16 sm:mb-20">
          <SectionLabel>O que você recebe</SectionLabel>
          <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-5xl max-w-2xl mx-auto leading-[1.15]">
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
              className="glass-card group p-8 sm:p-10 bg-surface hover:bg-surface-2 transition-colors duration-500 min-h-[240px] flex flex-col justify-between cursor-default"
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

function BeforeAfter() {
  return (
    <section className="py-24 sm:py-36">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16">
          <SectionLabel>Transformação</SectionLabel>
          <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-5xl max-w-3xl mx-auto leading-[1.15]">
            A diferença entre um perfil comum e um perfil que{" "}
            <em className="font-serif-elegant italic text-silver">transmite valor</em>.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <motion.div {...fadeLeft} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Antes</span>
              <span className="text-xs text-muted-foreground font-light">Sem identidade</span>
            </div>
            <div className="relative aspect-[9/16] overflow-hidden border border-border">
              <img
                src={beforeFeed}
                alt="Perfil comum, sem identidade visual"
                loading="lazy"
                width={1080}
                height={1920}
                className="w-full h-full object-cover grayscale-[20%] opacity-90"
              />
            </div>
          </motion.div>
          <motion.div {...fadeRight} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="eyebrow silver-gradient">Depois</span>
              <span className="text-xs text-muted-foreground font-light">Perfil premium</span>
            </div>
            <div className="relative aspect-[9/16] overflow-hidden border border-silver/30">
              <img
                src={afterFeed}
                alt="Perfil premium com identidade Men's Studio"
                loading="lazy"
                width={1080}
                height={1920}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-silver/20 pointer-events-none" />
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Antes</span>
              <span className="text-xs text-muted-foreground font-light">Sem identidade</span>
            </div>
            <div className="relative aspect-[9/16] overflow-hidden border border-border">
              <img
                src={beforeFeed2}
                alt="Perfil comum, sem identidade visual"
                loading="lazy"
                width={1080}
                height={1920}
                className="w-full h-full object-cover grayscale-[20%] opacity-90"
              />
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="eyebrow silver-gradient">Depois</span>
              <span className="text-xs text-muted-foreground font-light">Perfil premium</span>
            </div>
            <div className="relative aspect-[9/16] overflow-hidden border border-silver/30">
              <img
                src={afterFeed2}
                alt="Perfil premium com identidade Men's Studio"
                loading="lazy"
                width={1080}
                height={1920}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-silver/20 pointer-events-none" />
            </div>
          </motion.div>

          {([
            [beforeFeed3, afterFeed3],
            [beforeFeed4, afterFeed4],
            [beforeFeed5, afterFeed5],
            [beforeFeed6, afterFeed6],
            [beforeFeed7, afterFeed7],
          ] as [string, string][]).map(([before, after], i) => (
            <React.Fragment key={i}>
              <motion.div {...fadeUp} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Antes</span>
                  <span className="text-xs text-muted-foreground font-light">Sem identidade</span>
                </div>
                <div className="relative aspect-[9/16] overflow-hidden border border-border">
                  <img src={before} alt="Perfil comum, sem identidade visual" loading="lazy" width={1080} height={1920} className="w-full h-full object-cover grayscale-[20%] opacity-90" />
                </div>
              </motion.div>
              <motion.div {...fadeUp} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="eyebrow silver-gradient">Depois</span>
                  <span className="text-xs text-muted-foreground font-light">Perfil premium</span>
                </div>
                <div className="relative aspect-[9/16] overflow-hidden border border-silver/30">
                  <img src={after} alt="Perfil premium com identidade Men's Studio" loading="lazy" width={1080} height={1920} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-silver/20 pointer-events-none" />
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

const FOR_WHO = [
  "Homens que gostam de estética minimalista.",
  "Empreendedores.",
  "Homens que treinam.",
  "Quem gosta de carros e lifestyle.",
  "Quem quer ter um perfil mais elegante.",
  "Quem quer se destacar nas redes sociais.",
];

function ForWho() {
  return (
    <section className="py-24 sm:py-32 bg-surface/40 border-y border-border">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <SectionLabel>Para quem é</SectionLabel>
          <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-5xl leading-[1.15]">
            Feito para quem entende que{" "}
            <em className="font-serif-elegant italic text-silver">presença é tudo</em>.
          </motion.h2>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {FOR_WHO.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="flex items-center gap-5 py-5 sm:py-6"
            >
              <span className="font-display text-silver text-sm w-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-6 bg-silver/40 shrink-0" />
              <span className="text-base sm:text-lg font-light">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Comparison() {
  const others = [
    "Stories sem identidade.",
    "Aparência amadora.",
    "Falta de consistência.",
    "Esforço sem retorno.",
  ];
  const us = [
    "Perfil premium.",
    "Stories elegantes.",
    "Presença digital forte.",
    "Mais percepção de valor.",
  ];
  return (
    <section className="py-24 sm:py-36">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16">
          <SectionLabel>Por que Men&rsquo;s Studio</SectionLabel>
          <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-5xl leading-[1.15]">
            A diferença é{" "}
            <em className="font-serif-elegant italic text-silver">imediata</em>.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          <div className="bg-surface p-8 sm:p-10">
            <div className="eyebrow mb-6 text-muted-foreground/70">Outros perfis</div>
            <ul className="space-y-4">
              {others.map((o) => (
                <li key={o} className="flex items-start gap-3 text-muted-foreground font-light">
                  <span className="font-display text-silver/40 mt-0.5">×</span>
                  <span className="line-through decoration-silver/20">{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface-2 p-8 sm:p-10 relative">
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at top right, rgba(184,184,184,0.12), transparent 60%)",
              }}
            />
            <div className="eyebrow mb-6 silver-gradient">Men&rsquo;s Studio</div>
            <ul className="space-y-4 relative">
              {us.map((o) => (
                <li key={o} className="flex items-start gap-3 text-foreground font-light">
                  <span className="font-display text-silver mt-0.5">—</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
    <section className="py-24 sm:py-32 bg-surface/40 border-y border-border">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16">
          <SectionLabel>Membros</SectionLabel>
          <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-5xl leading-[1.15]">
            Homens que já elevaram seu padrão.
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
              className="bg-surface p-8 sm:p-12 cursor-default"
            >
              <blockquote className="font-serif-elegant italic text-2xl sm:text-3xl leading-tight text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
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
        <motion.h2
          {...fadeUp}
          className="font-display text-3xl sm:text-4xl leading-[1.15]"
        >
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

const INCLUDES = [
  "Stories prontos",
  "Frases premium",
  "Vídeos lifestyle",
  "Wallpapers exclusivos",
  "Elementos visuais",
  "Atualizações futuras",
];

function Offer() {
  return (
    <section id="oferta" className="py-28 sm:py-40 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(184,184,184,0.08), transparent 70%)",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 text-center">
        <SectionLabel>A oferta</SectionLabel>
        <motion.h2 {...fadeUp} className="font-display text-3xl sm:text-5xl leading-[1.1]">
          Um ecossistema completo para homens que valorizam{" "}
          <em className="font-serif-elegant italic text-silver">presença</em> e{" "}
          <em className="font-serif-elegant italic text-silver">estética</em>.
        </motion.h2>

        <motion.div {...fadeUp} className="mt-6 mb-12">
          <ul className="inline-flex flex-wrap justify-center gap-x-8 gap-y-2">
            {INCLUDES.map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-light text-muted-foreground">
                <span className="text-silver font-display">—</span>
                {i}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
          {/* Plano Mensal */}
          <motion.div {...fadeUp} className="bg-surface p-8 sm:p-10 text-left flex flex-col">
            <div className="eyebrow mb-4 text-muted-foreground">Mensal</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-display text-5xl sm:text-6xl">R$</span>
              <span className="font-display text-5xl sm:text-6xl">19</span>
              <span className="font-display text-3xl text-silver">,90</span>
            </div>
            <div className="text-xs text-muted-foreground tracking-wider mb-8">
              por mês · cancele quando quiser
            </div>
            <ul className="space-y-3 mb-10 flex-1">
              {INCLUDES.map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-light">
                  <span className="text-silver font-display">—</span>
                  {i}
                </li>
              ))}
            </ul>
            <a
              href="https://pay.kirvano.com/c4c49b72-dd7d-412d-b3e9-6480a35e5dd5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 border border-border text-[11px] font-semibold tracking-[0.28em] uppercase text-foreground hover:bg-surface-2 transition-colors"
            >
              Assinar mensal
            </a>
          </motion.div>

          {/* Plano Anual */}
          <motion.div {...fadeUp} className="bg-surface-2 p-8 sm:p-10 text-left flex flex-col relative">
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at top right, rgba(184,184,184,0.14), transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="eyebrow silver-gradient">Anual</span>
                <span className="text-[10px] font-semibold tracking-[0.22em] uppercase bg-foreground text-background px-2.5 py-1">
                  Economize 62%
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display text-5xl sm:text-6xl silver-gradient">R$</span>
                <span className="font-display text-5xl sm:text-6xl silver-gradient">89</span>
                <span className="font-display text-3xl text-silver">,90</span>
              </div>
              <div className="text-xs text-muted-foreground tracking-wider mb-1">
                por ano · equivale a R$&nbsp;7,49/mês
              </div>
              <div className="flex items-center gap-2 mb-8">
                <span className="text-xs text-muted-foreground line-through font-light">R$ 238,80</span>
                <span className="text-xs text-silver font-medium">no plano mensal</span>
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                {INCLUDES.map((i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-light">
                    <span className="text-silver font-display">—</span>
                    {i}
                  </li>
                ))}
              </ul>
              <a
                href="https://pay.kirvano.com/434f6d9f-a741-4203-a71d-40ef5328b185"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-6 py-4 bg-ice text-primary-foreground text-[11px] font-semibold tracking-[0.28em] uppercase hover:bg-silver transition-colors"
              >
                Assinar anual
                <span className="ml-3 inline-block h-px w-4 bg-primary-foreground transition-all group-hover:w-8" />
              </a>
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
          Se em qualquer momento dos primeiros 7 dias você sentir que o Men&rsquo;s
          Studio não é para você, devolvemos cada centavo. Sem perguntas.
        </p>
      </div>
    </section>
  );
}

const FAQ = [
  {
    q: "Como funciona o acesso?",
    a: "Após a compra, você recebe acesso imediato e vitalício a toda biblioteca, incluindo todas as futuras atualizações.",
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
    q: "É um pagamento único?",
    a: "Sim. Pagamento único, sem mensalidades, sem renovação. Acesso vitalício a tudo.",
  },
];

function FAQSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display text-3xl sm:text-5xl leading-[1.15]">
            Perguntas frequentes.
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              className="border-border"
            >
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
              Um ecossistema para homens que valorizam disciplina, estilo e
              presença.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-4">
            <div className="flex gap-6 text-xs tracking-[0.28em] uppercase text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Termos</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Contato</a>
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

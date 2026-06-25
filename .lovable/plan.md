# Plano: Landing Page Men's Studio

Vou construir uma landing page single-page (mobile-first) com estética de marca de luxo discreto, inspirada em Porsche / Rolex / Apple / Daniel Wellington. Sem cara de infoproduto.

## Identidade Visual

**Paleta (tokens em `src/styles.css`):**
- `--background`: #0B0B0B (preto profundo)
- `--surface`: #1A1A1A (grafite, cards)
- `--foreground`: #F5F5F5 (branco gelo)
- `--muted`: #B8B8B8 (prata)
- `--accent`: prata sutil com gradient para detalhes (sem cores chamativas)

**Tipografia (carregada via `<link>` em `__root.tsx`, registrada em `@theme`):**
- Display: Playfair Display (headlines hero, seções)
- Serif alternativo: Cormorant Garamond (citações, frases premium)
- Sans: Inter (corpo, UI, botões em SemiBold com tracking amplo uppercase)

**Sistema de design:**
- Espaçamento generoso, hairlines de 1px em prata 20%
- Glassmorphism escuro nos cards (backdrop-blur + bg surface/40 + border branco/8)
- Cantos sutis (radius 2-8px, nunca pill exceto badges)
- Animações suaves com Motion for React (fade-in + translate sutil no scroll, sem nada chamativo)
- Sem ícones Lucide genéricos — usar glifos tipográficos, linhas finas, numeração romana/serial onde fizer sentido

## Estrutura de seções (uma rota: `src/routes/index.tsx`)

1. **Nav minimalista** — wordmark "MEN'S STUDIO" centralizado, CTA discreto à direita
2. **Hero** — Headline em Playfair com "forte", "elegante", "premium" em itálico Cormorant; subheadline; dois CTAs (primário sólido branco gelo, secundário ghost); mockup de iPhone (placeholder via `data-lov-image-placeholder` → gerar imagem premium do app); contadores "+12.000 elementos" / "+5.000 homens" em linha serial
3. **Problema** — bloco editorial centrado, tipografia grande serif, muito whitespace
4. **O que você recebe** — grid 2x3 (1 col mobile) de 6 cards glassmorphism; cada card com numeração (I–VI), título serif, descrição Inter
5. **Antes e Depois** — comparativo visual lado a lado (mockups gerados) com slider visual estático ou dois frames com label "ANTES" / "DEPOIS"
6. **Para quem é** — lista de 6 itens com hairline divider entre cada, checkmarks tipográficos finos
7. **Por que Men's Studio** — tabela comparativa em duas colunas (Outros / Men's Studio) com tipografia editorial
8. **Prova social** — 4 depoimentos em cards minimalistas, citações em Cormorant itálico grande
9. **Oferta** — bloco central destacado, lista do que inclui, preço grande em Playfair, CTA principal
10. **Garantia** — selo elegante 7 dias com texto curto
11. **FAQ** — accordion shadcn com 5–6 perguntas
12. **Footer** — wordmark + links institucionais minimalistas + copyright

## Detalhes técnicos

- Tailwind v4 com tokens em `@theme inline` em `src/styles.css`
- Fontes Google via `<link>` no `head` do `__root.tsx` (NUNCA `@import` URL)
- Componentes em `src/components/landing/*` (Hero, Problem, Features, BeforeAfter, ForWho, Comparison, Testimonials, Offer, Guarantee, FAQ, Footer, Nav)
- Imagens geradas via `imagegen` premium tier: mockup iPhone do app, mockups antes/depois de feed de Instagram, e possíveis backgrounds sutis (grão/textura)
- Motion for React para fade/translate on scroll (sem `whileHover/layoutId` exóticos)
- SEO: title, description, og tags em português no `head()` da rota index
- Mobile-first: grid colapsa para 1 coluna, hero stack vertical com mockup abaixo do copy, tipografia escala com `clamp()`
- Accordion shadcn para FAQ; resto custom para manter estética

## Imagens a gerar

1. Mockup iPhone com tela do app Men's Studio (escuro, elegante)
2. Mockup Instagram "antes" (perfil comum, desorganizado)
3. Mockup Instagram "depois" (feed premium, monocromático)
4. Possível textura/grão de fundo sutil para hero

## O que NÃO vou fazer

- Sem gradientes coloridos, sem roxo/azul/vermelho
- Sem emojis nos botões/CTAs
- Sem ícones Lucide redondos genéricos nos cards de features
- Sem badges "Trusted by", sem logos falsos de empresas
- Sem dark mode toggle (a marca é dark por padrão)
- Sem backend/auth (CTAs são apenas visuais/âncoras)
# HORIZONTE

Imobiliária de alto padrão do litoral cearense que **não mostra imóveis — vende endereços como experiência cinematográfica**. Cada imóvel é um curta; o site inteiro respira hora dourada.

## O momento-assinatura

**Transição por shader entre catálogo e detalhe.** Ao clicar num imóvel, a thumbnail não navega: ela se distorce via displacement/flowmap (GLSL) e vira o hero fullscreen da página de detalhe. É o efeito que justifica o projeto no portfólio.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **React Three Fiber** + **Three.js** — hero WebGL e morph por shader
- **Lenis** — smooth scroll
- **Framer Motion** + **GSAP** — page/elementos
- **Zustand** — estado da transição e da UI
- **Tailwind CSS**
- **Google Gemini** — concierge de busca conversacional (com fallback heurístico local)

## Rodando

```bash
npm install
cp .env.local.example .env.local   # opcional: adicione GEMINI_API_KEY
npm run dev
```

Abra http://localhost:3000.

> Sem `GEMINI_API_KEY`, o concierge funciona via parser heurístico local em PT-BR — o site roda 100% sem chave. Com a chave, o Gemini interpreta o pedido e gera a justificativa editorial.

## Mecânicas

| Peça | Onde | Arquivo |
|------|------|---------|
| Preloader branded (contador + máscara) | global | [Preloader.tsx](src/components/Preloader.tsx) |
| Hero WebGL (gradiente hora dourada + grão + reativo ao mouse) | `/` | [webgl/HeroScene.tsx](src/components/webgl/HeroScene.tsx) |
| Transição por shader (displacement/flowmap + aberração cromática) | global | [webgl/TransitionOverlay.tsx](src/components/webgl/TransitionOverlay.tsx) |
| Reel cinematográfico horizontal (inércia + parallax + arraste) | `/`, `/imoveis` | [Reel.tsx](src/components/Reel.tsx) |
| Cursor customizado contextual (magnético, labels) | global | [CustomCursor.tsx](src/components/CustomCursor.tsx) |
| Type scroll-driven (montagem linha a linha) | global | [RevealText.tsx](src/components/RevealText.tsx) |
| Concierge IA (NL → filtros + justificativa) | `/`, `/imoveis` | [Concierge.tsx](src/components/Concierge.tsx) · [api/concierge](src/app/api/concierge/route.ts) |
| Form multi-step animado | `/anuncie` | [anuncie/page.tsx](src/app/anuncie/page.tsx) |

## Rotas

```
/                experiência: preloader → hero → manifesto → reel → concierge → fechamento
/imoveis         reel horizontal + concierge + overlay de filtros
/imoveis/[slug]  detalhe imersivo (alvo da transição por shader)
/sobre           editorial — fundadores, filosofia
/anuncie         form multi-step animado
```

## Notas de implementação

- A **transição por shader** captura o `getBoundingClientRect` da thumbnail clicada (via [useShaderNavigate](src/lib/useShaderNavigate.ts)), monta um overlay WebGL fullscreen que interpola o retângulo de origem até a tela cheia aplicando displacement de ruído e leve aberração cromática, e desvanece revelando o hero da página de detalhe — que usa a mesma imagem, costurando o corte.
- O **parallax do reel** é feito em transform/CSS dirigido pelo loop de scroll lerpado (robusto e leve). Upgrade natural: portar cada card para planos WebGL com displacement no hover.
- Imagens vêm do Unsplash (placeholders). Troque por fotos reais em [src/lib/properties.ts](src/lib/properties.ts).

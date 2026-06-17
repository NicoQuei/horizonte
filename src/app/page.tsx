import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import PropertyCard from "@/components/PropertyCard";
import Concierge from "@/components/Concierge";
import { PROPERTIES, formatPrice } from "@/lib/properties";

const STATS = [
  { value: "R$ 800M+", label: "negociados" },
  { value: "150+", label: "imóveis exclusivos" },
  { value: "15", label: "anos de mercado" },
  { value: "98%", label: "clientes satisfeitos" },
];

const WHY = [
  { title: "Curadoria exclusiva", text: "Selecionamos a dedo imóveis de alto padrão no litoral cearense. Você recebe opções que fazem sentido — não um portal infinito." },
  { title: "Assessoria completa", text: "Acompanhamos cada etapa: visita, negociação, documentação e registro. Do primeiro contato à entrega das chaves." },
  { title: "Busca inteligente por IA", text: "Descreva o que procura em linguagem natural e nossa IA traduz em imóveis reais, com justificativa." },
  { title: "Discrição e segurança", text: "Negociações de alto valor exigem sigilo. Tratamos cada cliente com confidencialidade e processos seguros." },
];

const REGIOES = [
  { nome: "Cumbuco", desc: "Praia, vento e villas pé na areia", img: "/images/1613490493576-7fde63acd811.jpg" },
  { nome: "Jericoacoara", desc: "A vila mais cobiçada do litoral", img: "/images/1505691938895-1758d7feb511.jpg" },
  { nome: "Beira Mar", desc: "Coberturas no coração de Fortaleza", img: "/images/1545324418-cc1a3fa10c00.jpg" },
  { nome: "Taíba", desc: "Falésias e mar de kitesurf", img: "/images/1613977257363-707ba9348227.jpg" },
];

const STEPS = [
  { n: "01", title: "Conte o que procura", text: "Use a busca por IA ou fale com um consultor. Entendemos seu perfil, orçamento e prioridades." },
  { n: "02", title: "Curadoria personalizada", text: "Selecionamos os imóveis certos e organizamos visitas presenciais ou virtuais conforme sua agenda." },
  { n: "03", title: "Assessoria até as chaves", text: "Conduzimos negociação, documentação e registro com total segurança jurídica." },
];

const DEPOIMENTOS = [
  { quote: "Encontraram exatamente o que eu buscava em Jericoacoara. Processo impecável e muito discreto.", name: "Roberto Alencar", role: "Empresário · Fortaleza" },
  { quote: "A assessoria na documentação fez toda a diferença. Comprei minha casa em Cumbuco sem dor de cabeça.", name: "Marina Tavares", role: "Médica · São Paulo" },
  { quote: "A busca por IA me mostrou opções que eu nem tinha considerado. Atendimento de altíssimo nível.", name: "Carlos Bezerra", role: "Investidor · Recife" },
];

export default function Home() {
  const featured = PROPERTIES[5]; // Mansão Taíba
  const destaques = PROPERTIES.slice(0, 6);

  return (
    <main>
      <Hero />

      {/* STATS */}
      <section className="border-b border-line bg-winedeep">
        <div className="container-x grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-display text-3xl text-gold md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-cream/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VITRINE EM DESTAQUE */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mb-12 flex items-end justify-between">
            <div>
              <span className="eyebrow">Imóvel em destaque</span>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
                A joia da <span className="italic-serif text-red">coleção</span>
              </h2>
            </div>
          </Reveal>

          <Reveal className="grid items-stretch gap-0 overflow-hidden rounded-3xl border border-line bg-white shadow-card lg:grid-cols-2">
            <div className="relative min-h-[320px] overflow-hidden lg:min-h-[520px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.images[0]} alt={featured.title} className="img-cover" />
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="rounded-full bg-wine/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream backdrop-blur">Frente mar</span>
                <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">Pé na areia</span>
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red">
                {featured.location} · {featured.city}
              </p>
              <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{featured.title}</h3>
              <p className="mt-4 leading-relaxed text-haze">{featured.story}</p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-4 text-sm text-ink">
                <span>{featured.bedrooms} quartos</span>
                <span>{featured.bathrooms} banheiros</span>
                <span>{featured.area} m²</span>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-display text-3xl text-wine">{formatPrice(featured.price)}</span>
                <Link href={`/imoveis/${featured.slug}`} className="btn btn-primary">Ver imóvel</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Por que a Horizonte</span>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
              Cuidamos da sua <span className="italic-serif text-red">decisão</span>, não só da venda.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08} className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-wine font-display text-cream">{i + 1}</div>
                <h3 className="mt-5 font-display text-xl text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-haze">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REGIÕES */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Onde estamos</span>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
              Os endereços mais desejados do <span className="italic-serif text-red">Ceará</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REGIOES.map((r, i) => (
              <Reveal key={r.nome} delay={i * 0.08}>
                <Link href="/imoveis" className="group relative block aspect-[3/4] overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt={r.nome} className="img-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-winedeep via-winedeep/20 to-transparent" />
                  <div className="absolute bottom-0 p-5 text-cream">
                    <h3 className="font-display text-2xl">{r.nome}</h3>
                    <p className="mt-1 text-sm text-cream/80">{r.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IMÓVEIS EM DESTAQUE */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="eyebrow">Seleção atual</span>
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">Imóveis em destaque</h2>
            </div>
            <Link href="/imoveis" className="btn btn-outline text-wine">Ver catálogo completo</Link>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destaques.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONCIERGE IA */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Tecnologia</span>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
              Diga o que procura. Nossa <span className="italic-serif text-red">IA</span> encontra.
            </h2>
            <p className="mt-4 text-lg text-haze">
              Esqueça filtros complicados. Escreva como você fala — “apartamento de
              frente pro mar, 3 quartos, até R$ 4 milhões” — e receba imóveis reais com
              uma justificativa de por que combinam com você.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink">
              {["Entende linguagem natural", "Sugere imóveis com explicação", "Funciona 24 horas por dia"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-cream p-6">
              <Concierge />
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="relative overflow-hidden bg-winedeep py-20 text-cream md:py-28">
        <div className="absolute inset-0 opacity-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/1502672260266-1c1ef2d93688.jpg" alt="" className="img-cover" />
        </div>
        <div className="container-x relative">
          <Reveal className="max-w-2xl">
            <span className="eyebrow !text-gold">Como funciona</span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-cream md:text-5xl">
              Do sonho às <span className="italic-serif text-gold">chaves</span>.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="font-display text-6xl text-gold/40">{s.n}</div>
                <h3 className="mt-3 font-display text-2xl text-cream">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Depoimentos</span>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl">
              Quem confiou na <span className="italic-serif text-red">Horizonte</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {DEPOIMENTOS.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.08} className="card flex flex-col p-6">
                <div className="font-display text-5xl leading-none text-gold">“</div>
                <p className="mt-2 flex-1 leading-relaxed text-ink">{d.quote}</p>
                <div className="mt-5 border-t border-line pt-4">
                  <p className="font-semibold text-ink">{d.name}</p>
                  <p className="text-sm text-haze">{d.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-wine">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative grid items-center gap-8 p-10 md:grid-cols-2 md:p-16">
              <div>
                <h2 className="font-display text-3xl leading-tight text-cream md:text-4xl">
                  Tem um imóvel de alto padrão para <span className="italic-serif text-gold">vender</span>?
                </h2>
                <p className="mt-4 text-lg text-cream/80">
                  Anuncie com quem fala a língua do seu comprador. Avaliação gratuita e
                  divulgação para uma base qualificada.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
                <Link href="/anuncie" className="btn btn-gold">Anunciar meu imóvel</Link>
                <a href="tel:+5585999990000" className="btn btn-outline text-cream">Falar com consultor</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

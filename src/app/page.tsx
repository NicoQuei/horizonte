import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import PropertyCard from "@/components/PropertyCard";
import Concierge from "@/components/Concierge";
import { PROPERTIES } from "@/lib/properties";

const STATS = [
  { value: "R$ 800M+", label: "negociados" },
  { value: "150+", label: "imóveis exclusivos" },
  { value: "15", label: "anos de mercado" },
  { value: "98%", label: "clientes satisfeitos" },
];

const WHY = [
  {
    title: "Curadoria exclusiva",
    text: "Selecionamos a dedo imóveis de alto padrão no litoral cearense. Você não navega um portal infinito — recebe opções que fazem sentido.",
  },
  {
    title: "Assessoria completa",
    text: "Acompanhamos cada etapa: visita, negociação, documentação e registro. Do primeiro contato à entrega das chaves.",
  },
  {
    title: "Busca inteligente por IA",
    text: "Descreva o que procura em linguagem natural e nossa IA traduz em imóveis reais, com justificativa. Tecnologia a favor da sua decisão.",
  },
  {
    title: "Discrição e segurança",
    text: "Negociações de alto valor exigem sigilo. Tratamos cada cliente com confidencialidade e processos seguros.",
  },
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
  const destaques = PROPERTIES.slice(0, 6);

  return (
    <main>
      <Hero />

      {/* STATS */}
      <section className="border-b border-line bg-cream">
        <div className="container-x grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-display text-3xl text-wine md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-haze">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Por que a Horizonte</span>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              Mais do que vender imóveis, cuidamos da sua decisão.
            </h2>
            <p className="mt-4 text-lg text-haze">
              Somos uma imobiliária boutique. Trabalhamos com poucos imóveis e muita
              atenção a cada cliente.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08} className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-wine/10 font-display text-wine">
                  {i + 1}
                </div>
                <h3 className="mt-5 font-display text-lg text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-haze">{w.text}</p>
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
              <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                Imóveis em destaque
              </h2>
            </div>
            <Link href="/imoveis" className="btn btn-outline text-wine">
              Ver catálogo completo
            </Link>
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
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              Diga o que procura. Nossa IA encontra.
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
      <section className="bg-winedeep py-20 text-cream md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow !text-gold">Como funciona</span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-cream md:text-4xl">
              Um processo simples, do sonho às chaves.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="font-display text-5xl text-gold/40">{s.n}</div>
                <h3 className="mt-3 font-display text-xl text-cream">{s.title}</h3>
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
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              Quem confiou na Horizonte.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {DEPOIMENTOS.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.08} className="card flex flex-col p-6">
                <div className="text-3xl leading-none text-gold">“</div>
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
          <div className="overflow-hidden rounded-3xl bg-wine">
            <div className="grid items-center gap-8 p-10 md:grid-cols-2 md:p-16">
              <div>
                <h2 className="font-display text-3xl leading-tight text-cream md:text-4xl">
                  Tem um imóvel de alto padrão para vender?
                </h2>
                <p className="mt-4 text-lg text-cream/80">
                  Anuncie com quem fala a língua do seu comprador. Avaliação gratuita e
                  divulgação para uma base qualificada.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
                <Link href="/anuncie" className="btn btn-gold">
                  Anunciar meu imóvel
                </Link>
                <a href="tel:+5585999990000" className="btn btn-outline text-cream">
                  Falar com consultor
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

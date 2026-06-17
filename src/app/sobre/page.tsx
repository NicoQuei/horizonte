import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Sobre nós — Horizonte Imóveis",
  description:
    "Imobiliária boutique de alto padrão no litoral do Ceará. Conheça nossa história, valores e equipe.",
};

const VALORES = [
  { title: "Curadoria", text: "Trabalhamos com poucos imóveis e muito critério. Qualidade acima de quantidade." },
  { title: "Transparência", text: "Informação clara em cada etapa. Sem letras miúdas, sem surpresas." },
  { title: "Discrição", text: "Confidencialidade total em negociações de alto valor." },
  { title: "Excelência", text: "Atendimento personalizado do primeiro contato ao pós-venda." },
];

const TEAM = [
  { name: "Marina Albuquerque", role: "Fundadora & Diretora", img: "/images/1573496359142-b8d87734a5a2.jpg" },
  { name: "Téo Vasconcelos", role: "Sócio & Especialista em Litoral", img: "/images/1507003211169-0a1dd7228f2d.jpg" },
];

export default function SobrePage() {
  return (
    <main className="pt-[72px]">
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/1559827260-dc66d52bef19.jpg" alt="Litoral do Ceará" className="img-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-winedeep/95 to-wine/60" />
        </div>
        <div className="container-x relative py-24 md:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cream/90">
            Sobre a Horizonte
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.08] text-cream md:text-6xl">
            Uma imobiliária boutique feita para decisões importantes.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-cream/80">
            Há 15 anos conectamos pessoas aos melhores endereços do litoral cearense,
            com curadoria, tecnologia e atendimento de verdade.
          </p>
        </div>
      </section>

      {/* história */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">Nossa história</span>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              Nascemos para fazer diferente.
            </h2>
            <p className="mt-5 leading-relaxed text-haze">
              A Horizonte surgiu de uma inconformidade: os portais imobiliários tratam
              casas como planilhas, e ninguém se apaixona por uma planilha. Decidimos
              construir uma imobiliária que entende imóvel de alto padrão como o que ele
              é — uma decisão de vida.
            </p>
            <p className="mt-4 leading-relaxed text-haze">
              Combinamos uma curadoria rigorosa, fotografia profissional e uma busca
              por inteligência artificial inédita no setor. O resultado é uma
              experiência à altura dos imóveis que representamos.
            </p>
            <Link href="/imoveis" className="btn btn-primary mt-8">
              Ver nossos imóveis
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/1502672260266-1c1ef2d93688.jpg" alt="Interior de alto padrão" className="img-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* valores */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Nossos valores</span>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              O que nos guia.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="card p-6">
                <h3 className="font-display text-lg text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-haze">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* equipe */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Equipe</span>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
              Quem cuida de você.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1} className="card overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.img} alt={t.name} className="img-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-ink">{t.name}</h3>
                  <p className="text-sm text-red">{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

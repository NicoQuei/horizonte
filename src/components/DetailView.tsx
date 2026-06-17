"use client";

import { useState } from "react";
import Link from "next/link";
import { Property, PROPERTIES, formatPrice } from "@/lib/properties";
import PropertyCard from "@/components/PropertyCard";

export default function DetailView({ property }: { property: Property }) {
  const [active, setActive] = useState(0);
  const similares = PROPERTIES.filter((p) => p.slug !== property.slug).slice(0, 3);

  const specs = [
    { label: "Quartos", value: String(property.bedrooms) },
    { label: "Banheiros", value: String(property.bathrooms) },
    { label: "Área", value: `${property.area} m²` },
    {
      label: "Distância da orla",
      value: property.beachDistance === 0 ? "Pé na areia" : `${property.beachDistance} m`,
    },
  ];

  return (
    <main className="pt-[72px]">
      {/* breadcrumb */}
      <div className="container-x pt-6">
        <nav className="text-sm text-haze">
          <Link href="/" className="hover:text-ink">Início</Link> ·{" "}
          <Link href="/imoveis" className="hover:text-ink">Imóveis</Link> ·{" "}
          <span className="text-ink">{property.title}</span>
        </nav>
      </div>

      {/* topo */}
      <div className="container-x mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red">
            {property.location} · {property.city}
          </p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">{property.title}</h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-haze">Valor</p>
          <p className="font-display text-3xl text-wine">{formatPrice(property.price)}</p>
        </div>
      </div>

      {/* galeria */}
      <div className="container-x mt-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={property.images[active]} alt={property.title} className="img-cover" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {property.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-[4/3] overflow-hidden rounded-xl ring-2 transition ${
                active === i ? "ring-wine" : "ring-transparent hover:ring-line"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="img-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* corpo */}
      <div className="container-x mt-12 grid gap-10 pb-20 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* specs */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {specs.map((s) => (
              <div key={s.label} className="card p-4">
                <p className="text-xs uppercase tracking-wide text-haze">{s.label}</p>
                <p className="mt-1 font-display text-xl text-ink">{s.value}</p>
              </div>
            ))}
          </div>

          {/* descrição */}
          <h2 className="mt-10 font-display text-2xl">Sobre o imóvel</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">{property.excerpt}</p>
          <p className="mt-4 leading-relaxed text-haze">{property.story}</p>

          {/* características */}
          <h2 className="mt-10 font-display text-2xl">Diferenciais</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {property.tags.map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-lg border border-line bg-white p-3 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold">✓</span>
                <span className="capitalize text-ink">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* card de contato fixo */}
        <aside className="lg:col-span-1">
          <div className="card sticky top-24 p-6">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/1573496359142-b8d87734a5a2.jpg"
                alt="Consultora"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-ink">Marina Albuquerque</p>
                <p className="text-sm text-haze">Consultora · CRECI 00000</p>
              </div>
            </div>

            <a href="tel:+5585999990000" className="btn btn-primary mt-6 w-full">
              Agendar visita privada
            </a>
            <a
              href={`https://wa.me/5585999990000?text=Tenho interesse no imóvel ${encodeURIComponent(property.title)}`}
              className="btn btn-gold mt-3 w-full"
            >
              Falar no WhatsApp
            </a>
            <p className="mt-4 text-center text-xs text-haze">
              Resposta em até 1 hora útil · Atendimento confidencial
            </p>
          </div>
        </aside>
      </div>

      {/* similares */}
      <section className="border-t border-line bg-cream py-16">
        <div className="container-x">
          <h2 className="font-display text-2xl md:text-3xl">Imóveis semelhantes</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similares.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

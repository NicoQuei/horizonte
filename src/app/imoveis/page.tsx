"use client";

import { useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import Concierge from "@/components/Concierge";
import { PROPERTIES, Property, PRICE_BOUNDS, formatPrice } from "@/lib/properties";
import { applyFilters, EMPTY_FILTERS, Filters } from "@/lib/filters";

export default function ImoveisPage() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [conciergeResults, setConciergeResults] = useState<Property[] | null>(null);
  const [sort, setSort] = useState<"relevancia" | "menor" | "maior">("relevancia");

  const items = useMemo(() => {
    const base = conciergeResults ?? applyFilters(filters);
    const sorted = [...base];
    if (sort === "menor") sorted.sort((a, b) => a.price - b.price);
    if (sort === "maior") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [filters, conciergeResults, sort]);

  function patch(p: Partial<Filters>) {
    setConciergeResults(null);
    setFilters((f) => ({ ...f, ...p }));
  }

  const active =
    Object.values(filters).some((v) => v !== null) || conciergeResults !== null;

  return (
    <main className="pt-[72px]">
      {/* cabeçalho */}
      <section className="border-b border-line bg-cream">
        <div className="container-x py-12">
          <span className="eyebrow">Catálogo</span>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Imóveis disponíveis</h1>
          <p className="mt-3 max-w-2xl text-lg text-haze">
            Residências de alto padrão no litoral do Ceará. Use a busca por IA ou
            refine pelos filtros.
          </p>

          <div className="mt-8 rounded-2xl bg-white p-4 shadow-card">
            <Concierge onResults={(p) => setConciergeResults(p)} />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-x">
          {/* barra de filtros */}
          <div className="flex flex-wrap items-center gap-3">
            <FilterChip active={filters.oceanfront === true} onClick={() => patch({ oceanfront: filters.oceanfront ? null : true })}>
              Frente mar
            </FilterChip>
            <FilterChip active={filters.beachfront === true} onClick={() => patch({ beachfront: filters.beachfront ? null : true })}>
              Pé na areia
            </FilterChip>
            {[2, 3, 4].map((n) => (
              <FilterChip key={n} active={filters.minBedrooms === n} onClick={() => patch({ minBedrooms: filters.minBedrooms === n ? null : n })}>
                {n}+ quartos
              </FilterChip>
            ))}

            <div className="ml-auto flex items-center gap-3">
              {active && (
                <button
                  onClick={() => {
                    setFilters(EMPTY_FILTERS);
                    setConciergeResults(null);
                  }}
                  className="text-sm font-medium text-red hover:underline"
                >
                  Limpar
                </button>
              )}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm text-ink outline-none"
              >
                <option value="relevancia">Relevância</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
              </select>
            </div>
          </div>

          {/* faixa de preço */}
          <div className="mt-5 max-w-sm">
            <label className="text-sm text-haze">
              Preço máximo: <span className="font-semibold text-ink">{formatPrice(filters.maxPrice ?? PRICE_BOUNDS.max)}</span>
            </label>
            <input
              type="range"
              min={PRICE_BOUNDS.min}
              max={PRICE_BOUNDS.max}
              step={50000}
              value={filters.maxPrice ?? PRICE_BOUNDS.max}
              onChange={(e) => patch({ maxPrice: Number(e.target.value) })}
              className="mt-2 w-full accent-wine"
            />
          </div>

          <p className="mt-8 text-sm text-haze">{items.length} imóveis encontrados</p>

          {items.length > 0 ? (
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-line bg-white p-12 text-center">
              <p className="font-display text-2xl text-ink">Nenhum imóvel com esses critérios.</p>
              <p className="mt-2 text-haze">Tente ajustar os filtros ou descrever o que procura para a nossa IA.</p>
              <button
                onClick={() => {
                  setFilters(EMPTY_FILTERS);
                  setConciergeResults(null);
                }}
                className="btn btn-primary mt-6"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-wine bg-wine text-cream"
          : "border-line bg-white text-ink hover:border-wine"
      }`}
    >
      {children}
    </button>
  );
}

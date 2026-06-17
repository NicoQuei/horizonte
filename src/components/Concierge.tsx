"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Property, PROPERTIES, formatPrice } from "@/lib/properties";

const SUGESTOES = [
  "Apartamento de frente pro mar, 3 quartos, até R$ 4 milhões",
  "Casa pé na areia em Jericoacoara para a família",
  "Primeiro imóvel perto da praia em Fortaleza",
  "Imóvel de alto padrão para kitesurf",
];

type Result = {
  slugs: string[];
  rationale: string;
  source: "gemini" | "heuristic";
};

export default function Concierge({
  onResults,
  variant = "light",
}: {
  onResults?: (props: Property[]) => void;
  variant?: "light" | "onwine";
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function search(q: string) {
    if (!q.trim()) return;
    setQuery(q);
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = (await res.json()) as Result;
      setResult(data);
      const props = data.slugs
        .map((s) => PROPERTIES.find((p) => p.slug === s))
        .filter(Boolean) as Property[];
      onResults?.(props);
    } catch {
      setResult({
        slugs: [],
        rationale: "O concierge está indisponível no momento. Tente novamente.",
        source: "heuristic",
      });
    } finally {
      setLoading(false);
    }
  }

  const matched = result
    ? (result.slugs
        .map((s) => PROPERTIES.find((p) => p.slug === s))
        .filter(Boolean) as Property[])
    : [];

  const onWine = variant === "onwine";

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search(query);
        }}
        className={`flex flex-col gap-3 rounded-2xl border p-3 sm:flex-row sm:items-center ${
          onWine ? "border-cream/15 bg-cream/[0.06]" : "border-line bg-white shadow-card"
        }`}
      >
        <div className="flex flex-1 items-center gap-3 px-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={onWine ? "text-gold" : "text-red"}>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Descreva o imóvel dos seus sonhos…"
            className={`w-full bg-transparent py-2.5 text-base outline-none ${
              onWine
                ? "text-cream placeholder:text-cream/40"
                : "text-ink placeholder:text-haze/70"
            }`}
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-gold">
          {loading ? "Buscando…" : "Buscar com IA"}
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {SUGESTOES.map((s) => (
          <button
            key={s}
            onClick={() => search(s)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              onWine
                ? "border-cream/15 text-cream/70 hover:border-gold hover:text-cream"
                : "border-line text-haze hover:border-red hover:text-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`mt-6 rounded-2xl border p-5 ${
              onWine ? "border-cream/15 bg-cream/[0.06]" : "border-line bg-white shadow-card"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-ink">
                IA
              </span>
              <div>
                <p className={`leading-relaxed ${onWine ? "text-cream" : "text-ink"}`}>
                  {result.rationale}
                </p>
                <p className={`mt-1 text-[11px] uppercase tracking-wide ${onWine ? "text-cream/40" : "text-haze/70"}`}>
                  {result.source === "gemini" ? "Interpretado por IA (Gemini)" : "Interpretação inteligente local"}
                </p>
              </div>
            </div>

            {matched.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {matched.slice(0, 3).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/imoveis/${p.slug}`}
                    className="group overflow-hidden rounded-xl border border-line bg-white"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="img-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-display text-base text-ink">{p.title}</h4>
                      <p className="mt-0.5 text-xs text-haze">
                        {p.location} · {formatPrice(p.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

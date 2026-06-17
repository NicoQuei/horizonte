"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Concierge from "@/components/Concierge";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-[72px]">
      {/* fundo */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/1613490493576-7fde63acd811.jpg"
          alt="Residência de alto padrão à beira-mar"
          className="img-cover kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-winedeep/95 via-wine/75 to-wine/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-winedeep/90 via-transparent to-winedeep/30" />
      </div>

      <div className="container-x relative w-full py-16">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cream/90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Imobiliária boutique · Litoral do Ceará
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl leading-[1.02] text-cream sm:text-6xl lg:text-7xl"
          >
            Imóveis de alto padrão{" "}
            <span className="italic-serif text-gold">à beira-mar</span> do Ceará.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-cream/80"
          >
            Curadoria de residências exclusivas, assessoria completa do início ao
            registro e uma busca inteligente que entende o que você procura.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8"
          >
            <Concierge />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-cream/75"
          >
            <span className="flex items-center gap-2">
              <Check /> +150 imóveis exclusivos
            </span>
            <span className="flex items-center gap-2">
              <Check /> 15 anos de mercado
            </span>
            <span className="flex items-center gap-2">
              <Check /> CRECI/CE 00000-J
            </span>
            <Link href="/imoveis" className="font-semibold text-gold link-underline">
              Ver todos os imóveis →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b5872f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

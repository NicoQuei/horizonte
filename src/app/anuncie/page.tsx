"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Field = "tipo" | "local" | "quartos" | "preco" | "nome" | "contato";

const STEPS: { label: string; placeholder: string; field: Field; type?: string }[] = [
  { label: "Que tipo de imóvel você quer anunciar?", placeholder: "Casa, apartamento, villa, terreno…", field: "tipo" },
  { label: "Onde fica?", placeholder: "Cumbuco, Beira Mar, Jericoacoara…", field: "local" },
  { label: "Quantos quartos?", placeholder: "Ex.: 3", field: "quartos" },
  { label: "Qual o valor pretendido?", placeholder: "Ex.: R$ 2.000.000", field: "preco" },
  { label: "Como podemos te chamar?", placeholder: "Seu nome", field: "nome" },
  { label: "Qual o melhor contato?", placeholder: "WhatsApp ou e-mail", field: "contato" },
];

export default function AnunciePage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<Record<Field, string>>({
    tipo: "", local: "", quartos: "", preco: "", nome: "", contato: "",
  });

  const current = STEPS[step];
  const value = form[current.field];
  const isLast = step === STEPS.length - 1;

  function next() {
    if (!value.trim()) return;
    if (isLast) setDone(true);
    else setStep((s) => s + 1);
  }

  return (
    <main className="pt-[72px]">
      <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
        {/* lado visual */}
        <div className="relative hidden overflow-hidden lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/1600585154340-be6161a56a0c.jpg" alt="Imóvel de alto padrão" className="img-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-winedeep/90 via-wine/40 to-transparent" />
          <div className="absolute bottom-0 p-12 text-cream">
            <h2 className="font-display text-3xl leading-tight">
              Anuncie com quem fala a língua do seu comprador.
            </h2>
            <ul className="mt-6 space-y-3 text-cream/85">
              <li className="flex items-center gap-3"><Dot /> Avaliação gratuita e sem compromisso</li>
              <li className="flex items-center gap-3"><Dot /> Fotografia e divulgação profissional</li>
              <li className="flex items-center gap-3"><Dot /> Base qualificada de compradores</li>
            </ul>
          </div>
        </div>

        {/* formulário */}
        <div className="flex items-center justify-center px-6 py-16 md:px-12">
          <div className="w-full max-w-md">
            {!done ? (
              <>
                <div className="mb-10 flex gap-1.5">
                  {STEPS.map((s, i) => (
                    <div key={s.field} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-wine" : "bg-line"}`} />
                  ))}
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red">
                  Anuncie · {String(step + 1).padStart(2, "0")}/{String(STEPS.length).padStart(2, "0")}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.field}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                  >
                    <label className="mt-4 block font-display text-2xl leading-tight md:text-3xl">
                      {current.label}
                    </label>
                    <input
                      autoFocus
                      value={value}
                      onChange={(e) => setForm((f) => ({ ...f, [current.field]: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && next()}
                      placeholder={current.placeholder}
                      className="mt-6 w-full rounded-xl border border-line bg-white px-4 py-3.5 text-lg text-ink outline-none focus:border-wine"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center gap-4">
                  {step > 0 && (
                    <button onClick={() => setStep((s) => s - 1)} className="text-sm font-medium text-haze hover:text-ink">
                      ← Voltar
                    </button>
                  )}
                  <button onClick={next} disabled={!value.trim()} className="btn btn-primary ml-auto disabled:opacity-40">
                    {isLast ? "Enviar" : "Continuar"}
                  </button>
                </div>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-2xl text-gold">✓</div>
                <h2 className="mt-6 font-display text-3xl leading-tight md:text-4xl">
                  Recebemos o seu imóvel!
                </h2>
                <p className="mt-4 text-haze">
                  Obrigado, {form.nome || "tudo certo"}. Um de nossos consultores entra em
                  contato em até 1 dia útil para a avaliação gratuita.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-gold" />;
}

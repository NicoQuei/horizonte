import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-winedeep text-cream">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-cream font-display text-sm text-wine">
                H
              </span>
              <span className="font-display text-lg tracking-tight">HORIZONTE</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/65">
              Imobiliária boutique de alto padrão no litoral do Ceará. Curadoria,
              assessoria completa e tecnologia para encontrar o endereço certo.
            </p>
            <p className="mt-5 text-xs text-cream/45">CRECI/CE 00000-J</p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Navegar
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              <li><Link href="/imoveis" className="hover:text-cream">Imóveis</Link></li>
              <li><Link href="/sobre" className="hover:text-cream">Sobre nós</Link></li>
              <li><Link href="/anuncie" className="hover:text-cream">Anuncie</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Contato
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              <li><a href="tel:+5585999990000" className="hover:text-cream">(85) 99999-0000</a></li>
              <li><a href="mailto:contato@horizonte.com.br" className="hover:text-cream">contato@horizonte.com.br</a></li>
              <li>Av. Beira Mar, 3000 — Meireles<br />Fortaleza · CE</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Atendimento
            </h4>
            <p className="mt-5 text-sm leading-relaxed text-cream/70">
              Seg a Sex · 9h às 19h<br />
              Sáb · 9h às 13h
            </p>
            <Link href="/anuncie" className="btn btn-gold mt-6">
              Falar com consultor
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/45 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Horizonte Imóveis. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream">Política de privacidade</a>
            <a href="#" className="hover:text-cream">Termos de uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

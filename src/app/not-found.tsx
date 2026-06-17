import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">404</p>
      <h1 className="mt-6 font-display text-5xl font-light leading-tight md:text-7xl">
        Esse horizonte
        <br />
        ainda não existe.
      </h1>
      <Link
        href="/"
        className="mt-10 rounded-full border border-gold px-8 py-3 text-xs uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        Voltar ao início
      </Link>
    </main>
  );
}

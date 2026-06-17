"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const LINKS = [
  { href: "/imoveis", label: "Imóveis" },
  { href: "/sobre", label: "Sobre nós" },
  { href: "/anuncie", label: "Anuncie" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || pathname !== "/";

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-line/70 bg-paper/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            className={clsx(
              "flex h-8 w-8 items-center justify-center rounded-md font-display text-sm",
              solid ? "bg-wine text-cream" : "bg-cream/15 text-cream backdrop-blur"
            )}
          >
            H
          </span>
          <span
            className={clsx(
              "font-display text-lg tracking-tight",
              solid ? "text-ink" : "text-cream"
            )}
          >
            HORIZONTE
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "link-underline text-sm font-medium transition-colors",
                solid ? "text-ink/75 hover:text-ink" : "text-cream/85 hover:text-cream",
                pathname.startsWith(l.href) && "!text-red"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="tel:+5585999990000"
            className={clsx(
              "hidden text-sm font-semibold lg:block",
              solid ? "text-ink" : "text-cream"
            )}
          >
            (85) 99999-0000
          </a>
          <Link href="/anuncie" className="btn btn-gold hidden sm:inline-flex">
            Anunciar imóvel
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className={clsx(
              "flex h-9 w-9 items-center justify-center rounded-md md:hidden",
              solid ? "text-ink" : "text-cream"
            )}
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>
      </div>

      {/* menu mobile */}
      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-cream"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/anuncie" className="btn btn-gold mt-2">
              Anunciar imóvel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

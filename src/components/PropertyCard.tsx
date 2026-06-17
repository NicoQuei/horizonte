import Link from "next/link";
import { Property, formatPrice } from "@/lib/properties";

function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-sm text-haze">
      <span className="text-red/80">{icon}</span>
      {label}
    </span>
  );
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/imoveis/${property.slug}`}
      className="card group flex flex-col hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.images[0]}
          alt={property.title}
          className="img-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {property.oceanfront && (
            <span className="rounded-full bg-wine/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream backdrop-blur">
              Frente mar
            </span>
          )}
          {property.beachDistance === 0 && (
            <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
              Pé na areia
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-haze">
          {property.location} · {property.city}
        </p>
        <h3 className="mt-1.5 font-display text-xl leading-tight text-ink">
          {property.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-haze">
          {property.excerpt}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-4">
          <Spec icon={<IconBed />} label={`${property.bedrooms} quartos`} />
          <Spec icon={<IconBath />} label={`${property.bathrooms} banheiros`} />
          <Spec icon={<IconArea />} label={`${property.area} m²`} />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl text-wine">
            {formatPrice(property.price)}
          </span>
          <span className="text-sm font-semibold text-red transition-transform group-hover:translate-x-1">
            Ver detalhes →
          </span>
        </div>
      </div>
    </Link>
  );
}

function IconBed() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18v-6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6" />
      <path d="M2 18h20M4 10V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
    </svg>
  );
}
function IconBath() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2M2 12h20v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-3zM6 19v2M18 19v2" />
    </svg>
  );
}
function IconArea() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v18H3zM3 9h18M9 3v18" />
    </svg>
  );
}

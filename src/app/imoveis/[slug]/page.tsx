import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROPERTIES, getProperty } from "@/lib/properties";
import DetailView from "@/components/DetailView";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProperty(params.slug);
  if (!p) return { title: "Imóvel não encontrado — Horizonte" };
  return {
    title: `${p.title} — ${p.location} | Horizonte`,
    description: p.excerpt,
  };
}

export default function PropertyPage({ params }: { params: { slug: string } }) {
  const property = getProperty(params.slug);
  if (!property) notFound();
  return <DetailView property={property} />;
}

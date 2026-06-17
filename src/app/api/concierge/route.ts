import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROPERTIES } from "@/lib/properties";
import {
  applyFilters,
  EMPTY_FILTERS,
  Filters,
  heuristicParse,
} from "@/lib/filters";

export const runtime = "nodejs";

type ConciergeResult = {
  filters: Filters;
  slugs: string[];
  rationale: string;
  source: "gemini" | "heuristic";
};

export async function POST(req: NextRequest) {
  const { query } = (await req.json()) as { query?: string };
  if (!query || !query.trim()) {
    return NextResponse.json({ error: "query vazia" }, { status: 400 });
  }

  const key = process.env.GEMINI_API_KEY;

  if (key) {
    try {
      const result = await askGemini(key, query);
      return NextResponse.json(result);
    } catch (err) {
      console.error("[concierge] Gemini falhou, usando heurística:", err);
    }
  }

  // fallback local
  const filters = heuristicParse(query);
  const matches = applyFilters(filters);
  const result: ConciergeResult = {
    filters,
    slugs: matches.map((m) => m.slug),
    rationale: localRationale(query, matches.length),
    source: "heuristic",
  };
  return NextResponse.json(result);
}

async function askGemini(key: string, query: string): Promise<ConciergeResult> {
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json", temperature: 0.4 },
  });

  const catalog = PROPERTIES.map((p) => ({
    slug: p.slug,
    title: p.title,
    location: `${p.location}, ${p.city}`,
    price: p.price,
    bedrooms: p.bedrooms,
    area: p.area,
    oceanfront: p.oceanfront,
    beachfront: p.beachDistance === 0,
    tags: p.tags,
  }));

  const prompt = `Você é o concierge da HORIZONTE, imobiliária de alto padrão do litoral do Ceará.
O usuário descreve o imóvel desejado em linguagem natural. Sua tarefa:
1. Traduzir o desejo em filtros estruturados.
2. Selecionar os imóveis do CATÁLOGO que melhor atendem (ordem de relevância).
3. Escrever uma justificativa curta, editorial e calorosa (máx 2 frases), em português.

Responda APENAS com JSON no formato:
{
  "filters": { "oceanfront": boolean|null, "beachfront": boolean|null, "minBedrooms": number|null, "maxPrice": number|null, "minPrice": number|null, "location": string|null },
  "slugs": string[],
  "rationale": string
}

CATÁLOGO:
${JSON.stringify(catalog, null, 2)}

PEDIDO DO USUÁRIO: "${query}"`;

  const res = await model.generateContent(prompt);
  const text = res.response.text();
  const parsed = JSON.parse(text) as {
    filters?: Partial<Filters>;
    slugs?: string[];
    rationale?: string;
  };

  const valid = new Set(PROPERTIES.map((p) => p.slug));
  const slugs = (parsed.slugs ?? []).filter((s) => valid.has(s));

  return {
    filters: { ...EMPTY_FILTERS, ...(parsed.filters ?? {}) },
    slugs: slugs.length ? slugs : PROPERTIES.map((p) => p.slug),
    rationale:
      parsed.rationale ?? "Separei alguns endereços que conversam com o seu pedido.",
    source: "gemini",
  };
}

function localRationale(query: string, count: number) {
  if (count === 0)
    return "Não encontrei um encaixe exato — mas me diga mais sobre a luz que você procura e eu acho.";
  if (count === 1) return "Encontrei o endereço que parece feito para o seu pedido.";
  return `Selecionei ${count} endereços alinhados ao que você descreveu — comece pelo primeiro.`;
}

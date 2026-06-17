import { PROPERTIES, Property } from "./properties";

export type Filters = {
  oceanfront: boolean | null;
  beachfront: boolean | null; // pé na areia (beachDistance === 0)
  minBedrooms: number | null;
  maxPrice: number | null;
  minPrice: number | null;
  location: string | null;
};

export const EMPTY_FILTERS: Filters = {
  oceanfront: null,
  beachfront: null,
  minBedrooms: null,
  maxPrice: null,
  minPrice: null,
  location: null,
};

export function applyFilters(filters: Filters, list: Property[] = PROPERTIES): Property[] {
  return list.filter((p) => {
    if (filters.oceanfront !== null && p.oceanfront !== filters.oceanfront) return false;
    if (filters.beachfront !== null && (p.beachDistance === 0) !== filters.beachfront) return false;
    if (filters.minBedrooms !== null && p.bedrooms < filters.minBedrooms) return false;
    if (filters.maxPrice !== null && p.price > filters.maxPrice) return false;
    if (filters.minPrice !== null && p.price < filters.minPrice) return false;
    if (
      filters.location &&
      !`${p.location} ${p.city}`.toLowerCase().includes(filters.location.toLowerCase())
    )
      return false;
    return true;
  });
}

/**
 * Parser heurístico local — usado quando não há GEMINI_API_KEY.
 * Cobre os padrões mais comuns de busca em PT-BR.
 */
export function heuristicParse(query: string): Filters {
  const q = query.toLowerCase();
  const f: Filters = { ...EMPTY_FILTERS };

  if (/(pé na areia|pe na areia|na areia)/.test(q)) f.beachfront = true;
  if (/(frente (pro |ao |para o )?mar|frente mar|beira[- ]?mar|vista (pro |para o )?mar|oceanfront)/.test(q))
    f.oceanfront = true;

  const bed = q.match(/(\d+)\s*(quartos?|suítes?|suites?|dormitórios?|dormitorios?)/);
  if (bed) f.minBedrooms = parseInt(bed[1], 10);

  // preço: "até 2 milhões", "2mi", "R$ 2.000.000", "máximo 1.5 milhão"
  const priceVal = parsePrice(q);
  if (priceVal !== null) {
    if (/(a partir de|acima de|mínimo|minimo|mais de)/.test(q)) f.minPrice = priceVal;
    else f.maxPrice = priceVal;
  }

  for (const loc of [
    "cumbuco",
    "jericoacoara",
    "jeri",
    "taíba",
    "taiba",
    "beira mar",
    "mucuripe",
    "porto das dunas",
    "fortaleza",
    "aquiraz",
  ]) {
    if (q.includes(loc)) {
      f.location = loc === "jeri" ? "jericoacoara" : loc;
      break;
    }
  }

  return f;
}

function parsePrice(q: string): number | null {
  // "2 milhões", "1,5 milhão", "2mi"
  const mi = q.match(/(\d+[.,]?\d*)\s*(milh(ões|ão|ao|oes)|mi\b|kk)/);
  if (mi) return Math.round(parseFloat(mi[1].replace(",", ".")) * 1_000_000);
  const mil = q.match(/(\d+[.,]?\d*)\s*mil\b/);
  if (mil) return Math.round(parseFloat(mil[1].replace(",", ".")) * 1_000);
  // valor cru com separadores: R$ 2.000.000
  const raw = q.match(/r?\$?\s*([\d]{1,3}(?:[.\s]\d{3})+)/);
  if (raw) return parseInt(raw[1].replace(/[.\s]/g, ""), 10);
  return null;
}

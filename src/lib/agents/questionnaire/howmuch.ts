import { redis } from '@/lib/upstash-rate-limit';
import { supabase } from '@/lib/supabase';
import { TavilyClient } from '@tavilyai/sdk';

interface CostInfo {
  item: string;
  price: string;
  currency: string;
  variations: {
    type?: string;
    price: string;
  }[];
  source: string;
  last_updated: string;
}

// TODO: Implement this function to extract price information from Tavily results
function processPriceResults(results: any): CostInfo {
  console.warn("processPriceResults not implemented. Returning placeholder.");
  return {
    item: "Unknown",
    price: "N/A",
    currency: "RSD",
    variations: [],
    source: "Tavily Search",
    last_updated: new Date().toISOString()
  };
}

export async function handleHowMuchQuestion(question: string): Promise<CostInfo> {
  const cacheKey = `cost:${question}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached as string);

  // Proveri Supabase bazu prvo
  const { data } = await supabase
    .from('official_prices')
    .select('*')
    .ilike('item', `%${question}%`)
    .limit(1);

  if (data?.length) {
    const costInfoFromSupabase: CostInfo = data[0] as CostInfo; // Cast to CostInfo
    await redis.set(cacheKey, JSON.stringify(costInfoFromSupabase), { ex: 259200 }); // 3 dana cache
    return costInfoFromSupabase;
  }

  // Ako nema u bazi, koristi Tavily
  const tavily = new TavilyClient(process.env.TAVILY_API_KEY!);
  const results = await tavily.search({
    query: `${question} cena site:gov.rs OR site:beograd.rs`, // Adding 'cena' and specific sites
    include_raw_content: true,
    region: 'rs' // Focus on Serbia
  });

  const costInfoFromTavily: CostInfo = processPriceResults(results); // Posebna funkcija za ekstrakciju cena
  
  // Update last_updated for Tavily results before caching
  costInfoFromTavily.last_updated = new Date().toISOString();

  await redis.set(cacheKey, JSON.stringify(costInfoFromTavily), { ex: 86400 }); // 24h cache
  return costInfoFromTavily;
}
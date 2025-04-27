import { supabase, gemini, kv } from "@/lib/omega";

export const runtime = 'edge';

export async function POST(req: Request) {
  const { query, agent } = await req.json();

  // 1. ATOMSKI CACHE
  const cached = await kv.get(`${agent}:${query}`);
  if (cached) return new Response(cached);

  // 2. QUANTUM AGENT SWITCH
  let response;
  switch(agent) {
    case 'travel':
      response = await gemini.stream(`TravelGPT: ${query}`);
      break;
    case 'legal':
      response = await fetch(`https://api.zakoni.gov.rs/ai?q=${query}`).then(r => r.text());
      break;
    case 'health':
      response = `MedGPT beta odgovor za: ${query}`; // Temp dok ne integrišemo WHO API
  }

  // 3. SAVE TO CACHE & ANALYTICS
  await Promise.all([
    kv.set(`${agent}:${query}`, response, { ex: 86400 }),
    supabase.from('analytics').insert([{ event: agent, query }])
  ]);

  return new Response(response);
}
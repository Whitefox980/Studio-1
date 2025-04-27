// app/api/travel/route.ts
import { getCache, setCache } from '@/lib/cache';

async function fetchTravelData(query: string) {
    return { query, timestamp: Date.now() };
  }

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  
  // Proveri cache prvo
  const cached = await getCache(`travel:${query}`);
  if (cached) return Response.json(cached);
  
  if(!query){
    return Response.json({error: 'Missing query param'})
  }
  // Ako nema u cache-u, pozovi Tavily/Gemini
  const freshData = await fetchTravelData(query); // Tvoja logika
  
  // Sačuvaj u cache
  await setCache(`travel:${query}`, freshData);
  
  return Response.json(freshData);
}

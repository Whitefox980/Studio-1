export async function POST(req: Request) {
  const { query, agent } = await req.json();

  // 1. MAGIČNI CACHE SYSTEM
  const cacheKey = `${agent}:${query}`.toLowerCase();
  const cached = await kv.get(cacheKey); // Vercel KV (bez Redis setup-a)
  if (cached) return Response.json(cached);

  // 2. HYPER AGENT SWITCH
  let response;
  switch(agent) {
    case 'travel':
      response = await gemini.stream(`Daj najbolje za: ${query} [putovanja]`);
      break;
    case 'legal':
      const law = await fetch(`http://api.pravno.rs/laws?q=${query}`).then(r => r.text());
      response = `📜 Zakon kaže: ${law.slice(0, 500)}...`; // Cut-off magic
      break;
  }

  // 3. BAM! CACHE FOR 24H
  await kv.set(cacheKey, response, { ex: 86400 });

  return Response.json(response);
}
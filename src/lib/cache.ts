import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

// Primer keširanja
const cachedData = await redis.get(`search:${query}`);
if (!cachedData) {
  const freshData = await fetchFreshData(query); // Replace with actual data fetching
  const response = JSON.stringify(freshData)
  await redis.setex(`search:${query}`, 86_400, response); // 24h cache
}

export async function cacheResponse(key: string, data: any, ttl: number) {
  await fetch('https://your-upstash-redis-url.com/setex', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.UPSTASH_TOKEN}` },
    body: JSON.stringify({ key, value: data, ex: ttl })
  });
}
export async function getTravelData(query: string) {
  const cached = await redis.get(`travel:${query}`);
  if (cached) return cached;

  const data = await fetchTravelData(query); // Tavily/Gemini
  await redis.setex(`travel:${query}`, 3600 * 24, data); // 24h cache
  return data;
}
// app/api/prices/route.ts
import { scrapePrices } from '@/lib/scrapers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const product = searchParams.get('product') || 'hleb';

  // Redis caching
  const cached = await redis.get(`prices:${product}`);
  if (cached) return new Response(cached);

  // Scraping
  const data = await scrapePrices({
    product,
    locations: ['maxi', 'idea', 'dis']
  });

  // Cache for 1h
  await redis.setex(`prices:${product}`, 3600, JSON.stringify(data));

  return new Response(JSON.stringify(data));
}
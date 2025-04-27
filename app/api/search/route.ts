// app/api/search/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // 1. Parsiraj query parametre
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || 'default';

    // 2. Proveri Redis cache
    const cacheResponse = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/search:${query}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
      }
    );
    
    const cachedData = await cacheResponse.json();
    
    // 3. Ako postoji u cache-u, vrati odmah
    if (cachedData.result) {
      return NextResponse.json(JSON.parse(cachedData.result));
    }

    // 4. Ako nema u cache-u, uzmi sveže podatke
    const freshData = await fetchDataFromExternalAPI(query);

    // 5. Sačuvaj u Redis (TTL: 1 sat = 3600 sekundi)
    await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/setex/search:${query}/3600`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(freshData),
      }
    );

    return NextResponse.json(freshData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

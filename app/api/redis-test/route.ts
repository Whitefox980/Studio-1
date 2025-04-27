import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch(
    `${process.env.UPSTASH_REDIS_REST_URL}/set/test_key/hello_from_upstash`, 
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
      }
    }
  );
  
  const data = await response.json();
  return NextResponse.json(data);
}
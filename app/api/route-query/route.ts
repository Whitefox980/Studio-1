// app/api/route-query/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  // Simulacija provere tipa upita
  const agentType = determineAgentType(query);

  return NextResponse.json({ agentType });
}

function determineAgentType(query: string) {
  if (query.includes('zdravlje') || query.includes('lekar')) {
    return 'health';
  } else if (query.includes('putovanje') || query.includes('destinacija')) {
    return 'travel';
  } else {
    return 'default';
  }
}
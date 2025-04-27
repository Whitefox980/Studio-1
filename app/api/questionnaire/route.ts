import { NextResponse } from 'next/server';
import { handleLocationQuestion } from '@/lib/agents/questionnaire/location';
import { handleProcedureQuestion } from '@/lib/agents/questionnaire/procedure';
import { handleDefinitionQuestion } from '@/lib/agents/questionnaire/definitions';
import { handleCanIDoQuestion } from '@/lib/agents/questionnaire/can';
import { handleWhyQuestion } from '@/lib/agents/questionnaire/why';
import { handleWhenQuestion } from '@/lib/agents/questionnaire/when';
import { handleHowMuchQuestion } from '@/lib/agents/questionnaire/howmuch';
import { handleMustIDoQuestion } from '@/lib/agents/questionnaire/must';

import { rateLimiter } from '@/lib/upstash-rate-limit';

export const runtime = 'edge';

const AGENT_MAPPING = [
  { test: (q: string) => q.startsWith('gde') || q.includes('najbliži'), handler: handleLocationQuestion },
  { test: (q: string) => q.startsWith('kako') || q.includes('korak'), handler: handleProcedureQuestion },
  { test: (q: string) => q.startsWith('šta') || q.includes('znači'), handler: handleDefinitionQuestion },
  { test: (q: string) => q.startsWith('zašto'), handler: handleWhyQuestion },
  { test: (q: string) => q.startsWith('kada') || q.includes('rok') || q.includes('datum') || q.includes('koliko dugo'), handler: handleWhenQuestion },
  { test: (q: string) => q.includes('koliko košta') || q.includes('koja je cena') || q.includes('cena') || q.includes('koliko iznosi'), handler: handleHowMuchQuestion },
  { test: (q: string) => q.startsWith('da li mogu') || q.includes('da li je dozvoljeno') || q.includes('da li smem'), handler: handleCanIDoQuestion },
  { test: (q: string) => q.startsWith('da li moram') || q.includes('da li je obavezno') || q.includes('moram li'), handler: handleMustIDoQuestion }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const question = searchParams.get('q');
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  // Rate limiting
  const { success } = await rateLimiter.limit(`api:${ip}`);
  if (!success) {
    return NextResponse.json(
      { error: 'Previše zahteva, pokušajte ponovo za 1 minut.' },
      { status: 429 }
    );
  }

  if (!question) {
    return NextResponse.json(
      { error: 'Parametar q (pitanje) je obavezan' },
      { status: 400 }
    );
  }

  try {
    const lowerQuestion = question.toLowerCase();
    
    for (const agent of AGENT_MAPPING) {
      if (agent.test(lowerQuestion)) {
        const response = await agent.handler(question);
        return NextResponse.json(response);
      }
    }

    // If no agent matched
    // response = await handleGenericQuestion(question);
    const response = { error: 'Tip pitanja nije prepoznat' }; // Placeholder for now
    return NextResponse.json(response);

  } catch (error) {
    console.error('Questionnaire error:', error);
    return NextResponse.json(
      { error: 'Došlo je do greške pri obradi pitanja' },
      { status: 500 }
    );
  }
}
import { GoogleGenerativeAI } from '@google/generative-ai';
import { redis } from '@/lib/upstash-rate-limit';

interface Definition {
  term: string;
  explanation: string;
  source?: string;
  related_terms?: string[];
  last_updated?: string;
}

export async function handleDefinitionQuestion(term: string): Promise<Definition> {
  // Proveri Upstash prvo
  const cached = await redis.get(`def:${term}`);
  if (cached) return JSON.parse(cached as string);

  // Ako nema u cache-u, koristi AI
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Objasni pojam "${term}" u kontekstu srpskog zakonodavstva u JSON formatu sa tim poljima:
  {"term": "...", "explanation": "...", "source": "...", "related_terms": [...]}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    const definition: Definition = JSON.parse(text);
    definition.last_updated = new Date().toISOString();
    
    // Sačuvaj u Upstash na 7 dana
    await redis.set(`def:${term}`, JSON.stringify(definition), {
      ex: 604800 // 7 dana u sekundama
    });

    return definition;
  } catch (error) {
    console.error('Error parsing definition:', error);
    throw new Error('Došlo je do greške pri obradi definicije');
  }
}
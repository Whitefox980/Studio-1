import { redis } from '@/lib/upstash-rate-limit';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Explanation {
  question: string;
  answer: string;
  sources: string[];
  legal_basis?: string[];
}

export async function handleWhyQuestion(question: string): Promise<Explanation> {
  const cacheKey = `why:${question}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Objasni zašto postoji pravilo "${question}" u Srbiji. Daj tačan odgovor u JSON formatu:
  {
    "answer": "Detaljno objašnjenje...",
    "sources": ["Zakon o...", "Uredba..."],
    "legal_basis": ["Član 34.", "Član 5. stav 2."]
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const explanation: Explanation = JSON.parse(text);
    
    await redis.set(cacheKey, JSON.stringify(explanation), { ex: 86400 }); // Cache za 24h
    
    return explanation;
  } catch (error) {
    console.error('WhyAgent error:', error);
    throw new Error('Došlo je do greške pri obradi objašnjenja');
  }
}
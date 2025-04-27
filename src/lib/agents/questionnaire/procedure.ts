// Ovaj agent rukuje pitanjima tipa "Kako da..." i "Koji su koraci za..."
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cache } from '@/lib/redis';

interface Step {
  step: number;
  title: string;
  description: string;
  important?: boolean;
}

export async function handleProcedureQuestion(question: string): Promise<Step[]> {
  const cacheKey = `procedure:${question}`;
  const cached = await cache.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Pretpostavi da si službenik u državnoj upravi. Na pitanje "${question}" daj tačne korake u JSON formatu:
  [{"step": 1, "title": "...", "description": "...", "important": true/false}]`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  try {
    const steps = JSON.parse(text);
    await cache.set(cacheKey, JSON.stringify(steps), 43200); // 12 sati cache
    return steps;
  } catch (error) {
    console.error('Error parsing procedure response:', error);
    throw new Error('Došlo je do greške pri obradi postupka');
  }
}
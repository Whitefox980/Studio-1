import { redis } from '@/lib/upstash-rate-limit';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface PermissionInfo {
  question: string;
  answer: 'da' | 'ne' | 'uslovno';
  explanation: string;
  conditions?: string[];
  required_documents?: string[];
  legal_source?: string;
}

export async function handleCanIDoQuestion(question: string): Promise<PermissionInfo> {
  const cacheKey = `can:${question}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached as string);

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Odgovori na pitanje "${question}" u kontekstu srpskog zakonodavstva u JSON formatu:
  {
    "answer": "da/ne/uslovno",
    "explanation": "...",
    "conditions": ["...", "..."],
    "required_documents": ["...", "..."],
    "legal_source": "Zakon o..."
  }`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const permissionInfo: PermissionInfo = JSON.parse(text);
  
  await redis.set(cacheKey, JSON.stringify(permissionInfo), { ex: 259200 }); // 3 dana cache
  
  return permissionInfo;
}
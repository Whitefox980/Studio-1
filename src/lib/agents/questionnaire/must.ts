import { redis } from '@/lib/upstash-rate-limit';
import { supabase } from '@/lib/supabase';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ObligationInfo {
  obligation: string;
  is_required: boolean;
  deadline?: string;
  penalty?: string;
  exceptions?: string[];
  legal_source: string;
}

export async function handleMustIDoQuestion(question: string): Promise<ObligationInfo> {
  const cacheKey = `must:${question}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached as string);

  // Proveri Supabase bazu obaveza
  const { data } = await supabase
    .from('legal_obligations')
    .select('*')
    .ilike('obligation', `%${question}%`)
    .limit(1);

  if (data?.length) {
    const obligationInfoFromSupabase: ObligationInfo = data[0] as ObligationInfo; // Cast to ObligationInfo
    await redis.set(cacheKey, JSON.stringify(obligationInfoFromSupabase), { ex: 604800 }); // 7 dana cache
    return obligationInfoFromSupabase;
  }

  // Ako nema u bazi, koristi AI
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Da li je obavezno "${question}" u Srbiji? Odgovori u JSON formatu:
  {
    "is_required": true/false,
    "deadline": "...",
    "penalty": "...",
    "exceptions": ["...", "..."],
    "legal_source": "Zakon o..."
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;\
    const text = response.text();
    const obligationInfo: ObligationInfo = JSON.parse(text);
    
    await redis.set(cacheKey, JSON.stringify(obligationInfo), { ex: 604800 });
    return obligationInfo;
  } catch (error) {
    console.error('MustIDo agent error:', error);
    throw new Error('Došlo je do greške pri obradi obaveze');
  }
}
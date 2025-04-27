import { supabase } from '@/lib/supabase';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { query, type } = await req.json();

  // 1. Proveri cache prvo
  const cached = await supabase.from('cache').select('*').eq('query', query).single();
  if (cached.data) return Response.json(cached.data.response);

  // 2. Pravni agent shortcut
  if (type === 'legal') {
    const law = await fetch(`https://api.pravno.rs/laws?q=${encodeURIComponent(query)}`).then(res => res.text());
    return new Response(law); // Fake streaming - samo vrati ceo tekst
  }

  // 3. Travel agent sa pravim streamingom
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContentStream(query);

  // 4. Trackuj u Supabase
  await supabase.from('analytics').insert([{ event: `search_${type}`, query }]);

  // 5. Streamuj odgovor
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        controller.enqueue(encoder.encode(chunk.text()));
      }
      controller.close();
    },
  });

  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } });
}
import { streamText } from 'ai';
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: geminiPro,
    messages,
  });
  return result.toAIStreamResponse();
}
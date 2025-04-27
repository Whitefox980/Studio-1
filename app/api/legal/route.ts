import { scrapeLawSimple } from "@/src/lib/scrapers/legalScraper";
import { generateGeminiResponse } from "@/src/lib/genkit";

export async function POST(req: Request) {
  const { question } = await req.json();
  const lawText = await scrapeLawSimple(question);
  
  const prompt = `Pravni odgovor za: "${question}". Koristi samo ove zakone: ${lawText}`;
  return generateGeminiResponse(prompt); // Vaš postojeći Gemini poziv
}

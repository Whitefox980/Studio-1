import { defineFlow } from "@genkit-ai/core";
import { vertexAI } from "@genkit-ai/vertexai";
import { z } from "zod";

export const searchFlow = defineFlow({
  name: "gdekakoSearch",
  inputSchema: z.string(),
  outputSchema: z.object({
    answer: z.string(),
    sources: z.array(z.string()),
  }),
  async run(query: string) {
    const llm = vertexAI("gemini-flash-2.0");
    const response = await llm.generate({
      prompt: `Korisnik traži: "${query}". Odgovori na srpskom sa:
      1. Konkretan odgovor (max 3 rečenice)
      2. Listu 3 relevantna izvora`,
    });
    
    return parseResponse(response.text());
  },
});
// src/lib/agents/nekretnine.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

export class NekretnineAgent {
  private model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  async findProperties(location: string, type: string, priceRange: string) {
    const prompt = `
      Kao stručnjak za nekretnine, tražim nekretnine u sledećim kategorijama na srpskom:
      Lokacija: ${location}
      Tip: ${type}
      Cena: ${priceRange}
      
      Daj detalje o nekoliko dostupnih nekretnina.
    `;

    const result = await this.model.getGenerativeModel({ model: 'gemini-pro' })
      .generateContent(prompt);
    
    return result.response.text();
  }
}
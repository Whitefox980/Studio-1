// src/lib/integrations/euprava.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
export async function getDocumentInfo(docType: string): Promise<{ text: string }[]> {
 try {
    const response = await fetch('https://www.pravno-informacioni-sistem.rs/');
    const laws = extractLaws(await response.text());
    return laws;
  } catch (error) {
    console.error('Error fetching or processing document info:', error);
    throw error; // Re-throw the error to handle it further up the call stack
  }
}

function extractLaws(text: string): { text: string }[] {
  return [{ text }];
}

export async function askLegal(query: string) {
  try {
    const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const legalModel = generativeAI.getGenerativeModel({ model: 'legal-rs' });
    const answer = await legalModel.generateContent(`Zakon o ${query}`);
    return answer.response.text();
  } catch (error) {
    console.error('Error generating legal response:', error);
    throw error;
  }
}

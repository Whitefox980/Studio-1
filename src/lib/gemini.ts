import { GoogleGenerativeAI } from "@google/generative-ai";

export const gemini = new GoogleGenerativeAI(process.env.GEMINI_KEY, {
  modelConfig: {
    maxOutputTokens: 500 // Force short responses
  }
});
import genkit from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});

export default ai;

// Use server directive.
'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing search queries and web results,
 * extracting key information to provide accurate and useful responses in Serbian.
 *
 * @remarks
 * The flow uses Gemini Flash 2.0 to analyze search queries and web results from Tavily API,
 * extracting key information to provide accurate and useful responses in Serbian.
 *
 * @exports analyzeInformationFlow - The Genkit flow for analyzing information.
 * @exports AnalyzeInformationInput - The input type for the analyzeInformationFlow.
 * @exports AnalyzeInformationOutput - The output type for the analyzeInformationFlow.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {tavilySearch} from '@/services/tavily';
import { checkCache, cacheResults } from '../../../functions/src/cache';

/**
 * Input schema for the analyzeInformationFlow.
 */
const AnalyzeInformationInputSchema = z.object({
  query: z.string().describe('The search query to analyze.'),
});
export type AnalyzeInformationInput = z.infer<typeof AnalyzeInformationInputSchema>;

/**
 * Output schema for the analyzeInformationFlow.
 */
const AnalyzeInformationOutputSchema = z.object({
  summary: z.string().describe('A summary of the key information extracted from the search results in Serbian.'),
});
export type AnalyzeInformationOutput = z.infer<typeof AnalyzeInformationOutputSchema>;

/**
 * Analyzes a search query and web results to extract key information and provide a summary in Serbian.
 *
 * @param input - The input object containing the search query.
 * @returns A promise that resolves to an object containing the summary in Serbian.
 */
export async function analyzeInformation(input: AnalyzeInformationInput): Promise<AnalyzeInformationOutput> {
  return analyzeInformationFlow(input);
}

/**
 * Prompt definition for analyzing information.
 */
const analyzeInformationPrompt = ai.definePrompt({
  name: 'analyzeInformationPrompt',
  input: {
    schema: z.object({
      query: z.string().describe('The search query to analyze.'),
      searchResults: z.string().describe('The search results from Tavily API.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A summary of the key information extracted from the search results in Serbian.'),
    }),
  },
  prompt: `Korisnik je postavio sledeći upit: {{{query}}}.
Analiziraj sledeće rezultate pretrage:
{{{searchResults}}}
Izvuci ključne informacije i pruži koristan odgovor na srpskom jeziku.`, // Serbian language prompt
});

/**
 * Genkit flow for analyzing search queries and web results.
 */
const analyzeInformationFlow = ai.defineFlow<
  typeof AnalyzeInformationInputSchema,
  typeof AnalyzeInformationOutputSchema
>({
  name: 'analyzeInformationFlow',
  inputSchema: AnalyzeInformationInputSchema,
  outputSchema: AnalyzeInformationOutputSchema,
}, async (input) => {
    // 1. Check Redis cache
    const cached = await checkCache(input.query);
    if (cached) {
      return cached as AnalyzeInformationOutput;
    }

    // Call Tavily API to get search results
    const searchResults = await tavilySearch({
      query: input.query,
      include_raw_content: true,
    });

    // Extract content from search results
    const searchContent = searchResults.results.map(result => result.content).join('\n');

    // Call the prompt to analyze the information and provide a summary
    const {output} = await analyzeInformationPrompt({
      query: input.query,
      searchResults: searchContent,
    });

    // 3. Save to cache
    await cacheResults(input.query, output);

    return output!;
});

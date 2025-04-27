'use server';
/**
 * @fileOverview A search results display AI agent.
 *
 * - searchResultsDisplay - A function that handles the search results display process.
 * - SearchResultsDisplayInput - The input type for the searchResultsDisplay function.
 * - SearchResultsDisplayOutput - The return type for the searchResultsDisplay function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'zod';
import {tavilySearch, TavilySearchResult} from '@/services/tavily';
import { checkCache, cacheResults } from '../../../functions/src/cache';

const SearchResultsDisplayInputSchema = z.object({
  query: z.string().describe('The search query.'),
});
export type SearchResultsDisplayInput = z.infer<typeof SearchResultsDisplayInputSchema>;

const SearchResultsDisplayOutputSchema = z.object({
  results: z.array(z.object({
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().optional(),
    rating: z.number().optional(),
    price: z.string().optional(),
    location: z.string().optional()
  })).describe('The search results to display.'),
});
export type SearchResultsDisplayOutput = z.infer<typeof SearchResultsDisplayOutputSchema>;

export async function searchResultsDisplay(input: SearchResultsDisplayInput): Promise<SearchResultsDisplayOutput> {
  return searchResultsDisplayFlow(input);
}

const searchResultsPrompt = ai.definePrompt({
  name: 'searchResultsPrompt',
  input: {
    schema: z.object({
      query: z.string().describe('The search query.'),
      searchResults: z.array(z.object({
        title: z.string(),
        url: z.string(),
        content: z.string()
      })).describe('The search results from Tavily API.')
    }),
  },
  output: {
    schema: z.object({
      results: z.array(z.object({
        title: z.string(),
        description: z.string(),
        imageUrl: z.string().optional(),
        rating: z.number().optional(),
        price: z.string().optional(),
        location: z.string().optional()
      })).describe('The search results to display in TripAdvisor-style cards.')
    }),
  },
  prompt: `You are an AI assistant designed to extract information from web search results and format them into TripAdvisor-style cards.

Analyze the following search query and web search results to extract key information, including title, description, image URL, rating, price, and location (if available).

Search Query: {{{query}}}

Web Search Results:
{{#each searchResults}}
Title: {{{title}}}
URL: {{{url}}}
Content: {{{content}}}
{{/each}}

Format the extracted information into a JSON array of TripAdvisor-style cards. Each card should include:
- title: The title of the search result.
- description: A concise summary of the search result.
- imageUrl: An optional URL of an image associated with the search result.
- rating: An optional rating of the search result (e.g., from user reviews).
- price: An optional price associated with the search result (e.g., for hotels or restaurants).
- location: An optional location associated with the search result.

Ensure that the output is well-formatted and easy to understand. The response MUST be in Serbian. Return valid JSON.`, // Serbian language
});

const searchResultsDisplayFlow = ai.defineFlow<
  typeof SearchResultsDisplayInputSchema,
  typeof SearchResultsDisplayOutputSchema
>({
  name: 'searchResultsDisplayFlow',
  inputSchema: SearchResultsDisplayInputSchema,
  outputSchema: SearchResultsDisplayOutputSchema
},
async input => {
    // 1. Check Redis cache
    const cached = await checkCache(input.query);
    if (cached) {
      return cached as SearchResultsDisplayOutput;
    }

  const tavilyResults = await tavilySearch({
    query: input.query,
    include_raw_content: true,
  });

  const { output } = await searchResultsPrompt({
    query: input.query,
    searchResults: tavilyResults.results
  });

    // 3. Save to cache
    await cacheResults(input.query, output);

  return output!;
});

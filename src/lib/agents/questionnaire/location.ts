import { tavilySearch } from '@/lib/tavily';

export async function handleLocationQuestion(question: string) {
  const results = await tavilySearch({
    query: `${question} site:gov.rs OR site:beograd.rs`,
    region: 'rs'
  });

  return results.results.map((item: any) => ({
    name: item.title,
    address: item.metadata?.address || '',
    content: item.content,
    url: item.url
  }));
}
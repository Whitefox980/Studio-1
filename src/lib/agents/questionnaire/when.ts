import { redis } from '@/lib/upstash-rate-limit';
import { TavilyClient } from '@tavilyai/sdk';

interface TimeInfo {
  event: string;
  dates: string[];
  deadlines?: string[];
  recurring?: boolean;
  frequency?: string;
}

export async function handleWhenQuestion(question: string): Promise<TimeInfo> {
  const cacheKey = `when:${question}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached as string);

  const tavily = new TavilyClient(process.env.TAVILY_API_KEY!);
  const results = await tavily.search({
    query: `${question} site:gov.rs OR site:pravno-informacioni-sistem.rs`,
    include_raw_content: true,
    region: 'rs'
  });

  // Procesuiraj rezultate
  const timeInfo: TimeInfo = {
    event: question,
    dates: [],
    deadlines: []
  };

  results.answers.forEach((item: any) => {
    if (item.metadata?.date) timeInfo.dates.push(item.metadata.date);
    if (item.metadata?.deadline) timeInfo.deadlines.push(item.metadata.deadline);
  });

  await redis.set(cacheKey, JSON.stringify(timeInfo), { ex: 43200 }); // 12h cache
  
  return timeInfo;
}
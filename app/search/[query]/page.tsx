
import { SearchBar } from '@/components/search/SearchBar';
import { AgentResponse } from '@/components/agent-response';

export async function generateMetadata({ params }: { params: { query: string } }) {
  return {
    title: `gde-kako.rs - Rezultati za ${params.query}`,
    description: `Pronađite najbolje odgovore za ${params.query} u Srbiji`
  };
}
 
export default async function SearchPage({
  params,
  searchParams
}: {
  params: { query: string };
  searchParams: { agent?: string };
}) {
  const results = await getData(params.query, searchParams?.agent);

  return (
    <main className="min-h-screen p-8">
       <h1 className="text-4xl font-bold text-center mb-8">
         Rezultati za: {params.query}
       </h1>
      <AgentResponse agent={searchParams.agent} results={results} />
    </main>
  );
}

async function getData(query: string, agent?: string) {
  if (!agent) {
    return [];
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/${agent}?q=${query}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data;
}

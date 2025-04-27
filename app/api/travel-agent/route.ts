// src/app/search/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AgentResponse } from '@/components/agent-response';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const agent = searchParams.get('agent') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      // 1. Pozvati agenta
      const agentResponse = await fetch('/api/travel-agent', {
        method: 'POST',
        body: JSON.stringify({ query, agent })
      });
      const agentResults = await agentResponse.json();

      setResults(agentResults);
    };

    fetchResults();
  }, [query, agent]);

  return (
    <main className='min-h-screen p-8'>
      <h1 className='text-4xl font-bold text-center mb-8'>
        Rezultati za: {query}
      </h1>
      {/* Prikaz agenta i rezultata */}
      <AgentResponse agent={agent} results={results} />
    </main>
  );
}
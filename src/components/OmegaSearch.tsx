'use client';
import { useState } from 'react';
import AgentCard from './agents/AgentCard';
export default function OmegaSearch() {
  const [output, setOutput] = useState<Record<string, string>>({
    travel: '',
    legal: '',
    health: ''
  });

  const handleQuery = async (query: string) => {
    await Promise.all(
      Object.keys(output).map(async (agent) => {
        const res = await fetch('/api/omega', {
          method: 'POST',
          body: JSON.stringify({ query, agent }),
        });
        setOutput(prev => ({ ...prev, [agent]: await res.text() }));
      })
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {Object.entries(output).map(([agent, text]) => (
        <AgentCard key={agent} agent={agent} text={text} />
      ))}
    </div>
  );
}
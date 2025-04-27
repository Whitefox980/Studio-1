'use client';
import { useState } from 'react';
export default function HyperAgent({ type }: { type: 'travel' | 'legal' }) {
  const [output, setOutput] = useState('');

  const handleQuery = async (query: string) => {
    const res = await fetch('/api/blizanci', {
      method: 'POST',
      body: JSON.stringify({ query, agent: type }),
    });

    if (type === 'travel') {
      // Streaming magic
      for await (const chunk of res.body!) {
        setOutput(prev => prev + new TextDecoder().decode(chunk));
      }
    } else {
      setOutput(await res.text());
    }
  };

  return (
    <div>
      <input onChange={(e) => handleQuery(e.target.value)} />
      <div className="output">{output}</div>
    </div>
  );
}
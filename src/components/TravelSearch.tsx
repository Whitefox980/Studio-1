'use client';
import { useState } from 'react';
export function TravelSearch() {
  const [response, setResponse] = useState('');

  const handleSearch = async (query: string) => {
    const res = await fetch('/api/travel', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      setResponse(prev => prev + decoder.decode(value));
    }
  };

  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      <div>{response}</div>
    </div>
  );
}
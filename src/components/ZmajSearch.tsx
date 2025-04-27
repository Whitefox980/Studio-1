'use client';
export function ZmajSearch() {
  const search = async (query: string, type: 'travel' | 'legal') => {
    const res = await fetch('/api/zmaj', {
      method: 'POST',
      body: JSON.stringify({ query, type }),
    });

    if (type === 'legal') {
      const law = await res.text();
      alert(`Pravni odgovor: ${law}`);
    } else {
      // Streaming za putovanja
      const reader = res.body?.getReader();
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        console.log(new TextDecoder().decode(value));
      }
    }
  };

  return (
    <div className="space-y-4">
      <button onClick={() => search('Viza za Nemačku', 'legal')} className="bg-red-500 p-2">
        PRAVNI ODMAH
      </button>
      <button onClick={() => search('Hoteli u Beogradu', 'travel')} className="bg-blue-500 p-2">
        PUTOVANJA STREAM
      </button>
    </div>
  );
}
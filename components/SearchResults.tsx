'use client';
import { useState } from 'react';

export default function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Unesi pretragu..."
        className="p-2 border rounded"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? 'Učitavam...' : 'Traži'}
      </button>
      
      {error && <div className="text-red-500">{error}</div>}
      
      {results && (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(results, null, 2)}
        </pre>
      )}
    </div>
  );
}

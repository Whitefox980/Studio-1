'use client';

import {useState, useEffect} from 'react';
import {Agent} from '@/types';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {searchResultsDisplay, SearchResultsDisplayOutput} from '@/ai/flows/search-results-display';

interface SearchResultsProps {
  query: string;
  agent: Agent;
}

export function SearchResults({query, agent}: SearchResultsProps) {
  const [results, setResults] = useState<SearchResultsDisplayOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const aiResults = await searchResultsDisplay({query: query});
        setResults(aiResults);
      } catch (e: any) {
        console.error('Error fetching search results:', e);
        setError(e.message || 'Došlo je do greške prilikom pretrage.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, agent]);

  if (isLoading) {
    return <div>Učitavanje rezultata...</div>;
  }

  if (error) {
    return <div>Greška: {error}</div>;
  }

  if (!results || !results.results.length) {
    return <div>Nema rezultata za prikaz.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.results.map((result, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{result.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{result.description}</CardDescription>
            {result.imageUrl && (
              <img src={result.imageUrl} alt={result.title} className="mt-4 rounded-md" />
            )}
            {result.rating && <div className="mt-2">Rating: {result.rating}</div>}
            {result.price && <div className="mt-2">Price: {result.price}</div>}
            {result.location && <div className="mt-2">Location: {result.location}</div>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

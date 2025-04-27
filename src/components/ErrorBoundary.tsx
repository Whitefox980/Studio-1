'use client';
import { useEffect } from 'react';

export default function ErrorBoundary({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
    sentry.captureException(error);
  }, [error]);

  return (
    <div className="bg-red-50 p-4">
      <h3>Došlo je do greške!</h3>
      <button onClick={() => window.location.reload()}>Pokušaj ponovo</button>
    </div>
  );
}

import { useRouter } from 'next/router';

export default function Agent() {
  const router = useRouter();
  const query = router.query.query || 'Nepoznat upit';

  // Dummy logika za agenta
  const agent = query.toString().toLowerCase().includes('pravni') ? 'Pravni agent' : 'Tehnički agent';

  return (
    <main style={{ fontFamily: 'monospace', backgroundColor: '#111', color: '#0f0', padding: '2rem' }}>
      <h1>Upit: {query}</h1>
      <p>Operator aktivira: <strong>{agent}</strong></p>
      <h2>Izveštaj agenta:</h2>
      <ul>
        <li>Analiza upita završena</li>
        <li>Odgovor generisan</li>
        <li>Dostava korisniku u toku...</li>
      </ul>
    </main>
  );
}

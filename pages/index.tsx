
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ fontFamily: 'monospace', backgroundColor: 'black', color: '#00ff00', padding: '2rem' }}>
      <h1>VolMax Operator Console</h1>
      <p>Unesi svoj upit. Operator će dodeliti odgovarajućeg agenta.</p>
      <Link href='/agent?query=Kako%20da%20popravim%20bojler'>
        <button style={{ backgroundColor: '#003300', color: '#00ff00', padding: '1rem', marginTop: '1rem' }}>
          POKRENI UPIT
        </button>
      </Link>
    </main>
  );
}

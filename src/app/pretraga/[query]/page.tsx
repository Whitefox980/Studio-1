
// src/app/pretraga/[query]/page.tsx
export async function generateMetadata({ params }: { params: { query: string } }) {
  return {
    title: `gde-kako.rs - Rezultati za ${params.query}`,
    description: `Pronađite najbolje odgovore za ${params.query} u Srbiji`
  };
}

// TODO: Implement the actual page here.
export default function Page({ params }: { params: { query: string } }) {
  return <div>Search results for: {params.query}</div>;
}

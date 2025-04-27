// app/api/cene/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const proizvod = searchParams.get('proizvod') || 'hleb';
  
  // Scraping logika
  const rezultati = await scrapePrices({
    proizvod,
    lokacije: searchParams.get('prodavnice')?.split(',') || []
  });

  return new Response(JSON.stringify(rezultati));
}
export async function scrapeLawSimple(query: string) {
  const res = await fetch(`https://www.parlament.gov.rs/search?q=${encodeURIComponent(query)}`);
  const html = await res.text();
  
  // Ekstrakcija preko regexa (pojednostavljeno)
  const lawMatch = html.match(/<div class="law-text">([\s\S]*?)<\/div>/);
  return lawMatch ? lawMatch[1] : 'Nije pronađen tekst zakona';
}
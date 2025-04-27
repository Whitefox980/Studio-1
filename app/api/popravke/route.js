// app/api/popravke/route.js
export async function POST(req) {
  const { uredjaj, problem } = await req.json();
  const res = await gemini.generate(
    `Kako popraviti ${uredjaj} kada ${problem}? Koristi isključivo proverene tehničke priručnike.`
  );
  return NextResponse.json({ resenje: res });
}
// app/api/repairs/route.js
export async function POST(req) {
  const { device, problem } = await req.json();
  
  const response = await gemini.generate(`
  Korisnik ima problem sa ${device}: "${problem}".
  
  Daj:
  1. 3 najčešća rešenja
  2. Listu potrebnih alata
  3. Video uputstvo (YouTube link)
  
  NE PREPORUČUJ SPECIFIČNE SERVISE!
  `);

  return NextResponse.json({ solution: response });
}
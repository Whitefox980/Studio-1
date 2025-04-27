// app/api/giveaways/route.js
export async function GET() {
  const data = await fetch('https://www.srecanje.rs/trenutne-nagradne-igre');
  return new Response(JSON.stringify({
    active: parseGiveaways(await data.text()) 
  }));
}
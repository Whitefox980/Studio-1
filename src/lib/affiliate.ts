export async function getBookingLinks(query: string) {
  const res = await fetch(`https://api.travelpayouts.com/v2/prices?query=${query}`);
  return res.json().data.slice(0, 5);
}
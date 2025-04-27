export async function fetchLaw(lawName: string) {
  const res = await fetch(
    `https://api.pravno-informacioni-sistem.rs/laws?search=${encodeURIComponent(lawName)}`,
    { headers: { "x-api-key": process.env.LEGAL_API_KEY } }
  );
  return res.json();
}
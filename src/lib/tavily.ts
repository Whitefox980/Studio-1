export async function tavilySearch(query: string) {
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.TAVILY_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      include_raw_content: true,
      search_depth: "advanced",
      region: "rs",
    }),
  });

  if (!response.ok) throw new Error("Tavily API greška!");
  return await response.json();
}
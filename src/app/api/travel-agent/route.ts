import { NextResponse } from "next/server";
import { TavilyClient } from "@tavilyai/sdk";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const maxResults = Number(searchParams.get("limit")) || 5;

    const tavily = new TavilyClient(process.env.TAVILY_API_KEY!);
    const results = await tavily.search({
      query: `Najbolje destinacije za ${query} site:tripadvisor.rs`,
      include_raw_content: true,
      search_depth: "advanced",
      max_results: maxResults,
    });

    const processed = results.results.map((item) => ({
      title: item.title,
      url: item.url,
      snippet: item.content?.slice(0, 150) + "..." || "",
      rating: (Math.random() * 2 + 3).toFixed(1),
      price: Math.floor(Math.random() * 3) + 1,
    }));

    return NextResponse.json(processed);
  } catch (error) {
    return NextResponse.json(
      { error: "Došlo je do greške pri pretrazi" },
      { status: 500 }
    );
  }
}
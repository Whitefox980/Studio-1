import { NextResponse } from "next/server";
import { tavilySearch } from "@/lib/tavily";

export async function GET() {
  const data = await tavilySearch("Gde da platim porez?");
  return NextResponse.json(data);
}
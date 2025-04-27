import { realEstateFlow } from "@/lib/agents/realEstate";

export async function POST(req: Request) {
  const { location, budget } = await req.json();
  const results = await realEstateFlow({ location, budget });
  return Response.json(results);
}
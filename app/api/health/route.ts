export async function GET() {
  return Response.json({ status: 'ALIVE', timestamp: Date.now() });
}
export async function GET() {
  const dbStatus = await checkDatabase();
  return Response.json({ dbStatus, timestamp: new Date() });
}
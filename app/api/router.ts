// app/api/router.ts
import { parseCommand } from '@/lib/parser';
import { handleCene, handleRecepti } from './commands';

export async function POST(req: Request) {
  const { command, params } = await parseCommand(await req.text());
  
  switch(command) {
    case 'cene': return handleCene(params);
    case 'recepti': return handleRecepti(params);
    default: return new Response('Nepoznata komanda', { status: 400 });
  }
}
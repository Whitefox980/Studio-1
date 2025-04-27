import { kv } from '@/lib/omega';

const AGENT_STYLES = {
  travel: 'bg-blue-100',
  legal: 'bg-purple-100',
  health: 'bg-red-100',
};

export async function ResultSection({ agent }: { agent: string }) {
  const data = await kv.keys(`${agent}:*`); // Prikaz poslednjih pretraga
  return (
    <div className={`p-4 ${AGENT_STYLES[agent]}`}>
      <h2>{agent.toUpperCase()} AGENT</h2>
      <ul>{data.map(item => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}
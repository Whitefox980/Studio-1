tsx
const AGENT_DATA = {
  travel: { emoji: '✈️', color: 'bg-blue-500' },
  legal: { emoji: '⚖️', color: 'bg-purple-500' },
  health: { emoji: '🏥', color: 'bg-red-500' }
};
export function AgentCard({ agent, text }: { agent: string; text: string }) {
  return (
    <div className={`p-4 rounded-lg ${AGENT_DATA[agent].color}`}>
      <div className="text-2xl">{AGENT_DATA[agent].emoji}</div>
      <div>{text || `Pretraži kao ${agent} agent...`}</div>
    </div>
  );
}
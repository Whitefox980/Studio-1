const AGENTS = [
  {
    id: "real-estate",
    name: "Milan Nekretnine",
    specialty: "Pronalazi stanove i kuće",
    icon: "🏠"
  },
  {
    id: "travel",
    name: "Ana Putovanja",
    specialty: "Saveti za putovanja",
    icon: "✈️"
  }
];

export function AgentSelector() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {AGENTS.map(agent => (
        <button
          key={agent.id}
          className="p-4 border rounded-lg hover:bg-gray-50"
        >
          <span className="text-2xl">{agent.icon}</span>
          <h3>
            {agent.id === "real-estate"
              ? "Nekretnine"
              : agent.id === "travel"
              ? "Putovanja" : agent.name}
          </h3>
          <p className="text-sm">{agent.specialty}</p>
        </button>
      ))}
    </div>
  );
}
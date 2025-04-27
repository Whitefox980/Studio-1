'use client';

import {useState} from 'react';
import {Agent} from '@/types';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

const AGENTS: Agent[] = [
  {
    id: 'realEstate',
    name: 'Milan Prokić',
    specialty: 'Stručnjak za nekretnine',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'travel',
    name: 'Ana Putnik',
    specialty: 'Putnički savetnik',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 'cooking',
    name: 'Marko Kuvar',
    specialty: 'Kulinarski ekspert',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'tech',
    name: 'Ivana Tehnolog',
    specialty: 'Tehnološki entuzijasta',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 'health',
    name: 'Jelena Zdravković',
    specialty: 'Zdravstveni savetnik',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'ev',
    name: 'Nikola Električar',
    specialty: 'Stručnjak za električna vozila',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
];

interface AgentSelectorProps {
  onSelectAgent: (agent: Agent) => void;
}

export function AgentSelector({onSelectAgent}: AgentSelectorProps) {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgentId(agent.id);
    onSelectAgent(agent);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold">Izaberite agenta:</h3>
      {AGENTS.map((agent) => (
        <div
          key={agent.id}
          onClick={() => handleAgentSelect(agent)}
          className={`flex items-center gap-3 p-3 hover:bg-accent/20 rounded-lg cursor-pointer ${
            selectedAgentId === agent.id ? 'bg-accent/50' : ''
          }`}
        >
          <Avatar>
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{agent.name}</h4>
            <p className="text-sm text-muted-foreground">{agent.specialty}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

import {Agent} from '@/types';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

interface AgentProfileProps {
  agent: Agent;
}

export function AgentProfile({agent}: AgentProfileProps) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={agent.avatar} alt={agent.name} />
        <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-lg font-semibold">{agent.name}</h2>
        <p className="text-sm text-muted-foreground">{agent.specialty}</p>
      </div>
    </div>
  );
}

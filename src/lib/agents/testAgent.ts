// src/lib/agents/testAgent.ts
export const testAgent = {
  search: () => ({ test: "RADI" }) // Fiksni odgovor
};

// Testirajte u browser konzoli:
fetch('/api/search', { method: 'POST' }).then(r => r.json()).then(console.log)
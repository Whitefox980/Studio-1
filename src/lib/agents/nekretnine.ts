// src/lib/agents/nekretnine.ts
export const nekretnineAgent = {
  name: "Pera Stanovi",
  search: async (lokacija: string) => {
    return [{
      title: `Stan u ${lokacija}`,
      cena: "100.000€", 
      link: "#"
    }];
  }
};
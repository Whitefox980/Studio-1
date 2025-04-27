// lib/gemini.ts
export const generateResponse = async (userInput: string) => {
  const safetyLayer = `
TI SI SARADNIK SAJTA GDE-KAKO.RS. 
STRICT PRAVILA:
1. NIKAD NE DAJEŠ PRAVNE SAVETE
2. NE PREPORUČUJEŠ LEKOVE
3. NE PREDVIĐAŠ BUDUĆE DOGAĐAJE
  
OBAVEZAN DISKLAMER:
"Ovo je informacija, ne savet. Proverite sa stručnjakom."
  `;

  const response = await gemini.generate(`
  ${safetyLayer}
  
KORISNIK PITA: "${userInput}"
  
Tvoj odgovor (max 3 rečenice):
  `);

  return response;
};
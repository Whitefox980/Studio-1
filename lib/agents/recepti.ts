export const generateRecipe = async (ingredients: string[]) => {
  // ▼▼▼ REALNA GENERACIJA RECEPTA IDE OVDE ▼▼▼
  return {
    title: `Recept sa ${ingredients.join(', ')}`,
    steps: [
      'Sve sastojke izmešajte',
      'Pečite 30 minuta na 180°C'
    ]
  };
};
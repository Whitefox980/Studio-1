import { defineFlow } from "@genkit-ai/core";
import { z } from "zod";

export const realEstateFlow = defineFlow({
  name: "realEstateSearch",
  inputSchema: z.object({
    location: z.string(),
    budget: z.number().optional()
  }),
  async run({ location, budget }) {
    // Implementacija pretrage...
    return {
      results: [
        {
          title: "Stan u centru",
          price: "120.000€",
          link: "https://www.4zida.rs/stanovi"
        }
      ]
    };
  }
});
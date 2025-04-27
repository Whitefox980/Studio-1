// src/lib/agents/nekretnine.ts
import { z } from "zod";
import { FunctionCallOptions, FunctionSchema, Schema } from "genkit";

const propertySchema = z.object({
  type: z.string().describe("Tip nekretnine, npr. kuca, stan, poslovni prostor"),
  location: z
    .string()
    .describe(
      "Lokacija nekretnine, npr. Novi Sad, Centar, Bulevar Oslobodjenja 10",
    ),
  size: z.string().describe("Kvadratura nekretnine u m2, npr. 100m2"),
  price: z
    .string()
    .describe("Cena nekretnine u evrima, npr. 100000, 250000"),
  description: z
    .string()
    .describe("Detaljan opis nekretnine, npr. luksuzna vila sa bazenom"),
  seller: z.string().describe("Ime prodavca ili agencije"),
  phone: z.string().describe("Kontakt telefon prodavca ili agencije"),
  url: z.string().describe("URL oglasa nekretnine"),
});

const nekretnineSchema = z.object({
  properties: z.array(propertySchema).describe("Lista nekretnina"),
});

export type Nekretnine = z.infer<typeof nekretnineSchema>;

export const nekretnine: FunctionSchema<
  typeof nekretnineSchema,
  FunctionCallOptions
> = {
  name: "nekretnine",
  description: "Pretrazuje oglase za nekretnine.",
  parameters: nekretnineSchema,
  prompt: `{{input}}`,
  outputSchema: nekretnineSchema,
};
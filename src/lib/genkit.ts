import { configureGenkit } from "@genkit-ai/core";
import { firebase } from "@genkit-ai/firebase";
import { vertexAI } from "@genkit-ai/vertexai";

configureGenkit({
  plugins: [
    firebase({
      projectId: "gde-kako-rs",
      location: "europe-central2"
    }),
    vertexAI({
      location: "europe-central2"
    })
  ]
});
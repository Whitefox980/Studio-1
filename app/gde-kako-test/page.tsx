// src/app/gde-kako-test/page.tsx
"use client";
import { testAuth, testAgent } from "@/lib/tests";

export default function TestPage() {
  return (
    <div className="space-y-4 p-4">
      <button onClick={testAuth} className="p-2 bg-blue-500">
        Testiraj Auth
      </button>
      <button onClick={() => testAgent("Beograd")} className="p-2 bg-green-500">
        Testiraj Agenta
      </button>
    </div>
  );
}
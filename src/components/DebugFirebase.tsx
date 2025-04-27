tsx
// src/components/DebugFirebase.tsx
"use client";
import { app } from "@/lib/firebase";

export function DebugFirebase() {
  return (
    <div className="fixed bottom-4 right-4 bg-red-100 p-2">
      <h3>Debug Panel</h3>
      <p>Firebase app: {app?.name || "Nije inicijalizovan"}</p>
      <button
        onClick={() => console.log(app)}
        className="bg-blue-500 text-white px-2 py-1 mt-2"
      >
        Loguj Firebase
      </button>
    </div>
  );
}
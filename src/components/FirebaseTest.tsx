// src/components/FirebaseTest.tsx
"use client";
import { app } from "@/lib/firebase";
import { useEffect } from "react";

export default function FirebaseTest() {
  useEffect(() => {
    console.log("Firebase app initialized:", app.name);
  }, []);

  return <div>Firebase test component</div>;
}
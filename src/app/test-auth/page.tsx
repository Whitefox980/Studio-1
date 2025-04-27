// src/app/test-auth/page.tsx
"use client";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function TestAuth() {
  const testLogin = () => signInWithEmailAndPassword(auth, "test@test.com", "test123");
  return <button onClick={testLogin} className="bg-red-500 p-4">TEST LOGIN</button>;
}
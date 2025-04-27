// src/app/login/page.tsx
"use client";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Login() {
  const login = () => signInWithPopup(auth, new GoogleAuthProvider());
  return <button onClick={login}>Prijavi se sa Google</button>;
}
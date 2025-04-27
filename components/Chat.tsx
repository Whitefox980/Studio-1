tsx
"use client";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export function Chat() {
  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      text: "Ćao!",
      timestamp: serverTimestamp()
    });
  };
  
  return <button onClick={sendMessage}>Pošalji poruku</button>;
}
tsx
"use client";
import { db } from "@/lib/firebase";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");

  // 👂 Slušaj promene u Firestore-u
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // ✉️ Pošalji poruku
  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      text: newMsg,
      timestamp: serverTimestamp()
    });
    setNewMsg("");
  };

  return (
    <div>
      <div>
        {messages.map(msg => (
          <p key={msg.id}>{msg.text}</p>
        ))}
      </div>
      <input type="text" value={newMsg} onChange={(e) => setNewMsg(e.target.value)} />
      <button onClick={sendMessage}>Pošalji</button>
    </div>
  );
}
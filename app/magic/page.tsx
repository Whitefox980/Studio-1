tsx
"use client";
import { useEffect } from "react";

export default function ProradiBre() {
  useEffect(() => {
    const audio = new Audio("https://www.myinstants.com/media/sounds/profesor-bala-1.mp3");  // 👈 Ovde stavi neki epic sound efekat
    audio.play();
  }, []);

  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
        PRORADI BRE JOŠ!
      </h1>
      <button 
        onClick={() => window.location.reload()}
        className="mt-10 px-8 py-4 bg-yellow-400 hover:bg-yellow-500 rounded-full text-black font-bold">
        Osveži
      </button>
    </div>
  );
}
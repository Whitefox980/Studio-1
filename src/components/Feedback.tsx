// src/components/Feedback.tsx
   "use client";
   import { rateSearch } from "@/lib/api/feedback";

   export function Feedback({ searchId }: { searchId: string }) {
     return (
       <div>
         <button onClick={() => rateSearch(searchId, 5)}>👍</button>
         <button onClick={() => rateSearch(searchId, 1)}>👎</button>
       </div>
     );
   }
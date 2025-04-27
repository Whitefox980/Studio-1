
// src/lib/fake-firebase.ts
export const fakeAuth = {
  currentUser: {
    displayName: "Haker iz Beograda",
    email: "jebes-beli-ekran@firebase.com"
  }
};

// U komponentama koristite:
// import { fakeAuth } from "@/lib/fake-firebase";
// console.log(fakeAuth.currentUser); // U
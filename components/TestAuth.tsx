   'use client';
   import { auth } from '@/lib/firebase-client';
   import { signInWithEmailAndPassword } from 'firebase/auth';

   export default function TestAuth() {
     const login = async () => {
       await signInWithEmailAndPassword(auth, 'test@example.com', 'password');
     };
     // ...
   }
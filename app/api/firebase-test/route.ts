import { NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { cert } from 'firebase-admin/app';

// Inicijalizacija samo ako već nije
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: "your-service-account@project-id.iam.gserviceaccount.com",
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/
/g, '
')
    })
  });
}

export async function GET() {
  try {
    const auth = getAuth();
    // Primer: Dohvatanje liste korisnika
    const users = await auth.listUsers();
    return NextResponse.json({ users: users.users.length });
  } catch (error) {
    return NextResponse.json(
      { error: "Firebase Admin greška: " + error.message },
      { status: 500 }
    );
  }
}
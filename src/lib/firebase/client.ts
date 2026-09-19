"use client";

import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// The admin panel is a client-rendered tool — everything that touches these
// exports runs inside useEffect/event handlers, never during render. Guarding
// init to the browser avoids Next.js's SSR/prerender pass initializing the
// Firebase SDK on the server, where no real config is available.
const app: FirebaseApp | null =
  typeof window !== "undefined"
    ? getApps().length > 0
      ? getApps()[0]
      : initializeApp(firebaseConfig)
    : null;

export const auth = (app ? getAuth(app) : null) as Auth;
export const db = (app ? getFirestore(app) : null) as Firestore;

// Firebase Client Modular Initialization & Environment Validation

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export interface FirebaseValidationResult {
  isConfigured: boolean;
  missingKeys: string[];
  errorMessage?: string;
}

/**
 * Validates whether required NEXT_PUBLIC_FIREBASE_* variables are provided and not placeholders.
 */
export function validateFirebaseConfig(): FirebaseValidationResult {
  const required = [
    { key: "NEXT_PUBLIC_FIREBASE_API_KEY", val: process.env.NEXT_PUBLIC_FIREBASE_API_KEY },
    { key: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", val: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN },
    { key: "NEXT_PUBLIC_FIREBASE_PROJECT_ID", val: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID },
    { key: "NEXT_PUBLIC_FIREBASE_APP_ID", val: process.env.NEXT_PUBLIC_FIREBASE_APP_ID },
  ];

  const missing = required
    .filter((r) => !r.val || r.val.trim() === "" || r.val.includes("your_"))
    .map((r) => r.key);

  if (missing.length > 0) {
    return {
      isConfigured: false,
      missingKeys: missing,
      errorMessage: `Firebase is not yet configured. Missing or placeholder environment variables: ${missing.join(", ")}. Please add your existing Firebase project configuration to .env.local.`,
    };
  }

  return {
    isConfigured: true,
    missingKeys: [],
  };
}

export const isFirebaseConfigured = (): boolean => {
  return validateFirebaseConfig().isConfigured;
};

/**
 * Safely initialize or retrieve the FirebaseApp singleton.
 * Returns null if environment variables are not configured.
 */
export function getFirebaseApp(): FirebaseApp | null {
  const validation = validateFirebaseConfig();
  if (!validation.isConfigured) {
    return null;
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  });
}

/**
 * Safely retrieve the Firebase Auth instance. Returns null if not configured.
 */
export function getFirebaseAuth(): Auth | null {
  const app = getFirebaseApp();
  if (!app) return null;
  return getAuth(app);
}

/**
 * Safely retrieve the Cloud Firestore instance. Returns null if not configured.
 */
export function getFirebaseFirestore(): Firestore | null {
  const app = getFirebaseApp();
  if (!app) return null;
  return getFirestore(app);
}

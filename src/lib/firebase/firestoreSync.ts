// Cloud Firestore Background Synchronization Service

import { doc, setDoc } from "firebase/firestore";
import { getFirebaseFirestore, getFirebaseAuth, isFirebaseConfigured } from "./config";
import { SyncQueueItem } from "@/lib/storage/offline";

/**
 * Pushes queued state changes and verified exam scores to Cloud Firestore
 * conforming to strict security rules.
 */
export async function syncItemToFirestore(item: SyncQueueItem): Promise<boolean> {
  if (!isFirebaseConfigured()) {
    // When Firebase is not configured, operations remain local
    return true;
  }

  const db = getFirebaseFirestore();
  const auth = getFirebaseAuth();

  if (!db || !auth) {
    return true;
  }

  const currentUser = auth.currentUser;
  if (!currentUser) {
    // Retain in queue until user has authenticated with Firebase
    return false;
  }

  try {
    if (item.collection === "users") {
      const userRef = doc(db, "users", currentUser.uid);
      // Ensure role cannot be elevated client-side
      const safePayload = { ...item.payload };
      delete (safePayload as Record<string, unknown>).role;
      delete (safePayload as Record<string, unknown>).admin;
      delete (safePayload as Record<string, unknown>).customClaims;

      await setDoc(userRef, safePayload, { merge: true });
      return true;
    }

    if (item.collection === "mockScores") {
      const examId =
        (item.payload.id as string) ||
        (item.payload.examId as string) ||
        item.id.replace(/[^a-zA-Z0-9_-]/g, "_");

      const scoreRef = doc(db, "users", currentUser.uid, "mockScores", examId);
      await setDoc(scoreRef, item.payload, { merge: true });
      return true;
    }

    // Default: for other student collections (notes, progress)
    return true;
  } catch (err: unknown) {
    console.warn("Firestore sync dispatch failed:", err);
    return false;
  }
}

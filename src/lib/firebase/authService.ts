// Firebase Authentication Service (Modular SDK & Custom Claims)

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  getIdTokenResult,
  User as FirebaseUser,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured, validateFirebaseConfig } from "./config";

export interface AuthResult {
  success: boolean;
  user?: {
    uid: string;
    email: string;
    displayName: string;
    role: "student" | "admin";
    emailVerified: boolean;
  };
  error?: string;
}

/**
 * Register a new learner with email and password.
 * Public registration NEVER grants admin privileges (enforces 'student' role).
 */
export async function firebaseRegister(
  email: string,
  pass: string,
  displayName: string
): Promise<AuthResult> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return {
      success: false,
      error: validateFirebaseConfig().errorMessage || "Firebase Auth is not configured.",
    };
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    if (displayName) {
      await updateProfile(cred.user, { displayName: displayName.trim() });
    }

    // Send email verification
    try {
      await sendEmailVerification(cred.user);
    } catch {
      // Non-blocking if verification dispatch fails
    }

    return {
      success: true,
      user: {
        uid: cred.user.uid,
        email: cred.user.email || email,
        displayName: displayName || cred.user.displayName || "Japanese Learner",
        role: "student", // Strictly student
        emailVerified: cred.user.emailVerified,
      },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Registration failed";
    return { success: false, error: msg };
  }
}

/**
 * Sign in using Firebase Authentication.
 * Admin role is determined EXCLUSIVELY by trusted Firebase Custom Claims on the ID token.
 */
export async function firebaseLogin(email: string, pass: string): Promise<AuthResult> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return {
      success: false,
      error: validateFirebaseConfig().errorMessage || "Firebase Auth is not configured.",
    };
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
    
    // Force refresh token to inspect verified server-side Custom Claims
    const tokenResult = await getIdTokenResult(cred.user, true);
    const isAdmin =
      tokenResult.claims.role === "admin" ||
      tokenResult.claims.admin === true;

    const role: "student" | "admin" = isAdmin ? "admin" : "student";

    return {
      success: true,
      user: {
        uid: cred.user.uid,
        email: cred.user.email || email,
        displayName: cred.user.displayName || email.split("@")[0],
        role,
        emailVerified: cred.user.emailVerified,
      },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Authentication failed";
    return { success: false, error: msg };
  }
}

/**
 * Sign out of Firebase Authentication.
 */
export async function firebaseLogout(): Promise<{ success: boolean; error?: string }> {
  const auth = getFirebaseAuth();
  if (!auth) return { success: true };

  try {
    await signOut(auth);
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Logout failed";
    return { success: false, error: msg };
  }
}

/**
 * Send password reset email via Firebase Authentication.
 */
export async function firebaseResetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  const auth = getFirebaseAuth();
  if (!auth) {
    return {
      success: false,
      error: validateFirebaseConfig().errorMessage || "Firebase Auth is not configured.",
    };
  }

  try {
    await sendPasswordResetEmail(auth, email.trim());
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Password reset failed";
    return { success: false, error: msg };
  }
}

/**
 * Subscribe to Firebase onAuthStateChanged with Custom Claim extraction.
 */
export function subscribeToAuthState(
  callback: (user: {
    uid: string;
    email: string;
    displayName: string;
    role: "student" | "admin";
    emailVerified: boolean;
    token?: string;
  } | null) => void
): () => void {
  const auth = getFirebaseAuth();
  if (!auth) {
    // Return no-op cleanup if Firebase is not yet configured
    return () => {};
  }

  return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    if (!firebaseUser) {
      callback(null);
      return;
    }

    try {
      const tokenResult = await getIdTokenResult(firebaseUser);
      const isAdmin =
        tokenResult.claims.role === "admin" ||
        tokenResult.claims.admin === true;

      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: firebaseUser.displayName || "",
        role: isAdmin ? "admin" : "student",
        emailVerified: firebaseUser.emailVerified,
        token: tokenResult.token,
      });
    } catch {
      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        displayName: firebaseUser.displayName || "",
        role: "student",
        emailVerified: firebaseUser.emailVerified,
      });
    }
  });
}


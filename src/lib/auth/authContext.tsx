"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getStudentProfile, saveStudentProfile, StudentProfile } from "@/lib/storage/studentState";

export interface AuthUser {
  name: string;
  email: string;
  role: "student" | "admin";
  targetLevel: string;
  nativeLanguage: string;
}

interface AuthContextType {
  user: AuthUser | null;
  role: "student" | "admin" | null;
  loading: boolean;
  login: (email: string, role?: "student" | "admin", name?: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  login: async () => false,
  logout: () => {},
  updateUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const prof = getStudentProfile();
      return {
        name: prof.name || "Japanese Learner",
        email: prof.email || "student@nihongosetu.org",
        role: prof.role || "student",
        targetLevel: prof.targetLevel || "N5",
        nativeLanguage: prof.nativeLanguage || "en",
      };
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, role: "student" | "admin" = "student", name?: string) => {
    setLoading(true);
    try {
      const existing = getStudentProfile();
      const updated: StudentProfile = {
        ...existing,
        email,
        name: name || email.split("@")[0] || "Japanese Learner",
        role,
      };
      saveStudentProfile(updated);
      if (typeof document !== "undefined") {
        document.cookie = `nihongo_session=${encodeURIComponent(JSON.stringify({
          name: updated.name,
          email: updated.email,
          role: updated.role,
        }))}; path=/; SameSite=Lax; max-age=604800`;
      }
      setUser({
        name: updated.name,
        email: updated.email,
        role: updated.role,
        targetLevel: updated.targetLevel,
        nativeLanguage: updated.nativeLanguage,
      });
      setLoading(false);
      return true;
    } catch {
      setLoading(false);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("nihongo_user");
      if (typeof document !== "undefined") {
        document.cookie = "nihongo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      }
    } catch {
      // ignore
    }
    setUser(null);
  }, []);

  const updateUser = useCallback((data: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      try {
        const existing = getStudentProfile();
        saveStudentProfile({ ...existing, ...updated });
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

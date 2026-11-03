"use client";

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  targetLevel: string;
  nativeLanguage: string;
  streak: number;
  devicesCount: number;
  status: "active" | "suspended";
  joinedDate: string;
  lastActive: string;
  examsTaken: number;
  bestScore: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  ip: string;
  severity: "info" | "warning" | "security";
  details: string;
}

export interface AdminSystemSettings {
  maxDevicesPerStudent: number;
  passingScorePercentage: number;
  examDurationMinutes: number;
  maintenanceMode: boolean;
  registrationOpen: boolean;
  primaryAdminEmail: string;
}

const DEFAULT_STUDENTS: StudentRecord[] = [
  {
    id: "stu-101",
    name: "Arun Kumar",
    email: "arun.kumar@example.com",
    targetLevel: "N5",
    nativeLanguage: "ta",
    streak: 12,
    devicesCount: 2,
    status: "active",
    joinedDate: "2026-10-15",
    lastActive: "Today",
    examsTaken: 4,
    bestScore: 90,
  },
  {
    id: "stu-102",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    targetLevel: "N4",
    nativeLanguage: "hi",
    streak: 28,
    devicesCount: 1,
    status: "active",
    joinedDate: "2026-09-01",
    lastActive: "Today",
    examsTaken: 9,
    bestScore: 95,
  },
  {
    id: "stu-103",
    name: "Karthik Reddy",
    email: "karthik.r@example.com",
    targetLevel: "N3",
    nativeLanguage: "te",
    streak: 5,
    devicesCount: 3,
    status: "active",
    joinedDate: "2026-10-02",
    lastActive: "Yesterday",
    examsTaken: 3,
    bestScore: 75,
  },
  {
    id: "stu-104",
    name: "Anjali Menon",
    email: "anjali.menon@example.com",
    targetLevel: "N2",
    nativeLanguage: "ml",
    streak: 45,
    devicesCount: 2,
    status: "active",
    joinedDate: "2026-08-11",
    lastActive: "Today",
    examsTaken: 14,
    bestScore: 85,
  },
  {
    id: "stu-105",
    name: "Vikram Patil",
    email: "vikram.patil@example.com",
    targetLevel: "N1",
    nativeLanguage: "mr",
    streak: 0,
    devicesCount: 1,
    status: "suspended",
    joinedDate: "2026-07-20",
    lastActive: "3 weeks ago",
    examsTaken: 2,
    bestScore: 55,
  },
];

const DEFAULT_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-1",
    timestamp: "2026-11-03 20:45:12",
    action: "ADMIN_LOGIN",
    actor: "admin@nihongosetu.org",
    ip: "127.0.0.1",
    severity: "info",
    details: "Master administrator successfully authenticated from authorized workstation.",
  },
  {
    id: "log-2",
    timestamp: "2026-11-03 19:12:00",
    action: "EXAM_BANK_SYNC",
    actor: "System Engine",
    ip: "10.0.4.12",
    severity: "info",
    details: "Synchronized 100 questions across N5 through N1 with passing threshold at 70%.",
  },
  {
    id: "log-3",
    timestamp: "2026-11-03 17:30:45",
    action: "DEVICE_LIMIT_VERIFIED",
    actor: "DeviceGuard Agent",
    ip: "192.168.1.100",
    severity: "security",
    details: "Enforced max 3 concurrent device authorization policy for student Priya Sharma.",
  },
  {
    id: "log-4",
    timestamp: "2026-11-03 14:05:22",
    action: "VOCABULARY_TRANSLATION_UPDATE",
    actor: "admin@nihongosetu.org",
    ip: "127.0.0.1",
    severity: "info",
    details: "Updated Tamil and Telugu definitions for 30 foundational vocabulary items.",
  },
];

const DEFAULT_SETTINGS: AdminSystemSettings = {
  maxDevicesPerStudent: 3,
  passingScorePercentage: 70,
  examDurationMinutes: 25,
  maintenanceMode: false,
  registrationOpen: true,
  primaryAdminEmail: "admin@nihongosetu.org",
};

export function getAdminStudents(): StudentRecord[] {
  if (typeof window === "undefined") return DEFAULT_STUDENTS;
  try {
    const raw = localStorage.getItem("nihongo_admin_students");
    if (!raw) {
      localStorage.setItem("nihongo_admin_students", JSON.stringify(DEFAULT_STUDENTS));
      return DEFAULT_STUDENTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_STUDENTS;
  }
}

export function saveAdminStudents(students: StudentRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("nihongo_admin_students", JSON.stringify(students));
  } catch {
    // ignore
  }
}

export function getAdminAuditLogs(): AuditLogEntry[] {
  if (typeof window === "undefined") return DEFAULT_AUDIT_LOGS;
  try {
    const raw = localStorage.getItem("nihongo_admin_logs");
    if (!raw) {
      localStorage.setItem("nihongo_admin_logs", JSON.stringify(DEFAULT_AUDIT_LOGS));
      return DEFAULT_AUDIT_LOGS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_AUDIT_LOGS;
  }
}

export function logAdminAction(action: string, details: string, severity: "info" | "warning" | "security" = "info"): void {
  if (typeof window === "undefined") return;
  try {
    const logs = getAdminAuditLogs();
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").split(".")[0],
      action,
      actor: "admin@nihongosetu.org",
      ip: "127.0.0.1",
      severity,
      details,
    };
    logs.unshift(newEntry);
    localStorage.setItem("nihongo_admin_logs", JSON.stringify(logs.slice(0, 50)));
  } catch {
    // ignore
  }
}

export function getAdminSettings(): AdminSystemSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem("nihongo_admin_settings");
    if (!raw) {
      localStorage.setItem("nihongo_admin_settings", JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAdminSettings(settings: AdminSystemSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("nihongo_admin_settings", JSON.stringify(settings));
  } catch {
    // ignore
  }
}

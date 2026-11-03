"use client";

import React, { useState, useMemo } from "react";
import {
  getAdminStudents,
  saveAdminStudents,
  logAdminAction,
  StudentRecord,
} from "@/lib/storage/adminState";
import {
  Users,
  Search,
  UserPlus,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Filter,
  Check,
} from "lucide-react";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentRecord[]>(() => getAdminStudents());
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Student form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLevel, setNewLevel] = useState("N5");
  const [newLang, setNewLang] = useState("ta");

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesLevel = levelFilter === "All" || s.targetLevel === levelFilter;
      if (!matchesLevel) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    });
  }, [students, searchQuery, levelFilter]);

  const handleToggleStatus = (id: string) => {
    const updated = students.map((s) => {
      if (s.id === id) {
        const nextStatus: "active" | "suspended" = s.status === "active" ? "suspended" : "active";
        logAdminAction(
          "STUDENT_STATUS_CHANGE",
          `Changed status of student ${s.name} (${s.email}) to ${nextStatus}.`,
          "warning"
        );
        return { ...s, status: nextStatus };
      }
      return s;
    });

    setStudents(updated);
    saveAdminStudents(updated);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newStudent: StudentRecord = {
      id: `stu-${Date.now().toString().slice(-4)}`,
      name: newName.trim(),
      email: newEmail.trim(),
      targetLevel: newLevel,
      nativeLanguage: newLang,
      streak: 1,
      devicesCount: 1,
      status: "active",
      joinedDate: new Date().toISOString().split("T")[0],
      lastActive: "Today",
      examsTaken: 0,
      bestScore: 0,
    };

    const updated = [newStudent, ...students];
    setStudents(updated);
    saveAdminStudents(updated);
    logAdminAction("STUDENT_ENROLLED", `Manually enrolled student ${newName} (${newEmail}).`, "info");

    setNewName("");
    setNewEmail("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
            <Users className="w-3.5 h-3.5" />
            <span>Learner Directory & Sessions</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
            Student Management & Device Allocation
          </h1>
          <p className="text-xs text-[#E8E0D5]/70 mt-1">
            Monitor student certification trajectories and enforce the maximum 3 concurrent devices security policy.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C83C50] hover:bg-[#B03244] text-[#FFFFFF] text-xs font-bold shadow-lg shadow-[#C83C50]/20 flex items-center space-x-2 transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Enroll New Student</span>
        </button>
      </div>

      {/* Control Bar */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8E0D5]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student by name or email..."
            className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl pl-10 pr-4 py-2 text-xs text-[#FFFFFF] placeholder-[#E8E0D5]/40 focus:outline-none focus:border-[#C83C50]"
          />
        </div>

        {/* Level Filter */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-[#E8E0D5]/60" />
          <span className="text-xs text-[#E8E0D5]/60 font-medium">Level:</span>
          {["All", "N5", "N4", "N3", "N2", "N1"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                levelFilter === lvl
                  ? "bg-[#C83C50] text-[#FFFFFF]"
                  : "bg-[#0B1323] text-[#E8E0D5]/70 hover:text-[#FFFFFF]"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[#E8E0D5]/60 border-b border-[#E8E0D5]/10">
              <tr>
                <th className="py-3 px-3">Student</th>
                <th className="py-3 px-3">Target</th>
                <th className="py-3 px-3">Native Lang</th>
                <th className="py-3 px-3">Streak</th>
                <th className="py-3 px-3">Active Devices (Max 3)</th>
                <th className="py-3 px-3">Exams / Best</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D5]/10">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-[#E8E0D5]/5 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-[#FFFFFF]">{s.name}</div>
                    <div className="text-[11px] text-[#E8E0D5]/60 font-mono">{s.email}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-[#C83C50] bg-[#C83C50]/15 px-2 py-0.5 rounded">
                      {s.targetLevel}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 uppercase font-mono text-[#E8E0D5]/80">
                    {s.nativeLanguage}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-amber-400">
                    {s.streak}d
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center space-x-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-[#E8E0D5]/60" />
                      <span className="font-bold text-[#FFFFFF]">{s.devicesCount} / 3</span>
                      {s.devicesCount === 3 && (
                        <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-400 font-semibold">
                          MAX
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-[#E8E0D5]/80">
                    {s.examsTaken} tests · <strong className="text-[#FFFFFF]">{s.bestScore}%</strong>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.status === "active"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {s.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleToggleStatus(s.id)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                        s.status === "active"
                          ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-300"
                          : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {s.status === "active" ? "Suspend" : "Reactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-bold text-[#FFFFFF]">Enroll New Student</h3>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#E8E0D5] mb-1.5">
                  Student Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Deepak Raj"
                  className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3.5 py-2.5 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#C83C50]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E8E0D5] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="deepak@example.com"
                  className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3.5 py-2.5 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#C83C50]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1.5">
                    Target Level
                  </label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                  >
                    {["N5", "N4", "N3", "N2", "N1"].map((lvl) => (
                      <option key={lvl} value={lvl} className="bg-[#101C35]">
                        JLPT {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1.5">
                    Native Language
                  </label>
                  <select
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value)}
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                  >
                    <option value="ta">Tamil (தமிழ்)</option>
                    <option value="hi">Hindi (हिन्दी)</option>
                    <option value="te">Telugu (తెలుగు)</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E8E0D5]/15">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#E8E0D5]/70 hover:text-[#FFFFFF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C83C50] text-[#FFFFFF] text-xs font-bold hover:bg-[#B03244] shadow"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

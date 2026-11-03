"use client";

import React, { useState, useEffect } from "react";
import { getStudentProfile, saveStudentProfile, StudentProfile } from "@/lib/storage/studentState";
import { LANGUAGES } from "@/components/public/Navbar";
import {
  Settings,
  Download,
  Upload,
  Trash2,
  Globe,
  Database,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

export default function StudentSettingsPage() {
  const [profile, setProfile] = useState<StudentProfile>(() => getStudentProfile());
  const [selectedLang, setSelectedLang] = useState(() => getStudentProfile().nativeLanguage || "en");
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleLanguageChange = (code: string) => {
    setSelectedLang(code);
    if (!profile) return;
    const updated = { ...profile, nativeLanguage: code };
    setProfile(updated);
    saveStudentProfile(updated);
    setStatusMessage({ type: "success", text: "Native language preference updated." });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleExportBackup = () => {
    if (!profile) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nihongosetu_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setStatusMessage({ type: "success", text: "Backup file generated and downloaded successfully." });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.email && parsed.learnedKanji !== undefined) {
          saveStudentProfile(parsed);
          setProfile(parsed);
          setSelectedLang(parsed.nativeLanguage || "en");
          setStatusMessage({ type: "success", text: "Backup restored successfully!" });
        } else {
          setStatusMessage({ type: "error", text: "Invalid backup file structure." });
        }
      } catch {
        setStatusMessage({ type: "error", text: "Failed to parse JSON file." });
      }
      setTimeout(() => setStatusMessage(null), 3000);
    };
    reader.readAsText(file);
  };

  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset your study streak and mastered items? This cannot be undone.")) {
      const resetProfile: StudentProfile = {
        name: profile?.name || "Japanese Learner",
        email: profile?.email || "student@nihongosetu.org",
        role: "student",
        targetLevel: "N5",
        nativeLanguage: selectedLang,
        streak: 1,
        lastActive: new Date().toISOString(),
        learnedKanji: [],
        learnedVocab: [],
        mockScores: [],
      };
      saveStudentProfile(resetProfile);
      setProfile(resetProfile);
      setStatusMessage({ type: "success", text: "Study progress has been reset." });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
          <Settings className="w-3.5 h-3.5" />
          <span>Preferences & Data Sovereignty</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
          Settings & Offline Storage
        </h1>
        <p className="text-xs text-[#E8E0D5]/70 mt-1">
          Manage native language display, export local study backups, and monitor active sessions.
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center space-x-2 shadow-lg ${
            statusMessage.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/15 border-rose-500/30 text-rose-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Language Preference Section */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center space-x-3 text-[#C83C50]">
          <Globe className="w-5 h-5" />
          <h2 className="text-base font-bold text-[#FFFFFF]">
            1. Preferred Native Language
          </h2>
        </div>
        <p className="text-xs text-[#E8E0D5]/70 leading-relaxed">
          Select your native tongue. Vocabulary definitions, grammar descriptions, and exam navigation will reflect this setting.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => handleLanguageChange(l.code)}
              className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all ${
                selectedLang === l.code
                  ? "bg-[#C83C50] text-[#FFFFFF] shadow-md shadow-[#C83C50]/20 border-transparent"
                  : "bg-[#0B1323] text-[#E8E0D5] border-[#E8E0D5]/15 hover:border-[#E8E0D5]/30"
              }`}
            >
              <div>{l.name}</div>
              <div className="text-[10px] opacity-60 uppercase mt-0.5">{l.code}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Offline Data & Backup Section */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center space-x-3 text-[#C83C50]">
          <Database className="w-5 h-5" />
          <h2 className="text-base font-bold text-[#FFFFFF]">
            2. Offline Data Storage & JSON Backups
          </h2>
        </div>
        <p className="text-xs text-[#E8E0D5]/70 leading-relaxed">
          NihongoSetu operates offline-first. Your streak, mastered kanji, and mock test scores are stored locally on your device in <code className="text-[#C83C50] bg-[#0B1323] px-1 py-0.5 rounded">localStorage.nihongo_user</code> and the legacy <code className="text-[#C83C50] bg-[#0B1323] px-1 py-0.5 rounded">localStorage.ns</code>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Export */}
          <div className="p-5 rounded-2xl bg-[#0B1323] border border-[#E8E0D5]/15 space-y-3">
            <h3 className="text-xs font-bold text-[#FFFFFF] flex items-center space-x-2">
              <Download className="w-4 h-4 text-[#C83C50]" />
              <span>Export Progress Backup</span>
            </h3>
            <p className="text-[11px] text-[#E8E0D5]/70 leading-relaxed">
              Download your complete student portfolio as a JSON file to transfer between devices or safeguard your history.
            </p>
            <button
              onClick={handleExportBackup}
              className="w-full py-2.5 px-4 rounded-xl bg-[#C83C50] hover:bg-[#B03244] text-[#FFFFFF] text-xs font-bold shadow-md shadow-[#C83C50]/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          {/* Import */}
          <div className="p-5 rounded-2xl bg-[#0B1323] border border-[#E8E0D5]/15 space-y-3">
            <h3 className="text-xs font-bold text-[#FFFFFF] flex items-center space-x-2">
              <Upload className="w-4 h-4 text-blue-400" />
              <span>Restore from Backup</span>
            </h3>
            <p className="text-[11px] text-[#E8E0D5]/70 leading-relaxed">
              Upload a previously exported NihongoSetu JSON backup to restore your streaks, scores, and mastered items.
            </p>
            <label className="w-full py-2.5 px-4 rounded-xl bg-[#E8E0D5]/10 hover:bg-[#E8E0D5]/20 text-[#E8E0D5] text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer border border-[#E8E0D5]/20">
              <Upload className="w-3.5 h-3.5" />
              <span>Select Backup File</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Concurrent Device Management (Rule of 3) */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center space-x-3 text-[#C83C50]">
          <Smartphone className="w-5 h-5" />
          <h2 className="text-base font-bold text-[#FFFFFF]">
            3. Active Device Allocation (Maximum 3 Concurrent Devices)
          </h2>
        </div>
        <p className="text-xs text-[#E8E0D5]/70 leading-relaxed">
          Under institutional fair-use rules, a single student account may remain authorized on up to three concurrent devices.
        </p>

        <div className="space-y-2 pt-2">
          <div className="p-3.5 rounded-xl bg-[#0B1323] border border-emerald-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div>
                <span className="font-bold text-[#FFFFFF]">This Device (Current Session)</span>
                <p className="text-[10px] text-[#E8E0D5]/60">Windows Desktop · Chrome / Edge Browser</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
              ACTIVE
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B1323] border border-[#E8E0D5]/15 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-[#E8E0D5]/40" />
              <div>
                <span className="font-bold text-[#FFFFFF]">Mobile Companion App</span>
                <p className="text-[10px] text-[#E8E0D5]/60">Last synced 2 days ago · Android / iOS</p>
              </div>
            </div>
            <span className="text-[10px] text-[#E8E0D5]/50">DEVICE 2 OF 3</span>
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="bg-[#101C35] border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h2 className="text-base font-bold text-rose-400 flex items-center space-x-2">
          <Trash2 className="w-5 h-5" />
          <span>Danger Zone: Reset Student Progress</span>
        </h2>
        <p className="text-xs text-[#E8E0D5]/70 leading-relaxed">
          Permanently clear your local streak counter, mastered kanji, mastered vocabulary, and historical mock examination scores.
        </p>
        <button
          onClick={handleResetProgress}
          className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all flex items-center space-x-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Study Progress</span>
        </button>
      </div>
    </div>
  );
}

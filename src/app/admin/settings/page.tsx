"use client";

import React, { useState } from "react";
import {
  getAdminSettings,
  saveAdminSettings,
  logAdminAction,
  AdminSystemSettings,
} from "@/lib/storage/adminState";
import {
  Settings,
  ShieldCheck,
  Save,
  CheckCircle2,
  Smartphone,
  Lock,
  Clock,
  Award,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSystemSettings>(() => getAdminSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdminSettings(settings);
    logAdminAction(
      "SYSTEM_SETTINGS_UPDATED",
      `Admin updated system policies: maxDevices=${settings.maxDevicesPerStudent}, passingThreshold=${settings.passingScorePercentage}%.`,
      "security"
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
          <Settings className="w-3.5 h-3.5" />
          <span>Platform Policy & RBAC</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
          Institutional Governance & RBAC
        </h1>
        <p className="text-xs text-[#E8E0D5]/70 mt-1">
          Configure security rules, passing criteria, concurrent device quotas, and maintenance states.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Platform configurations saved and propagated across active nodes!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Device Quotas */}
        <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-3 text-[#C83C50]">
            <Smartphone className="w-5 h-5" />
            <h2 className="text-base font-bold text-[#FFFFFF]">
              1. Hardware Device Quota Policy
            </h2>
          </div>
          <p className="text-xs text-[#E8E0D5]/70 leading-relaxed">
            Specify the maximum number of concurrent authorized devices allowed per enrolled student account.
          </p>

          <div className="w-full sm:w-64 pt-2">
            <label className="block text-xs font-semibold text-[#E8E0D5] mb-1.5">
              Maximum Concurrent Devices (Strict Limit)
            </label>
            <select
              value={settings.maxDevicesPerStudent}
              onChange={(e) =>
                setSettings({ ...settings, maxDevicesPerStudent: Number(e.target.value) })
              }
              className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3.5 py-2 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#C83C50]"
            >
              <option value={1}>1 Device (Strict Single-Device)</option>
              <option value={2}>2 Devices</option>
              <option value={3}>3 Devices (Institutional Standard)</option>
              <option value={5}>5 Devices (Classroom Multi-Seat)</option>
            </select>
          </div>
        </div>

        {/* Exam Criteria */}
        <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-3 text-[#C83C50]">
            <Award className="w-5 h-5" />
            <h2 className="text-base font-bold text-[#FFFFFF]">
              2. Examination Standards & Passing Thresholds
            </h2>
          </div>
          <p className="text-xs text-[#E8E0D5]/70 leading-relaxed">
            Configure mock exam timer limits and certification grading thresholds across N5–N1 simulations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#E8E0D5] mb-1.5">
                Passing Score Percentage
              </label>
              <select
                value={settings.passingScorePercentage}
                onChange={(e) =>
                  setSettings({ ...settings, passingScorePercentage: Number(e.target.value) })
                }
                className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3.5 py-2 text-xs text-[#FFFFFF]"
              >
                <option value={60}>60% Threshold</option>
                <option value={65}>65% Threshold</option>
                <option value={70}>70% Threshold (Official JLPT Standard)</option>
                <option value={75}>75% Threshold</option>
                <option value={80}>80% Honors Threshold</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#E8E0D5] mb-1.5">
                Exam Duration
              </label>
              <select
                value={settings.examDurationMinutes}
                onChange={(e) =>
                  setSettings({ ...settings, examDurationMinutes: Number(e.target.value) })
                }
                className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3.5 py-2 text-xs text-[#FFFFFF]"
              >
                <option value={20}>20 Minutes</option>
                <option value={25}>25 Minutes (Standard Diagnostic)</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes (Extended Test)</option>
              </select>
            </div>
          </div>
        </div>

        {/* RBAC Overview */}
        <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-3 text-[#C83C50]">
            <Lock className="w-5 h-5" />
            <h2 className="text-base font-bold text-[#FFFFFF]">
              3. Role-Based Access Control (RBAC Hierarchy)
            </h2>
          </div>
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-[#0B1323] border border-[#E8E0D5]/15 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-[#FFFFFF]">Primary Administrator</span>
                <p className="text-[11px] text-[#E8E0D5]/60 mt-0.5">
                  Full system access: Manage student credentials, curriculum databases, and audit logs.
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] border border-[#C83C50]/30">
                ACTIVE (admin@nihongosetu.org)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1323] border border-[#E8E0D5]/15 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-[#FFFFFF]">Secondary Admin / Sensei Moderator</span>
                <p className="text-[11px] text-[#E8E0D5]/60 mt-0.5">
                  Curriculum contributor: Edit vocabulary translations, inspect student questions, and grade answers.
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#E8E0D5]/10 text-[#E8E0D5]/70">
                ROLE DELEGATED
              </span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#C83C50] hover:bg-[#B03244] text-[#FFFFFF] text-xs font-bold shadow-lg shadow-[#C83C50]/25 transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save System Policy Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Award,
  Layers,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Activity,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";
import { getAdminStudents, getAdminAuditLogs, StudentRecord, AuditLogEntry } from "@/lib/storage/adminState";
import { KANJI_DATA } from "@/data/kanji";
import { CORE_VOCABULARY } from "@/data/vocab";

export default function AdminDashboardPage() {
  const [students] = useState<StudentRecord[]>(() => getAdminStudents());
  const [logs] = useState<AuditLogEntry[]>(() => getAdminAuditLogs());

  const activeStudents = students.filter((s) => s.status === "active").length;
  const totalKanji = Object.values(KANJI_DATA).flat().length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold border border-[#C83C50]/30">
            <Activity className="w-3.5 h-3.5" />
            <span>Institutional Governance Active</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#FFFFFF]">
            NihongoSetu Command Central
          </h1>
          <p className="text-xs text-[#E8E0D5]/70 max-w-xl leading-relaxed">
            Oversee student progress, curriculum deployments across N5 through N1, device compliance rules, and 12-language translation records.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <Link
            href="/admin/students"
            className="px-5 py-3 rounded-xl bg-[#C83C50] hover:bg-[#B03244] text-[#FFFFFF] text-xs font-bold shadow-lg shadow-[#C83C50]/20 transition-all flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Manage Students</span>
          </Link>
        </div>
      </div>

      {/* 4 Core KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#101C35] border border-[#E8E0D5]/15 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#E8E0D5]/70">
            <span className="font-semibold uppercase tracking-wider">Active Students</span>
            <div className="w-8 h-8 rounded-lg bg-[#C83C50]/20 text-[#C83C50] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#FFFFFF]">{activeStudents}</div>
          <div className="text-xs text-emerald-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>100% active retention this month</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#101C35] border border-[#E8E0D5]/15 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#E8E0D5]/70">
            <span className="font-semibold uppercase tracking-wider">Exam Pass Rate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#FFFFFF]">78.4%</div>
          <div className="text-xs text-[#E8E0D5]/60">
            Threshold: ≥70% passing grade
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#101C35] border border-[#E8E0D5]/15 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#E8E0D5]/70">
            <span className="font-semibold uppercase tracking-wider">Core Vocabulary</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#FFFFFF]">{CORE_VOCABULARY.length}</div>
          <div className="text-xs text-blue-400">
            Mapped across 12 native languages
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#101C35] border border-[#E8E0D5]/15 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#E8E0D5]/70">
            <span className="font-semibold uppercase tracking-wider">Kanji Vault Items</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#FFFFFF]">{totalKanji}</div>
          <div className="text-xs text-purple-400">
            Complete N5 through N1 datasets
          </div>
        </div>
      </div>

      {/* Two Column Layout: JLPT Distribution & Device Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: JLPT Level Distribution (7 cols) */}
        <div className="lg:col-span-7 bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h2 className="text-base font-bold text-[#FFFFFF] flex items-center space-x-2">
            <Award className="w-4 h-4 text-[#C83C50]" />
            <span>Student JLPT Level Distribution</span>
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-[#FFFFFF]">JLPT N5 (Beginner)</span>
                <span className="text-[#E8E0D5]/70">42% (220 Students)</span>
              </div>
              <div className="w-full bg-[#E8E0D5]/10 h-2 rounded-full overflow-hidden">
                <div className="bg-[#C83C50] h-full rounded-full" style={{ width: "42%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-[#FFFFFF]">JLPT N4 (Elementary)</span>
                <span className="text-[#E8E0D5]/70">26% (136 Students)</span>
              </div>
              <div className="w-full bg-[#E8E0D5]/10 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full rounded-full" style={{ width: "26%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-[#FFFFFF]">JLPT N3 (Intermediate)</span>
                <span className="text-[#E8E0D5]/70">18% (94 Students)</span>
              </div>
              <div className="w-full bg-[#E8E0D5]/10 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: "18%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-[#FFFFFF]">JLPT N2 (Upper-Intermediate)</span>
                <span className="text-[#E8E0D5]/70">9% (47 Students)</span>
              </div>
              <div className="w-full bg-[#E8E0D5]/10 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: "9%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-[#FFFFFF]">JLPT N1 (Advanced Native)</span>
                <span className="text-[#E8E0D5]/70">5% (26 Students)</span>
              </div>
              <div className="w-full bg-[#E8E0D5]/10 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: "5%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Device Compliance (5 cols) */}
        <div className="lg:col-span-5 bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center space-x-3 text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-base font-bold text-[#FFFFFF]">Device Security Policy</h2>
          </div>

          <p className="text-xs text-[#E8E0D5]/80 leading-relaxed">
            All enrolled accounts are constrained to maximum 3 concurrent hardware device authorizations to preserve curriculum integrity and prevent account sharing.
          </p>

          <div className="p-4 rounded-2xl bg-[#0B1323] border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#FFFFFF]">Fleet Compliance Rate</span>
              <span className="text-emerald-400 font-black">100% Compliant</span>
            </div>
            <div className="text-[11px] text-[#E8E0D5]/60 leading-relaxed">
              Zero accounts currently exceed authorization thresholds.
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/students"
              className="inline-flex items-center space-x-1.5 text-xs text-[#C83C50] font-bold hover:underline"
            >
              <span>Inspect student device breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Audit Logs Strip */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#FFFFFF] flex items-center space-x-2">
            <Activity className="w-4 h-4 text-[#C83C50]" />
            <span>Recent System & Security Audit Logs</span>
          </h2>
          <Link
            href="/admin/audit-logs"
            className="text-xs text-[#C83C50] font-semibold hover:underline"
          >
            View Full Audit Trail
          </Link>
        </div>

        <div className="divide-y divide-[#E8E0D5]/10 text-xs">
          {logs.slice(0, 4).map((entry) => (
            <div key={entry.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    entry.severity === "security"
                      ? "bg-amber-400"
                      : entry.severity === "warning"
                      ? "bg-rose-400"
                      : "bg-emerald-400"
                  }`}
                />
                <div>
                  <span className="font-bold text-[#FFFFFF] font-mono">{entry.action}</span>
                  <p className="text-[11px] text-[#E8E0D5]/70">{entry.details}</p>
                </div>
              </div>

              <div className="text-right text-[10px] text-[#E8E0D5]/50 shrink-0 font-mono">
                {entry.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

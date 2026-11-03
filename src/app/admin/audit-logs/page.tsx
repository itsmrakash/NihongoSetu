"use client";

import React, { useState, useMemo } from "react";
import { getAdminAuditLogs, AuditLogEntry } from "@/lib/storage/adminState";
import {
  FileText,
  Search,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Info,
  Filter,
} from "lucide-react";

export default function AdminAuditLogsPage() {
  const [logs] = useState<AuditLogEntry[]>(() => getAdminAuditLogs());
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchSeverity = severityFilter === "all" || log.severity === severityFilter;
      if (!matchSeverity) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        log.action.toLowerCase().includes(q) ||
        log.actor.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q)
      );
    });
  }, [logs, searchQuery, severityFilter]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
          <FileText className="w-3.5 h-3.5" />
          <span>Security & Compliance Auditing</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
          Platform Security Audit Trail
        </h1>
        <p className="text-xs text-[#E8E0D5]/70 mt-1">
          Immutable event telemetry for administrator logins, role alterations, device limits, and exam updates.
        </p>
      </div>

      {/* Control Bar */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8E0D5]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action, actor, or details..."
            className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl pl-10 pr-4 py-2 text-xs text-[#FFFFFF] placeholder-[#E8E0D5]/40 focus:outline-none focus:border-[#C83C50]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-[#E8E0D5]/60" />
          <span className="text-xs text-[#E8E0D5]/60 font-medium">Severity:</span>
          {["all", "info", "warning", "security"].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                severityFilter === sev
                  ? "bg-[#C83C50] text-[#FFFFFF]"
                  : "bg-[#0B1323] text-[#E8E0D5]/70 hover:text-[#FFFFFF]"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[#E8E0D5]/60 border-b border-[#E8E0D5]/10">
              <tr>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Action Event</th>
                <th className="py-3 px-3">Actor / Principal</th>
                <th className="py-3 px-3">Client IP</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D5]/10">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#E8E0D5]/5 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-[11px] text-[#E8E0D5]/70 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-3 font-bold font-mono text-[#FFFFFF]">
                    {log.action}
                  </td>
                  <td className="py-3.5 px-3 text-[#E8E0D5]">
                    {log.actor}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[11px] text-[#E8E0D5]/60">
                    {log.ip}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        log.severity === "security"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : log.severity === "warning"
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {log.severity}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-[#E8E0D5]/80 max-w-sm leading-relaxed">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

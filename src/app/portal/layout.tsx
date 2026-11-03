"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PenTool,
  BookMarked,
  Layers,
  Sparkles,
  Headphones,
  Video,
  Award,
  Bot,
  User,
  Settings,
  LogOut,
  Flame,
  Globe,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { getStudentProfile, recordStudyActivity, StudentProfile } from "@/lib/storage/studentState";
import { initOfflineSync } from "@/lib/storage/offline";
import { LANGUAGES } from "@/components/public/Navbar";

const PORTAL_NAV_ITEMS = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/kana", label: "Kana Studio", icon: PenTool },
  { href: "/portal/grammar", label: "Grammar Decks", icon: BookMarked },
  { href: "/portal/vocab", label: "Vocabulary Vault", icon: Layers },
  { href: "/portal/kanji", label: "Kanji Vault", icon: Sparkles },
  { href: "/portal/listening", label: "Listening Studio", icon: Headphones },
  { href: "/portal/videos", label: "Video Academy", icon: Video },
  { href: "/portal/jlpt", label: "JLPT Prep Hub", icon: Award },
  { href: "/portal/sensei", label: "AI Sensei", icon: Bot },
  { href: "/portal/profile", label: "My Profile", icon: User },
  { href: "/portal/settings", label: "Settings", icon: Settings },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile>(() => recordStudyActivity());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const cleanup = initOfflineSync();
    return cleanup;
  }, []);

  const handleLanguageChange = (code: string) => {
    if (!profile) return;
    const updated = { ...profile, nativeLanguage: code };
    setProfile(updated);
    try {
      localStorage.setItem("nihongo_user", JSON.stringify(updated));
    } catch {
      // ignore
    }
    setLangDropdownOpen(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("nihongo_user");
      if (typeof document !== "undefined") {
        document.cookie = "nihongo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      }
    } catch {
      // ignore
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#101C35] text-[#FFFFFF] flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#101C35] border-r border-[#E8E0D5]/15 shrink-0 select-none">
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-[#E8E0D5]/15">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#C83C50] flex items-center justify-center font-bold text-xl text-[#FFFFFF] shadow-lg shadow-[#C83C50]/20 group-hover:scale-105 transition-transform">
              節
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black tracking-tight text-[#FFFFFF]">
                  NihongoSetu
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#C83C50]/20 text-[#C83C50] font-semibold border border-[#C83C50]/30">
                  STUDENT
                </span>
              </div>
              <p className="text-[11px] text-[#E8E0D5]/70 font-japanese">日本語への架け橋</p>
            </div>
          </Link>
        </div>

        {/* Level & Streak summary card */}
        <div className="px-4 py-3 mx-4 mt-4 rounded-xl bg-[#E8E0D5]/5 border border-[#E8E0D5]/15 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#C83C50]/20 border border-[#C83C50]/30 flex items-center justify-center font-black text-xs text-[#C83C50]">
              {profile?.targetLevel || "N5"}
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#FFFFFF]">Target JLPT</div>
              <div className="text-[10px] text-[#E8E0D5]/60">Structured Curriculum</div>
            </div>
          </div>
          <div className="flex items-center space-x-1 px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{profile?.streak || 1}d</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {PORTAL_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/portal" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#C83C50] text-[#FFFFFF] font-semibold shadow-md shadow-[#C83C50]/20"
                    : "text-[#E8E0D5]/80 hover:text-[#FFFFFF] hover:bg-[#E8E0D5]/10"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#FFFFFF]" : "text-[#E8E0D5]/70"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Admin Switcher & Footer */}
        <div className="p-4 border-t border-[#E8E0D5]/15 space-y-2">
          <Link
            href="/admin"
            className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-xs text-[#E8E0D5]/70 hover:text-[#FFFFFF] hover:bg-[#E8E0D5]/10 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C83C50]" />
            <span>Admin Management</span>
          </Link>
          <div className="text-[10px] text-[#E8E0D5]/40 text-center">
            NihongoSetu v2.0 · Offline Ready
          </div>
        </div>
      </aside>

      {/* Main Body Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-[#101C35]/95 backdrop-blur-md border-b border-[#E8E0D5]/15 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-40">
          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-[#E8E0D5] hover:bg-[#E8E0D5]/10"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#C83C50] flex items-center justify-center font-bold text-sm text-[#FFFFFF]">
                節
              </div>
              <span className="font-extrabold text-base tracking-tight text-[#FFFFFF]">
                NihongoSetu
              </span>
            </Link>
          </div>

          {/* Desktop Left status */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E8E0D5]/10 border border-[#E8E0D5]/20 text-xs text-[#E8E0D5]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Study Session Active</span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            {/* Streak Counter Button */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{profile?.streak || 1} Day Streak</span>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#E8E0D5]/10 hover:bg-[#E8E0D5]/20 border border-[#E8E0D5]/20 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#C83C50]" />
                <span className="uppercase">{profile?.nativeLanguage || "en"}</span>
                <ChevronDown className="w-3 h-3 text-[#E8E0D5]/60" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#101C35] border border-[#E8E0D5]/20 shadow-2xl py-2 z-50 max-h-72 overflow-y-auto">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#E8E0D5]/50 border-b border-[#E8E0D5]/10 mb-1">
                    Select Native Language
                  </div>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageChange(l.code)}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                        profile?.nativeLanguage === l.code
                          ? "bg-[#C83C50] text-[#FFFFFF] font-semibold"
                          : "text-[#E8E0D5] hover:bg-[#E8E0D5]/10"
                      }`}
                    >
                      <span>{l.name}</span>
                      <span className="uppercase text-[10px] opacity-70">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-[#E8E0D5]/10 transition-colors border border-transparent hover:border-[#E8E0D5]/20"
              >
                <div className="w-8 h-8 rounded-lg bg-[#C83C50] text-[#FFFFFF] font-bold text-xs flex items-center justify-center shadow">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : "S"}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-[#FFFFFF] max-w-[120px] truncate">
                  {profile?.name || "Student"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#E8E0D5]/60" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#101C35] border border-[#E8E0D5]/20 shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#E8E0D5]/10">
                    <p className="text-xs font-bold text-[#FFFFFF] truncate">{profile?.name || "Student"}</p>
                    <p className="text-[11px] text-[#E8E0D5]/60 truncate">{profile?.email || "student@nihongosetu.org"}</p>
                  </div>
                  <Link
                    href="/portal/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-xs text-[#E8E0D5] hover:bg-[#E8E0D5]/10 hover:text-[#FFFFFF]"
                  >
                    <User className="w-4 h-4 text-[#C83C50]" />
                    <span>My Profile & Stats</span>
                  </Link>
                  <Link
                    href="/portal/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-xs text-[#E8E0D5] hover:bg-[#E8E0D5]/10 hover:text-[#FFFFFF]"
                  >
                    <Settings className="w-4 h-4 text-[#C83C50]" />
                    <span>Settings & Backup</span>
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-xs text-[#E8E0D5] hover:bg-[#E8E0D5]/10 hover:text-[#FFFFFF]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#C83C50]" />
                    <span>Admin Command Hub</span>
                  </Link>
                  <div className="border-t border-[#E8E0D5]/10 my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
          {children}
        </main>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-72 bg-[#101C35] border-r border-[#E8E0D5]/20 h-full flex flex-col p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E0D5]/15 mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#C83C50] text-[#FFFFFF] font-bold text-sm flex items-center justify-center">
                  節
                </div>
                <span className="font-extrabold text-base text-[#FFFFFF]">NihongoSetu</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg text-[#E8E0D5] hover:bg-[#E8E0D5]/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {PORTAL_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== "/portal" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium ${
                      isActive
                        ? "bg-[#C83C50] text-[#FFFFFF] font-semibold"
                        : "text-[#E8E0D5]/80 hover:bg-[#E8E0D5]/10"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-[#101C35]/95 backdrop-blur-md border-t border-[#E8E0D5]/20 z-40 px-2 py-1.5 flex items-center justify-around text-[10px]">
        <Link
          href="/portal"
          className={`flex flex-col items-center py-1 px-2 rounded-lg ${
            pathname === "/portal" ? "text-[#C83C50] font-bold" : "text-[#E8E0D5]/70"
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </Link>
        <Link
          href="/portal/kana"
          className={`flex flex-col items-center py-1 px-2 rounded-lg ${
            pathname.startsWith("/portal/kana") ? "text-[#C83C50] font-bold" : "text-[#E8E0D5]/70"
          }`}
        >
          <PenTool className="w-4 h-4 mb-0.5" />
          <span>Kana</span>
        </Link>
        <Link
          href="/portal/vocab"
          className={`flex flex-col items-center py-1 px-2 rounded-lg ${
            pathname.startsWith("/portal/vocab") ? "text-[#C83C50] font-bold" : "text-[#E8E0D5]/70"
          }`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span>Vocab</span>
        </Link>
        <Link
          href="/portal/kanji"
          className={`flex flex-col items-center py-1 px-2 rounded-lg ${
            pathname.startsWith("/portal/kanji") ? "text-[#C83C50] font-bold" : "text-[#E8E0D5]/70"
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span>Kanji</span>
        </Link>
        <Link
          href="/portal/jlpt"
          className={`flex flex-col items-center py-1 px-2 rounded-lg ${
            pathname.startsWith("/portal/jlpt") ? "text-[#C83C50] font-bold" : "text-[#E8E0D5]/70"
          }`}
        >
          <Award className="w-4 h-4 mb-0.5" />
          <span>Exam</span>
        </Link>
      </nav>
    </div>
  );
}

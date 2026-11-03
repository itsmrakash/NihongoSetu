"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Eye, EyeOff, Sparkles } from "lucide-react";
import PublicNavbar from "@/components/public/Navbar";
import PublicFooter from "@/components/public/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "admin">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      if (!email || !password) {
        setError("Please enter both email address and password.");
        setIsLoading(false);
        return;
      }

      // Check admin credentials or role switch
      if (role === "admin" || email.includes("admin")) {
        try {
          localStorage.setItem("nihongo_user", JSON.stringify({
            name: "Master Sensei / Administrator",
            email: email,
            role: "admin",
            targetLevel: "N1",
            nativeLanguage: "en",
            loggedInAt: new Date().toISOString(),
          }));
        } catch {
          // ignore storage error
        }
        router.push("/admin");
      } else {
        try {
          localStorage.setItem("nihongo_user", JSON.stringify({
            name: email.split("@")[0] || "Japanese Learner",
            email: email,
            role: "student",
            targetLevel: "N5",
            nativeLanguage: "en",
            loggedInAt: new Date().toISOString(),
          }));
        } catch {
          // ignore storage error
        }
        router.push("/portal");
      }
      setIsLoading(false);
    }, 600);
  };

  const handleQuickDemo = (demoType: "student" | "admin") => {
    if (demoType === "admin") {
      setEmail("admin@nihongosetu.org");
      setPassword("Sensei@2026!Admin");
      setRole("admin");
    } else {
      setEmail("student@nihongosetu.org");
      setPassword("Sakura@2026!JLPT");
      setRole("student");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#101C35] text-[#FFFFFF]">
      <PublicNavbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#C83C50] text-[#FFFFFF] shadow-xl shadow-[#C83C50]/20 font-bold text-2xl mb-2">
              節
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#FFFFFF]">
              Welcome to NihongoSetu
            </h1>
            <p className="text-sm text-[#E8E0D5]/70">
              {role === "admin"
                ? "Enter institutional administrator credentials"
                : "Sign in to access your JLPT learning studio & streak tracker"}
            </p>
          </div>

          {/* Role Segmented Switcher */}
          <div className="bg-[#101C35] p-1.5 rounded-xl border border-[#E8E0D5]/20 flex items-center">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                role === "student"
                  ? "bg-[#C83C50] text-[#FFFFFF] shadow"
                  : "text-[#E8E0D5]/70 hover:text-[#FFFFFF]"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Student Portal</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                role === "admin"
                  ? "bg-[#C83C50] text-[#FFFFFF] shadow"
                  : "text-[#E8E0D5]/70 hover:text-[#FFFFFF]"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Quick Demo Pre-fill Bar */}
          <div className="p-3 rounded-xl bg-[#E8E0D5]/5 border border-[#E8E0D5]/15 flex items-center justify-between text-xs">
            <span className="text-[#E8E0D5]/80 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C83C50]" />
              <span>Instant Access:</span>
            </span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleQuickDemo("student")}
                className="px-2.5 py-1 rounded bg-[#E8E0D5]/10 hover:bg-[#E8E0D5]/20 text-[#E8E0D5] font-medium transition-colors"
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo("admin")}
                className="px-2.5 py-1 rounded bg-[#E8E0D5]/10 hover:bg-[#E8E0D5]/20 text-[#E8E0D5] font-medium transition-colors"
              >
                Admin Demo
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            {error && (
              <div className="p-3.5 rounded-xl bg-[#C83C50]/15 border border-[#C83C50]/40 text-xs text-[#FFFFFF] flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C83C50]" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-[#E8E0D5] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8E0D5]/50" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === "admin" ? "admin@nihongosetu.org" : "student@example.com"}
                    className="w-full bg-[#101C35] border border-[#E8E0D5]/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#FFFFFF] placeholder-[#E8E0D5]/40 focus:outline-none focus:border-[#C83C50] focus:ring-1 focus:ring-[#C83C50] transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-[#E8E0D5]">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#E8E0D5]/70 hover:text-[#C83C50] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8E0D5]/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#101C35] border border-[#E8E0D5]/25 rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#FFFFFF] placeholder-[#E8E0D5]/40 focus:outline-none focus:border-[#C83C50] focus:ring-1 focus:ring-[#C83C50] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#E8E0D5]/50 hover:text-[#FFFFFF]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-xs text-[#E8E0D5]/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-[#101C35] border-[#E8E0D5]/30 text-[#C83C50] focus:ring-[#C83C50]"
                  />
                  <span>Remember my credentials</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#C83C50] text-[#FFFFFF] font-semibold text-sm shadow-lg shadow-[#C83C50]/25 hover:bg-[#C83C50]/90 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{isLoading ? "Authenticating..." : role === "admin" ? "Access Admin Command" : "Enter Learning Portal"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Registration link */}
          <p className="text-center text-xs text-[#E8E0D5]/70">
            Don&apos;t have a student account yet?{" "}
            <Link
              href="/register"
              className="text-[#FFFFFF] font-semibold underline underline-offset-4 hover:text-[#C83C50] transition-colors"
            >
              Register for free
            </Link>
          </p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

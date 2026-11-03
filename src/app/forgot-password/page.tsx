"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import PublicNavbar from "@/components/public/Navbar";
import PublicFooter from "@/components/public/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please provide a valid registered email address.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#101C35] text-[#FFFFFF]">
      <PublicNavbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#C83C50] text-[#FFFFFF] shadow-xl shadow-[#C83C50]/20 font-bold text-2xl mb-2">
              復
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#FFFFFF]">
              Reset Your Password
            </h1>
            <p className="text-sm text-[#E8E0D5]/70">
              Enter your registered email address to receive password recovery instructions.
            </p>
          </div>

          <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            {submitted ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#FFFFFF]">Recovery Email Dispatched</h3>
                  <p className="text-xs text-[#E8E0D5]/80 leading-relaxed">
                    We have sent a secure password reset link to:
                    <br />
                    <span className="font-semibold text-[#FFFFFF]">{email}</span>
                  </p>
                </div>
                <p className="text-xs text-[#E8E0D5]/60">
                  Please check your inbox (and spam folder). The link remains valid for 60 minutes.
                </p>
                <div className="pt-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-[#C83C50] hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Login</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3.5 rounded-xl bg-[#C83C50]/15 border border-[#C83C50]/40 text-xs text-[#FFFFFF] flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-[#C83C50] shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-[#E8E0D5] mb-1.5">
                    Account Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8E0D5]/50" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full bg-[#101C35] border border-[#E8E0D5]/25 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#FFFFFF] placeholder-[#E8E0D5]/40 focus:outline-none focus:border-[#C83C50] focus:ring-1 focus:ring-[#C83C50] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-[#C83C50] text-[#FFFFFF] font-semibold text-sm shadow-lg shadow-[#C83C50]/25 hover:bg-[#C83C50]/90 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <span>{isLoading ? "Sending Instructions..." : "Send Reset Link"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center space-x-1.5 text-xs text-[#E8E0D5]/70 hover:text-[#FFFFFF] transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Sign In</span>
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

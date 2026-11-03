import React from "react";
import { Sparkles, BookOpen, Layers, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#101C35] text-[#FFFFFF] flex flex-col justify-between p-6 sm:p-12 md:p-16">
      {/* Header Bar */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between border-b border-[#E8E0D5]/15 pb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-[#C83C50] flex items-center justify-center font-bold text-lg text-[#FFFFFF] shadow-md">
            節
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#FFFFFF]">
              NihongoSetu
            </h1>
            <p className="text-xs text-[#E8E0D5]/70 font-medium">
              日本語節 · Your Bridge to Japanese
            </p>
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E8E0D5]/10 border border-[#E8E0D5]/20 text-xs text-[#E8E0D5]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Stage 1 Foundation Active</span>
        </div>
      </header>

      {/* Main Hero Card */}
      <section className="max-w-3xl w-full mx-auto my-12 text-center flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C83C50]/15 border border-[#C83C50]/30 text-xs font-semibold text-[#FFFFFF] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C83C50]" />
          <span>Institutional-Grade Japanese Learning</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FFFFFF] mb-4">
          日本語への架け橋
        </h2>
        <p className="text-lg sm:text-xl text-[#E8E0D5] font-light max-w-2xl mb-8 leading-relaxed">
          NihongoSetu is a modern Japanese language platform engineered to make JLPT preparation, kana mastery, vocabulary, and grammar intuitive and accessible.
        </p>

        {/* Foundation Verification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left mt-4">
          <div className="p-5 rounded-xl bg-[#FFFFFF]/5 border border-[#E8E0D5]/15 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2 text-[#C83C50]">
              <Layers className="w-5 h-5" />
              <h3 className="font-semibold text-sm text-[#FFFFFF]">Modern App Architecture</h3>
            </div>
            <p className="text-xs text-[#E8E0D5]/80 leading-normal">
              Built on Next.js 16 with default Turbopack and React 19 concurrent foundations.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FFFFFF]/5 border border-[#E8E0D5]/15 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2 text-[#C83C50]">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-semibold text-sm text-[#FFFFFF]">Japanese Premium Tokens</h3>
            </div>
            <p className="text-xs text-[#E8E0D5]/80 leading-normal">
              Tailwind CSS v4 CSS-first design with Midnight Navy, Sakura Red, and Warm Beige.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FFFFFF]/5 border border-[#E8E0D5]/15 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="font-semibold text-sm text-[#FFFFFF]">Baseline Verified</h3>
            </div>
            <p className="text-xs text-[#E8E0D5]/80 leading-normal">
              Canonical HTML prototype intact and preserved at root as reference standard.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto pt-6 border-t border-[#E8E0D5]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8E0D5]/60 gap-4">
        <p>© 2026 NihongoSetu (日本語節). All rights reserved.</p>
        <p className="font-mono text-[11px]">Next.js 16.4.4 · React 19.3.1 · Tailwind CSS 4.3.4</p>
      </footer>
    </main>
  );
}


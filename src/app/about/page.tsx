import React from "react";
import Link from "next/link";
import PublicNavbar from "@/components/public/Navbar";
import PublicFooter from "@/components/public/Footer";
import { ArrowRight, Compass, Target, Heart, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#101C35] text-[#FFFFFF] flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C83C50]/15 border border-[#C83C50]/30 text-xs font-semibold text-[#FFFFFF]">
              <span>About NihongoSetu · 日本語節について</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#FFFFFF] tracking-tight">
              Building the Bridge to Japanese
            </h1>
            <p className="text-base sm:text-lg text-[#E8E0D5]/80 leading-relaxed font-light">
              NihongoSetu (日本語節 / 架け橋) was born out of a critical educational necessity: making authentic Japanese language mastery accessible, structured, and native-language friendly for Indian and global learners.
            </p>
          </div>

          {/* Core Philosophy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#FFFFFF]/5 border border-[#E8E0D5]/15 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C83C50]/15 flex items-center justify-center text-[#C83C50]">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#FFFFFF]">The Linguistic Divide</h2>
              <p className="text-sm text-[#E8E0D5]/80 leading-relaxed">
                Most international Japanese learning materials force students to interpret concepts through an English-first lens. For speakers of Dravidian and Indo-Aryan languages (Tamil, Hindi, Telugu, Marathi, Bengali), Japanese grammar shares remarkable syntactic similarities (SOV sentence structures, postpositional particles) that English lacks.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FFFFFF]/5 border border-[#E8E0D5]/15 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C83C50]/15 flex items-center justify-center text-[#C83C50]">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#FFFFFF]">JLPT-First Precision</h2>
              <p className="text-sm text-[#E8E0D5]/80 leading-relaxed">
                We organize learning strictly around verifiable JLPT benchmarks (N5 to N1). Every kanji stroke, vocabulary word, grammar pattern, and listening passage is categorized to prepare students for real academic and professional accreditation in Japan.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FFFFFF]/5 border border-[#E8E0D5]/15 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#C83C50]/15 flex items-center justify-center text-[#C83C50]">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#FFFFFF]">Institutional Quality</h2>
              <p className="text-sm text-[#E8E0D5]/80 leading-relaxed">
                We believe core education should be barrier-free. NihongoSetu delivers our comprehensive Hiragana, Katakana, N5 question banks, and foundational reference vaults completely free, with offline synchronization that respects student data quotas.
              </p>
            </div>
          </div>

          {/* Pillars of Education */}
          <div className="rounded-3xl bg-[#FFFFFF]/5 border border-[#E8E0D5]/15 p-8 sm:p-12 space-y-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">
              Our Four Educational Pillars
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-[#C83C50] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-base text-[#FFFFFF]">Native Language Bridge</h3>
                  <p className="text-sm text-[#E8E0D5]/80 leading-relaxed mt-1">
                    Seamless translation across 12 languages so you absorb nuances without mental friction.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-[#C83C50] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-base text-[#FFFFFF]">Kinesthetic Writing Canvas</h3>
                  <p className="text-sm text-[#E8E0D5]/80 leading-relaxed mt-1">
                    Stroke-by-stroke interactive canvas for tactile memorization of Japanese orthography.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-[#C83C50] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-base text-[#FFFFFF]">Offline-First Resilience</h3>
                  <p className="text-sm text-[#E8E0D5]/80 leading-relaxed mt-1">
                    Cached local vaults allow you to practice listening and vocabulary even without reliable network access.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-[#C83C50] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-base text-[#FFFFFF]">AI Sensei Dialogue</h3>
                  <p className="text-sm text-[#E8E0D5]/80 leading-relaxed mt-1">
                    Real-time AI conversational tutoring to answer &ldquo;why is this particle used instead of that one?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="text-center pt-8">
            <Link
              href="/portal"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-[#C83C50] hover:bg-[#B03244] text-[#FFFFFF] font-bold shadow-lg shadow-[#C83C50]/25 transition-all"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

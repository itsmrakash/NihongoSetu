import React from "react";
import Link from "next/link";
import PublicNavbar from "@/components/public/Navbar";
import PublicFooter from "@/components/public/Footer";
import { BookMarked, Download, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { JLPT_PLAYLISTS } from "@/data/media";

export default function ResourcesPage() {
  const referenceGuides = [
    {
      title: "Hiragana & Katakana Complete Chart",
      type: "Reference Guide",
      description: "Clean tabular reference of all 46 basic syllables, dakuon (voiced), handakuon (semi-voiced), and contracted yoon sounds with stroke order maps.",
      actionLink: "/portal/kana",
      actionText: "Open Kana Chart"
    },
    {
      title: "JLPT N5 Core Grammar Cheatsheet",
      type: "Grammar Summary",
      description: "Quick reference card of essential particles, te-form verb connections, polite copula forms, and adjective past/negative variations.",
      actionLink: "/portal/grammar",
      actionText: "View Grammar Deck"
    },
    {
      title: "High-Frequency 80 Kanji Guide",
      type: "Kanji Sheet",
      description: "The 80 official JLPT N5 kanji with Onyomi, Kunyomi, radical classification, and mnemonic memory associations.",
      actionLink: "/portal/kanji",
      actionText: "Access Kanji Vault"
    },
    {
      title: "Listening Comprehension Phrasebook",
      type: "Audio Guide",
      description: "Spoken everyday conversational Japanese expressions with romaji, kanji furigana, and multi-language translations.",
      actionLink: "/portal/listening",
      actionText: "Listen to Phrases"
    }
  ];

  return (
    <div className="min-h-screen bg-[#101C35] text-[#FFFFFF] flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#C83C50]/15 border border-[#C83C50]/30 text-xs font-semibold text-[#FFFFFF]">
              <BookMarked className="w-3.5 h-3.5 text-[#C83C50]" />
              <span>Study Aids & Materials · 学習リソース</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#FFFFFF] tracking-tight">
              Japanese Learning Resources
            </h1>
            <p className="text-base sm:text-lg text-[#E8E0D5]/80 font-light leading-relaxed">
              Carefully assembled reference tables, structured cheat sheets, and curated video playlists to support your independent study habits.
            </p>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {referenceGuides.map((guide, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-[#FFFFFF]/5 border border-[#E8E0D5]/15 hover:border-[#C83C50] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C83C50] uppercase tracking-wider">
                      {guide.type}
                    </span>
                    <FileText className="w-4 h-4 text-[#E8E0D5]/60" />
                  </div>
                  <h2 className="text-xl font-bold text-[#FFFFFF]">{guide.title}</h2>
                  <p className="text-sm text-[#E8E0D5]/80 leading-relaxed">
                    {guide.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8E0D5]/10">
                  <Link
                    href={guide.actionLink}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-[#C83C50] hover:text-[#FFFFFF] transition-colors"
                  >
                    <span>{guide.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Curated Video Lessons Academy */}
          <div className="rounded-3xl bg-[#FFFFFF]/5 border border-[#E8E0D5]/15 p-8 sm:p-12 space-y-6">
            <h2 className="text-2xl font-extrabold text-[#FFFFFF]">
              Curated Video Lecture Series
            </h2>
            <p className="text-sm text-[#E8E0D5]/80 max-w-2xl leading-relaxed">
              We have curated verified YouTube playlists covering vocabulary and grammar drills for each JLPT level.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {JLPT_PLAYLISTS.map((pl) => (
                <a
                  key={pl.level}
                  href={pl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#101C35] border border-[#E8E0D5]/20 hover:border-[#C83C50] transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-[#C83C50] block font-mono">{pl.level} PLAYLIST</span>
                    <span className="text-sm font-semibold text-[#FFFFFF]">{pl.desc}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#E8E0D5]/60 group-hover:text-[#FFFFFF] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

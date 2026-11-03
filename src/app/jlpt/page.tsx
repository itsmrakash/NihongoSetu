import React from "react";
import Link from "next/link";
import PublicNavbar from "@/components/public/Navbar";
import PublicFooter from "@/components/public/Footer";
import { BookOpen, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { KANJI_TARGET_COUNTS } from "@/data/kanji";
import { VOCAB_TARGET_COUNTS } from "@/data/vocab";

export default function JLPTPage() {
  const levels = [
    {
      id: "n5",
      level: "JLPT N5",
      badge: "Beginner",
      scope: "The ability to understand some basic Japanese.",
      vocab: VOCAB_TARGET_COUNTS.N5,
      kanji: KANJI_TARGET_COUNTS.N5,
      grammarCount: "40+ patterns",
      examMinutes: "90 mins total",
      passScore: "80 / 180 points",
      topics: [
        "Hiragana & Katakana mastery with stroke counts",
        "Elementary sentence structure: A は B です",
        "Basic particles: は, が, を, に, で, へ, と, も, の",
        "Essential verb conjugations: ます, ません, ました, て-form",
        "Numbers, time, calendar, days of the week, shopping dialogues"
      ],
      examAction: "/portal/jlpt"
    },
    {
      id: "n4",
      level: "JLPT N4",
      badge: "Elementary",
      scope: "The ability to understand basic Japanese in everyday topics.",
      vocab: VOCAB_TARGET_COUNTS.N4,
      kanji: KANJI_TARGET_COUNTS.N4,
      grammarCount: "80+ patterns",
      examMinutes: "115 mins total",
      passScore: "90 / 180 points",
      topics: [
        "Compound verbs and polite potential forms",
        "Desire and purpose: 〜たい, 〜に行く",
        "Giving and receiving: あげる, もらう, くれる",
        "Conditional clauses: 〜たら, 〜なら, 〜ば, 〜と",
        "Passive and causative foundational forms"
      ],
      examAction: "/portal/jlpt"
    },
    {
      id: "n3",
      level: "JLPT N3",
      badge: "Intermediate",
      scope: "The ability to understand Japanese used in everyday situations to a certain degree.",
      vocab: VOCAB_TARGET_COUNTS.N3,
      kanji: KANJI_TARGET_COUNTS.N3,
      grammarCount: "130+ patterns",
      examMinutes: "140 mins total",
      passScore: "95 / 180 points",
      topics: [
        "Reading slightly difficult articles and newspaper headlines",
        "Conversational fluency in workplace and academic settings",
        "Nuanced grammar: 〜わけにはいかない, 〜に対して, 〜に違いない",
        "Keigo (Honorifics: Sonkeigo and Kenjougo) basics",
        "Intermediate listening with fast speech elements"
      ],
      examAction: "/portal/jlpt"
    },
    {
      id: "n2",
      level: "JLPT N2",
      badge: "Pre-Advanced",
      scope: "The ability to understand Japanese used in everyday situations, and in a variety of circumstances.",
      vocab: VOCAB_TARGET_COUNTS.N2,
      kanji: KANJI_TARGET_COUNTS.N2,
      grammarCount: "200+ patterns",
      examMinutes: "155 mins total",
      passScore: "90 / 180 points",
      topics: [
        "Comprehending newspapers, magazines, critiques, and essays",
        "Following spoken lectures and news reports at natural speed",
        "Complex grammatical pairings: 〜を契機に, 〜を踏まえて, 〜ざるを得ない",
        "Business negotiations, professional emails, and formal presentations",
        "Advanced kanji compounds and idioms (yojijukugo)"
      ],
      examAction: "/portal/jlpt"
    },
    {
      id: "n1",
      level: "JLPT N1",
      badge: "Advanced",
      scope: "The ability to understand Japanese used in a variety of complex circumstances.",
      vocab: VOCAB_TARGET_COUNTS.N1,
      kanji: KANJI_TARGET_COUNTS.N1,
      grammarCount: "250+ patterns",
      examMinutes: "170 mins total",
      passScore: "100 / 180 points",
      topics: [
        "Complex logical arguments, abstract writings, and literary texts",
        "Detailed listening comprehension in specialized conversations",
        "High-register classical and formal expressions: 〜極まりない, 〜であれ",
        "Native-level nuance and stylistic discernment",
        "Professional and academic publication literacy"
      ],
      examAction: "/portal/jlpt"
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
              <Award className="w-3.5 h-3.5 text-[#C83C50]" />
              <span>Japanese-Language Proficiency Test · JLPT 対策</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#FFFFFF] tracking-tight">
              JLPT Levels Curriculum & Syllabi
            </h1>
            <p className="text-base sm:text-lg text-[#E8E0D5]/80 font-light leading-relaxed">
              Understand the official requirements for every JLPT certification tier. NihongoSetu offers targeted vocabulary, kanji, and timed mock tests for all five levels.
            </p>
          </div>

          {/* Level Cards */}
          <div className="space-y-10">
            {levels.map((lvl) => (
              <div
                key={lvl.id}
                id={lvl.id}
                className="rounded-3xl bg-[#FFFFFF]/5 border border-[#E8E0D5]/15 p-8 sm:p-10 scroll-mt-28 hover:border-[#C83C50]/40 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E8E0D5]/15">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl sm:text-5xl font-black text-[#C83C50] font-mono">
                      {lvl.level.replace("JLPT ", "")}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-2xl font-bold text-[#FFFFFF]">{lvl.level}</h2>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E8E0D5]/10 text-[#E8E0D5] border border-[#E8E0D5]/20 font-semibold">
                          {lvl.badge}
                        </span>
                      </div>
                      <p className="text-sm text-[#E8E0D5]/80 mt-1">{lvl.scope}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                    <div className="px-3 py-1.5 rounded-xl bg-[#101C35] border border-[#E8E0D5]/20">
                      <span className="text-[#E8E0D5]/60 block text-[10px]">VOCABULARY</span>
                      <span className="text-[#FFFFFF] font-bold text-sm">~{lvl.vocab} words</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-[#101C35] border border-[#E8E0D5]/20">
                      <span className="text-[#E8E0D5]/60 block text-[10px]">KANJI</span>
                      <span className="text-[#FFFFFF] font-bold text-sm">~{lvl.kanji} kanji</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-[#101C35] border border-[#E8E0D5]/20">
                      <span className="text-[#E8E0D5]/60 block text-[10px]">PASS SCORE</span>
                      <span className="text-emerald-400 font-bold text-sm">{lvl.passScore}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#C83C50] flex items-center space-x-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Key Syllabus Core Competencies</span>
                    </h3>
                    <ul className="space-y-2">
                      {lvl.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-[#E8E0D5]/90">
                          <CheckCircle2 className="w-4 h-4 text-[#C83C50] shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-end">
                    <Link
                      href={lvl.examAction}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#C83C50] hover:bg-[#B03244] text-[#FFFFFF] font-bold text-center text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Practice {lvl.level} Questions</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

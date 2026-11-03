"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStudentProfile, StudentProfile } from "@/lib/storage/studentState";
import {
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  FileQuestion,
  Sparkles,
} from "lucide-react";

const JLPT_EXAM_LEVELS = [
  {
    level: "N5",
    title: "JLPT N5 Diagnostic Mock Test",
    desc: "Basic Hiragana, Katakana, everyday greetings, numbers, and fundamental sentence structure.",
    questionsCount: 20,
    timeMinutes: 25,
    passScore: 14,
    passPercentage: 70,
  },
  {
    level: "N4",
    title: "JLPT N4 Elementary Mock Test",
    desc: "Elementary grammar, simultaneous actions (ながら), te-form combinations, and routine conversational exchanges.",
    questionsCount: 20,
    timeMinutes: 25,
    passScore: 14,
    passPercentage: 70,
  },
  {
    level: "N3",
    title: "JLPT N3 Intermediate Mock Test",
    desc: "The critical bridge from textbook Japanese to natural fluency: decision expressions, expectations, and varied particles.",
    questionsCount: 20,
    timeMinutes: 25,
    passScore: 14,
    passPercentage: 70,
  },
  {
    level: "N2",
    title: "JLPT N2 Upper-Intermediate Mock Test",
    desc: "Business, workplace, news articles, and subtle nuance expressions (〜に違いない, 〜わけにはいかない).",
    questionsCount: 20,
    timeMinutes: 25,
    passScore: 14,
    passPercentage: 70,
  },
  {
    level: "N1",
    title: "JLPT N1 Advanced Mastery Mock Test",
    desc: "Advanced abstract prose, formal literary syntax, editorial opinion pieces, and complex logical connectors.",
    questionsCount: 20,
    timeMinutes: 25,
    passScore: 14,
    passPercentage: 70,
  },
];

export default function JLPTPrepHubPage() {
  const [profile] = useState<StudentProfile>(() => getStudentProfile());

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
            <Award className="w-3.5 h-3.5" />
            <span>Official JLPT Simulator</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
            JLPT Mock Examination Simulator
          </h1>
          <p className="text-xs text-[#E8E0D5]/70 mt-1">
            Experience realistic timed JLPT exams with instant scoring, passing thresholds, and answer explanations.
          </p>
        </div>
      </div>

      {/* Exam Format & Rules Banner */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h2 className="text-base font-bold text-[#FFFFFF] flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#C83C50]" />
          <span>Standardized Simulation Guidelines</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#0B1323] border border-[#E8E0D5]/10 space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#FFFFFF]">
              <FileQuestion className="w-4 h-4 text-[#C83C50]" />
              <span>20 Authentic Questions</span>
            </div>
            <p className="text-[11px] text-[#E8E0D5]/70 leading-relaxed">
              Drawn from official JLPT test patterns covering Vocabulary, Kanji readings, and Grammar nuances.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1323] border border-[#E8E0D5]/10 space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#FFFFFF]">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>25 Minutes Timed</span>
            </div>
            <p className="text-[11px] text-[#E8E0D5]/70 leading-relaxed">
              Continuous countdown clock simulates real exam pressure. Automatic submission upon timeout.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1323] border border-[#E8E0D5]/10 space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#FFFFFF]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>70% Passing Threshold</span>
            </div>
            <p className="text-[11px] text-[#E8E0D5]/70 leading-relaxed">
              Achieve 14/20 or higher to earn certification pass status and log result to your permanent student record.
            </p>
          </div>
        </div>
      </div>

      {/* Exam Level Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#FFFFFF]">Select Your Target Exam Level</h3>
        <div className="grid grid-cols-1 gap-4">
          {JLPT_EXAM_LEVELS.map((exam) => {
            const levelScores = profile?.mockScores?.filter((s) => s.level === exam.level) || [];
            const bestScore = levelScores.length > 0 ? Math.max(...levelScores.map((s) => s.percentage)) : null;

            return (
              <div
                key={exam.level}
                className="p-6 rounded-3xl bg-[#101C35] border border-[#E8E0D5]/20 hover:border-[#C83C50]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#C83C50] text-[#FFFFFF] font-black text-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#C83C50]/20">
                    {exam.level}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-base font-bold text-[#FFFFFF]">{exam.title}</h4>
                      {bestScore !== null && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            bestScore >= 70
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          Best: {bestScore}% {bestScore >= 70 ? "PASSED" : "FAILED"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#E8E0D5]/70 max-w-2xl leading-relaxed">
                      {exam.desc}
                    </p>
                    <div className="flex items-center space-x-4 pt-1 text-[11px] text-[#E8E0D5]/60">
                      <span>• 20 Questions</span>
                      <span>• 25 Minutes</span>
                      <span>• Passing: 14/20 (70%)</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  <Link
                    href={`/portal/jlpt/${exam.level.toLowerCase()}/exam`}
                    className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#C83C50] hover:bg-[#B03244] text-[#FFFFFF] text-xs font-bold shadow-lg shadow-[#C83C50]/25 transition-all"
                  >
                    <span>Launch {exam.level} Exam</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

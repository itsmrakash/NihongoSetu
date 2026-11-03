"use client";

import React, { useState, useEffect, useMemo, useCallback, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getQuestionsForLevel, JLPTLevel, ExamQuestion } from "@/data/questions";
import { saveMockExamResult } from "@/lib/storage/studentState";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function TimedMockExamPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const rawLevel = resolvedParams.level.toUpperCase();
  const level: JLPTLevel = ["N5", "N4", "N3", "N2", "N1"].includes(rawLevel)
    ? (rawLevel as JLPTLevel)
    : "N5";

  // Load questions
  const [questions] = useState<ExamQuestion[]>(() => getQuestionsForLevel(level).slice(0, 20));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examResult, setExamResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
  } | null>(null);

  const handleSubmit = useCallback(() => {
    if (isSubmitted || questions.length === 0) return;

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const total = questions.length;
    const { passed, percentage } = saveMockExamResult(level, correctCount, total);

    setExamResult({
      score: correctCount,
      total,
      percentage,
      passed,
    });
    setIsSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSubmitted, questions, selectedAnswers, level]);

  // Countdown timer
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft, handleSubmit]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  if (questions.length === 0) {
    return (
      <div className="text-center py-24 space-y-4">
        <div className="w-8 h-8 border-2 border-[#C83C50] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-[#E8E0D5]/70">Preparing JLPT {level} Question Deck...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner with Exam Info & Clock */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-4 sm:p-6 flex items-center justify-between shadow-xl sticky top-24 z-30 backdrop-blur-md">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black px-2 py-0.5 rounded bg-[#C83C50] text-[#FFFFFF]">
              JLPT {level}
            </span>
            <span className="text-xs text-[#E8E0D5]/80 font-medium">
              Timed Diagnostic Examination
            </span>
          </div>
          <p className="text-[11px] text-[#E8E0D5]/60 mt-0.5">
            Answered: {answeredCount} / {questions.length} questions
          </p>
        </div>

        {/* Live Timer */}
        <div
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-bold ${
            timeLeft < 300
              ? "bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse"
              : "bg-[#0B1323] text-[#FFFFFF] border-[#E8E0D5]/20"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span className="font-mono text-base">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {!isSubmitted ? (
        <>
          {/* Question Jump Pills */}
          <div className="bg-[#101C35] border border-[#E8E0D5]/15 rounded-2xl p-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = currentIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold shrink-0 transition-all ${
                    isCurrent
                      ? "bg-[#C83C50] text-[#FFFFFF] ring-2 ring-[#FFFFFF]"
                      : isAnswered
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-[#E8E0D5]/10 text-[#E8E0D5]/60 hover:bg-[#E8E0D5]/20"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Active Question Card */}
          <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8E0D5]/15 pb-4">
              <span className="text-xs font-bold text-[#C83C50] uppercase tracking-wider">
                Question {currentIndex + 1} of {questions.length} · {currentQuestion.category}
              </span>
              <span className="text-xs text-[#E8E0D5]/50">
                Single Choice
              </span>
            </div>

            {/* Question Japanese Prompt */}
            <div className="text-xl sm:text-2xl font-bold font-japanese text-[#FFFFFF] leading-relaxed">
              {currentQuestion.question}
            </div>

            {/* 4 Multiple Choice Radio Cards */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-[#C83C50]/20 border-[#C83C50] text-[#FFFFFF] font-semibold shadow-md"
                        : "bg-[#0B1323] border-[#E8E0D5]/15 text-[#E8E0D5] hover:bg-[#E8E0D5]/10 hover:border-[#E8E0D5]/30"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-lg bg-[#E8E0D5]/10 flex items-center justify-center font-bold text-xs">
                        {optIdx + 1}
                      </span>
                      <span className="font-japanese text-base">{option}</span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? "border-[#C83C50] bg-[#C83C50]"
                          : "border-[#E8E0D5]/30"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-[#FFFFFF]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Nav controls between questions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E8E0D5]/15">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2.5 rounded-xl bg-[#E8E0D5]/10 hover:bg-[#E8E0D5]/20 text-[#E8E0D5] text-xs font-semibold flex items-center space-x-1.5 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                  className="px-5 py-2.5 rounded-xl bg-[#C83C50] hover:bg-[#C83C50]/90 text-[#FFFFFF] text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#FFFFFF] text-xs font-bold flex items-center space-x-1.5 transition-all shadow-lg shadow-emerald-600/30"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Final Exam</span>
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Results & Review Mode */
        <div className="space-y-8">
          {/* Score Header Card */}
          <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <div
              className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-xl ${
                examResult?.passed
                  ? "bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40"
                  : "bg-rose-500/20 text-rose-400 border-2 border-rose-500/40"
              }`}
            >
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  examResult?.passed
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-rose-500/20 text-rose-400"
                }`}
              >
                {examResult?.passed ? "EXAMINATION PASSED" : "REVISE & RETAKE"}
              </span>
              <h1 className="text-4xl font-black text-[#FFFFFF]">
                {examResult?.score} / {examResult?.total} Correct ({examResult?.percentage}%)
              </h1>
              <p className="text-xs text-[#E8E0D5]/70 max-w-md mx-auto">
                {examResult?.passed
                  ? `Congratulations! You scored above the 70% threshold required for JLPT ${level} certification mastery.`
                  : `You scored ${examResult?.percentage}%. A minimum of 70% (14/20) is required to pass. Review the detailed explanations below.`}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setIsSubmitted(false);
                  setCurrentIndex(0);
                  setTimeLeft(25 * 60);
                  setExamResult(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#C83C50] hover:bg-[#C83C50]/90 text-[#FFFFFF] text-xs font-bold flex items-center space-x-2 transition-all shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake JLPT {level} Exam</span>
              </button>

              <Link
                href="/portal/jlpt"
                className="px-5 py-2.5 rounded-xl bg-[#E8E0D5]/10 hover:bg-[#E8E0D5]/20 text-[#E8E0D5] text-xs font-semibold transition-colors"
              >
                Return to Exam Hub
              </Link>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#FFFFFF]">
              Question-by-Question Solution Review
            </h2>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const studentAnswer = selectedAnswers[idx];
                const isCorrect = studentAnswer === q.correctIndex;

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-5 space-y-3 ${
                      isCorrect
                        ? "bg-[#101C35] border-emerald-500/30"
                        : "bg-[#101C35] border-rose-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[#E8E0D5]/60">
                          Q{idx + 1}.
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-[#E8E0D5]/10 text-[#E8E0D5]/80">
                          {q.category}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5 text-xs font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-400 flex items-center space-x-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Correct</span>
                          </span>
                        ) : (
                          <span className="text-rose-400 flex items-center space-x-1">
                            <XCircle className="w-4 h-4" />
                            <span>Incorrect</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-base font-bold font-japanese text-[#FFFFFF]">
                      {q.question}
                    </div>

                    {/* Options summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, oIdx) => {
                        let optStyle = "bg-[#0B1323] text-[#E8E0D5]/70 border-[#E8E0D5]/10";
                        if (oIdx === q.correctIndex) {
                          optStyle = "bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/40";
                        } else if (oIdx === studentAnswer && !isCorrect) {
                          optStyle = "bg-rose-500/20 text-rose-300 line-through border-rose-500/40";
                        }

                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl border flex items-center space-x-2 font-japanese ${optStyle}`}
                          >
                            <span className="font-sans font-bold">{oIdx + 1}.</span>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-3 rounded-xl bg-[#0B1323] border border-[#E8E0D5]/10 text-xs text-[#E8E0D5]/80 leading-relaxed">
                      <strong className="text-[#C83C50]">Grammar & Meaning Note: </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

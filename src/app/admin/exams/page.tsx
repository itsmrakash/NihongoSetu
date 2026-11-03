"use client";

import React, { useState, useMemo } from "react";
import { getQuestionsForLevel, ClientExamQuestion, JLPTLevel } from "@/data/questions";
import { logAdminAction } from "@/lib/storage/adminState";
import {
  FileCheck2,
  Search,
  Plus,
  Trash2,
  Filter,
  CheckCircle2,
  Sliders,
  ShieldCheck,
} from "lucide-react";

interface AdminCMSQuestion extends ClientExamQuestion {
  correctIndex?: number;
  explanation?: string;
}

export default function AdminExamsCMSPage() {
  const [activeLevel, setActiveLevel] = useState<JLPTLevel>("N5");
  const [questionsList, setQuestionsList] = useState<AdminCMSQuestion[]>(() => getQuestionsForLevel("N5"));
  const [searchQuery, setSearchQuery] = useState("");
  const [passThreshold, setPassThreshold] = useState(70);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Question form
  const [newQuestion, setNewQuestion] = useState("");
  const [newOpt1, setNewOpt1] = useState("");
  const [newOpt2, setNewOpt2] = useState("");
  const [newOpt3, setNewOpt3] = useState("");
  const [newOpt4, setNewOpt4] = useState("");
  const [newCorrectIdx, setNewCorrectIdx] = useState(0);
  const [newCategory, setNewCategory] = useState<"Vocabulary" | "Grammar">("Vocabulary");
  const [newExplanation, setNewExplanation] = useState("");

  const handleLevelChange = (lvl: JLPTLevel) => {
    setActiveLevel(lvl);
    setQuestionsList(getQuestionsForLevel(lvl));
  };

  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return questionsList;
    const q = searchQuery.toLowerCase();
    return questionsList.filter(
      (item) =>
        item.question.includes(q) ||
        (item.explanation && item.explanation.toLowerCase().includes(q)) ||
        item.options.some((opt) => opt.toLowerCase().includes(q))
    );
  }, [questionsList, searchQuery]);

  const handleDelete = (index: number) => {
    if (confirm(`Delete question #${index + 1}?`)) {
      setQuestionsList((prev) => prev.filter((_, idx) => idx !== index));
      logAdminAction("EXAM_QUESTION_DELETED", `Deleted question #${index + 1} from ${activeLevel}`, "warning");
    }
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newOpt1.trim() || !newOpt2.trim()) return;

    const newEntry: AdminCMSQuestion = {
      id: `${activeLevel.toLowerCase()}-q-${questionsList.length + 1}`,
      level: activeLevel,
      question: newQuestion.trim(),
      options: [newOpt1.trim(), newOpt2.trim(), newOpt3.trim() || "—", newOpt4.trim() || "—"],
      correctIndex: newCorrectIdx,
      category: newCategory,
      explanation: newExplanation.trim() || "Official answer key verified in server vault.",
    };

    setQuestionsList((prev) => [newEntry, ...prev]);
    logAdminAction("EXAM_QUESTION_ADDED", `Added question to ${activeLevel}: "${newQuestion.slice(0, 30)}..."`, "info");

    setNewQuestion("");
    setNewOpt1("");
    setNewOpt2("");
    setNewOpt3("");
    setNewOpt4("");
    setNewExplanation("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Standardized Assessment Bank</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
            JLPT Mock Exam Question Bank
          </h1>
          <p className="text-xs text-[#E8E0D5]/70 mt-1">
            Manage randomized 20-question test batteries and configure pass threshold criteria.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C83C50] hover:bg-[#B03244] text-[#FFFFFF] text-xs font-bold shadow-lg shadow-[#C83C50]/20 flex items-center space-x-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Exam Question</span>
        </button>
      </div>

      {/* Control Bar */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8E0D5]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search question text or options..."
            className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl pl-10 pr-4 py-2 text-xs text-[#FFFFFF] placeholder-[#E8E0D5]/40 focus:outline-none focus:border-[#C83C50]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Sliders className="w-3.5 h-3.5 text-[#C83C50]" />
            <span className="text-xs text-[#E8E0D5]/70 font-medium">Pass Score:</span>
            <select
              value={passThreshold}
              onChange={(e) => setPassThreshold(Number(e.target.value))}
              className="bg-[#0B1323] border border-[#E8E0D5]/25 rounded-lg px-2.5 py-1 text-xs text-[#FFFFFF]"
            >
              <option value={60}>60% (12/20)</option>
              <option value={65}>65% (13/20)</option>
              <option value={70}>70% (14/20) - Official</option>
              <option value={75}>75% (15/20)</option>
              <option value={80}>80% (16/20)</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            {(["N5", "N4", "N3", "N2", "N1"] as JLPTLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => handleLevelChange(lvl)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeLevel === lvl
                    ? "bg-[#C83C50] text-[#FFFFFF]"
                    : "bg-[#0B1323] text-[#E8E0D5]/70 hover:text-[#FFFFFF]"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Cards List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#101C35] border border-[#E8E0D5]/15 space-y-3 hover:border-[#E8E0D5]/30 transition-all shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-[#C83C50] bg-[#C83C50]/15 px-2 py-0.5 rounded">
                  Q{idx + 1}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#E8E0D5]/10 text-[#E8E0D5]/80 font-medium">
                  {q.category}
                </span>
                <span className="text-xs text-[#E8E0D5]/50">JLPT {activeLevel}</span>
              </div>

              <button
                onClick={() => handleDelete(idx)}
                className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Delete Question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-base font-bold font-japanese text-[#FFFFFF]">
              {q.question}
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {q.options.map((opt, oIdx) => {
                const isMarkedCorrect = q.correctIndex !== undefined && oIdx === q.correctIndex;
                return (
                  <div
                    key={oIdx}
                    className={`p-2.5 rounded-xl border flex items-center space-x-2 font-japanese ${
                      isMarkedCorrect
                        ? "bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/40"
                        : "bg-[#0B1323] text-[#E8E0D5]/70 border-[#E8E0D5]/10"
                    }`}
                  >
                    <span className="font-sans font-bold">{oIdx + 1}.</span>
                    <span>{opt}</span>
                    {isMarkedCorrect && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-auto" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pedagogical Explanation / Server Vault Status */}
            <div className="p-3 rounded-xl bg-[#0B1323] border border-[#E8E0D5]/10 text-xs text-[#E8E0D5]/80 flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#C83C50]">Server Answer Key Vault: </strong>
                <span>
                  {q.explanation ||
                    "Answer key and explanations are cryptographically protected and evaluated exclusively via serverless HMAC grading."}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-bold text-[#FFFFFF]">Add Exam Item to {activeLevel}</h3>

            <form onSubmit={handleAddQuestion} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                  Question Text (Japanese)
                </label>
                <input
                  type="text"
                  required
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="「学生」の読み方は？"
                  className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs font-japanese text-[#FFFFFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Option 1
                  </label>
                  <input
                    type="text"
                    required
                    value={newOpt1}
                    onChange={(e) => setNewOpt1(e.target.value)}
                    placeholder="がくせい"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-1.5 text-xs text-[#FFFFFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Option 2
                  </label>
                  <input
                    type="text"
                    required
                    value={newOpt2}
                    onChange={(e) => setNewOpt2(e.target.value)}
                    placeholder="せんせい"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-1.5 text-xs text-[#FFFFFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Option 3
                  </label>
                  <input
                    type="text"
                    value={newOpt3}
                    onChange={(e) => setNewOpt3(e.target.value)}
                    placeholder="かいしゃいん"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-1.5 text-xs text-[#FFFFFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Option 4
                  </label>
                  <input
                    type="text"
                    value={newOpt4}
                    onChange={(e) => setNewOpt4(e.target.value)}
                    placeholder="いしゃ"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-1.5 text-xs text-[#FFFFFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Correct Option Index
                  </label>
                  <select
                    value={newCorrectIdx}
                    onChange={(e) => setNewCorrectIdx(Number(e.target.value))}
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-1.5 text-xs text-[#FFFFFF]"
                  >
                    <option value={0}>Option 1 is Correct</option>
                    <option value={1}>Option 2 is Correct</option>
                    <option value={2}>Option 3 is Correct</option>
                    <option value={3}>Option 4 is Correct</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as "Vocabulary" | "Grammar")}
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-1.5 text-xs text-[#FFFFFF]"
                  >
                    <option value="Vocabulary">Vocabulary</option>
                    <option value="Grammar">Grammar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                  Pedagogical Rule / Explanation
                </label>
                <input
                  type="text"
                  required
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="学生 is read がくせい and means student."
                  className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#E8E0D5]/15">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#E8E0D5]/70 hover:text-[#FFFFFF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C83C50] text-[#FFFFFF] text-xs font-bold hover:bg-[#B03244]"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { getGrammarForLevel, GrammarItem } from "@/data/grammar";
import { logAdminAction } from "@/lib/storage/adminState";
import {
  BookMarked,
  Search,
  Plus,
  Trash2,
  Filter,
} from "lucide-react";

export default function AdminGrammarCMSPage() {
  const [activeLevel, setActiveLevel] = useState("N5");
  const [grammarList, setGrammarList] = useState<GrammarItem[]>(() => getGrammarForLevel("N5"));
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Grammar Point form
  const [newPattern, setNewPattern] = useState("");
  const [newReading, setNewReading] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [newExampleJp, setNewExampleJp] = useState("");
  const [newExampleEn, setNewExampleEn] = useState("");

  const handleLevelChange = (lvl: string) => {
    setActiveLevel(lvl);
    setGrammarList(getGrammarForLevel(lvl));
  };

  const filteredGrammar = useMemo(() => {
    if (!searchQuery.trim()) return grammarList;
    const q = searchQuery.toLowerCase();
    return grammarList.filter(
      (g) =>
        g.pattern.toLowerCase().includes(q) ||
        g.reading.toLowerCase().includes(q) ||
        g.meaning.toLowerCase().includes(q)
    );
  }, [grammarList, searchQuery]);

  const handleDelete = (pattern: string) => {
    if (confirm(`Delete grammar pattern "${pattern}" from ${activeLevel}?`)) {
      setGrammarList((prev) => prev.filter((g) => g.pattern !== pattern));
      logAdminAction("GRAMMAR_DELETED", `Deleted grammar pattern: ${pattern} (${activeLevel})`, "warning");
    }
  };

  const handleAddGrammar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPattern.trim()) return;

    const newEntry: GrammarItem = {
      pattern: newPattern.trim(),
      reading: newReading.trim() || newPattern.trim(),
      meaning: newMeaning.trim(),
      exampleJp: newExampleJp.trim(),
      exampleEn: newExampleEn.trim(),
      level: activeLevel,
    };

    setGrammarList((prev) => [newEntry, ...prev]);
    logAdminAction("GRAMMAR_ADDED", `Added grammar pattern: ${newPattern} to ${activeLevel}`, "info");

    setNewPattern("");
    setNewReading("");
    setNewMeaning("");
    setNewExampleJp("");
    setNewExampleEn("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Grammar Decks CMS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
            JLPT Grammar Rules CMS
          </h1>
          <p className="text-xs text-[#E8E0D5]/70 mt-1">
            Author and refine grammatical formulas, usage criteria, and bilingual example sentences.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C83C50] hover:bg-[#B03244] text-[#FFFFFF] text-xs font-bold shadow-lg shadow-[#C83C50]/20 flex items-center space-x-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Grammar Point</span>
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
            placeholder="Search pattern or meaning..."
            className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl pl-10 pr-4 py-2 text-xs text-[#FFFFFF] placeholder-[#E8E0D5]/40 focus:outline-none focus:border-[#C83C50]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-[#E8E0D5]/60" />
          <span className="text-xs text-[#E8E0D5]/60 font-medium">Level:</span>
          {["N5", "N4", "N3", "N2", "N1"].map((lvl) => (
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

      {/* Grammar Table */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[#E8E0D5]/60 border-b border-[#E8E0D5]/10">
              <tr>
                <th className="py-3 px-3">Grammar Pattern</th>
                <th className="py-3 px-3">Reading</th>
                <th className="py-3 px-3">Meaning / Function</th>
                <th className="py-3 px-3">Example Japanese</th>
                <th className="py-3 px-3">Example English</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D5]/10">
              {filteredGrammar.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#E8E0D5]/5 transition-colors">
                  <td className="py-3.5 px-3 font-bold font-japanese text-base text-[#FFFFFF]">
                    {item.pattern}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[#E8E0D5]/70">
                    {item.reading}
                  </td>
                  <td className="py-3.5 px-3 text-[#E8E0D5]/90 max-w-xs">
                    {item.meaning}
                  </td>
                  <td className="py-3.5 px-3 font-japanese text-[#FFFFFF]">
                    {item.exampleJp}
                  </td>
                  <td className="py-3.5 px-3 text-[#E8E0D5]/70 italic">
                    {item.exampleEn}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleDelete(item.pattern)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-bold text-[#FFFFFF]">Add Grammar Pattern to {activeLevel}</h3>

            <form onSubmit={handleAddGrammar} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Pattern Formula
                  </label>
                  <input
                    type="text"
                    required
                    value={newPattern}
                    onChange={(e) => setNewPattern(e.target.value)}
                    placeholder="〜ことにする"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Reading
                  </label>
                  <input
                    type="text"
                    value={newReading}
                    onChange={(e) => setNewReading(e.target.value)}
                    placeholder="ことにする"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                  Meaning & Pedagogical Function
                </label>
                <input
                  type="text"
                  required
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  placeholder="Expresses a decision made by the speaker (decide to do)."
                  className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                  Example Sentence (Japanese)
                </label>
                <input
                  type="text"
                  required
                  value={newExampleJp}
                  onChange={(e) => setNewExampleJp(e.target.value)}
                  placeholder="毎朝走ることにしました。"
                  className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs font-japanese text-[#FFFFFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                  Example Translation (English)
                </label>
                <input
                  type="text"
                  required
                  value={newExampleEn}
                  onChange={(e) => setNewExampleEn(e.target.value)}
                  placeholder="I have decided to run every morning."
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
                  Save Grammar Point
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

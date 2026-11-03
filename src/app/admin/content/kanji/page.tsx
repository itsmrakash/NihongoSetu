"use client";

import React, { useState, useMemo } from "react";
import { getKanjiForLevel, KanjiCardItem } from "@/data/kanji";
import { logAdminAction } from "@/lib/storage/adminState";
import {
  Sparkles,
  Search,
  Plus,
  Trash2,
  Filter,
} from "lucide-react";

export default function AdminKanjiCMSPage() {
  const [activeLevel, setActiveLevel] = useState("N5");
  const [kanjiList, setKanjiList] = useState<KanjiCardItem[]>(() => getKanjiForLevel("N5"));
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Kanji form
  const [newChar, setNewChar] = useState("");
  const [newKunyomi, setNewKunyomi] = useState("");
  const [newOnyomi, setNewOnyomi] = useState("");
  const [newMeanings, setNewMeanings] = useState("");
  const [newExamples, setNewExamples] = useState("");

  const handleLevelChange = (lvl: string) => {
    setActiveLevel(lvl);
    setKanjiList(getKanjiForLevel(lvl));
  };

  const filteredKanji = useMemo(() => {
    if (!searchQuery.trim()) return kanjiList;
    const q = searchQuery.toLowerCase();
    return kanjiList.filter(
      (k) =>
        k.character.includes(q) ||
        k.onyomi.toLowerCase().includes(q) ||
        k.kunyomi.toLowerCase().includes(q) ||
        k.meanings.toLowerCase().includes(q)
    );
  }, [kanjiList, searchQuery]);

  const handleDelete = (char: string) => {
    if (confirm(`Remove Kanji "${char}" from ${activeLevel} database?`)) {
      setKanjiList((prev) => prev.filter((k) => k.character !== char));
      logAdminAction("KANJI_DELETED", `Removed Kanji: ${char} (${activeLevel})`, "warning");
    }
  };

  const handleAddKanji = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChar.trim()) return;

    const newEntry: KanjiCardItem = {
      character: newChar.trim(),
      kunyomi: newKunyomi.trim(),
      onyomi: newOnyomi.trim(),
      meanings: newMeanings.trim(),
      examples: newExamples.trim(),
      level: activeLevel,
    };

    setKanjiList((prev) => [newEntry, ...prev]);
    logAdminAction("KANJI_ADDED", `Added Kanji: ${newChar} to ${activeLevel}`, "info");

    setNewChar("");
    setNewKunyomi("");
    setNewOnyomi("");
    setNewMeanings("");
    setNewExamples("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kanji Management System</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
            Kanji Vault Database CMS
          </h1>
          <p className="text-xs text-[#E8E0D5]/70 mt-1">
            Browse and modify Kanji readings, stroke counts, and compound examples across JLPT N5–N1.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C83C50] hover:bg-[#B03244] text-[#FFFFFF] text-xs font-bold shadow-lg shadow-[#C83C50]/20 flex items-center space-x-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Kanji Character</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8E0D5]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search character, on, kun, or meaning..."
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

      {/* Kanji Table */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[#E8E0D5]/60 border-b border-[#E8E0D5]/10">
              <tr>
                <th className="py-3 px-3">Kanji</th>
                <th className="py-3 px-3">Meaning</th>
                <th className="py-3 px-3">訓読み (Kun)</th>
                <th className="py-3 px-3">音読み (On)</th>
                <th className="py-3 px-3">Compounds (熟語)</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D5]/10">
              {filteredKanji.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#E8E0D5]/5 transition-colors">
                  <td className="py-3.5 px-3 font-bold font-japanese text-2xl text-[#FFFFFF]">
                    {item.character}
                  </td>
                  <td className="py-3.5 px-3 font-medium text-[#FFFFFF]">
                    {item.meanings}
                  </td>
                  <td className="py-3.5 px-3 font-japanese text-[#E8E0D5]/80">
                    {item.kunyomi || "—"}
                  </td>
                  <td className="py-3.5 px-3 font-japanese text-[#E8E0D5]/80">
                    {item.onyomi || "—"}
                  </td>
                  <td className="py-3.5 px-3 font-japanese text-[#E8E0D5]/70 max-w-xs truncate">
                    {item.examples || "—"}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleDelete(item.character)}
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
            <h3 className="text-lg font-bold text-[#FFFFFF]">Add Kanji to JLPT {activeLevel}</h3>

            <form onSubmit={handleAddKanji} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                  Kanji Character
                </label>
                <input
                  type="text"
                  required
                  maxLength={2}
                  value={newChar}
                  onChange={(e) => setNewChar(e.target.value)}
                  placeholder="空"
                  className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-base font-japanese text-[#FFFFFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                  Meanings (English)
                </label>
                <input
                  type="text"
                  required
                  value={newMeanings}
                  onChange={(e) => setNewMeanings(e.target.value)}
                  placeholder="sky; empty; vacant"
                  className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Kun&apos;yomi (Japanese)
                  </label>
                  <input
                    type="text"
                    value={newKunyomi}
                    onChange={(e) => setNewKunyomi(e.target.value)}
                    placeholder="そら・あく"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    On&apos;yomi (Sino)
                  </label>
                  <input
                    type="text"
                    value={newOnyomi}
                    onChange={(e) => setNewOnyomi(e.target.value)}
                    placeholder="クウ"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                  Compound Words & Examples
                </label>
                <input
                  type="text"
                  value={newExamples}
                  onChange={(e) => setNewExamples(e.target.value)}
                  placeholder="空気（くうき）= air; 青空（あおぞら）= blue sky"
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
                  Save Kanji
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

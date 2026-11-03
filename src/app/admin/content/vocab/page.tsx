"use client";

import React, { useState, useMemo } from "react";
import { CORE_VOCABULARY, MultilingualVocabWord } from "@/data/vocab";
import { logAdminAction } from "@/lib/storage/adminState";
import {
  Layers,
  Search,
  Plus,
  Trash2,
  Volume2,
  Filter,
  CheckCircle2,
} from "lucide-react";

export default function AdminVocabCMSPage() {
  const [vocabList, setVocabList] = useState<MultilingualVocabWord[]>(CORE_VOCABULARY);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Term Form
  const [newKanji, setNewKanji] = useState("");
  const [newReading, setNewReading] = useState("");
  const [newRomaji, setNewRomaji] = useState("");
  const [newMeaningEn, setNewMeaningEn] = useState("");
  const [newMeaningTa, setNewMeaningTa] = useState("");
  const [newMeaningHi, setNewMeaningHi] = useState("");
  const [newCategory, setNewCategory] = useState("Basics");

  const filteredVocab = useMemo(() => {
    return vocabList.filter((v) => {
      const matchCat = activeCategory === "All" || v.category === activeCategory;
      if (!matchCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        v.kanji.toLowerCase().includes(q) ||
        v.reading.toLowerCase().includes(q) ||
        v.romaji.toLowerCase().includes(q) ||
        (v.meaning.en || "").toLowerCase().includes(q)
      );
    });
  }, [vocabList, searchQuery, activeCategory]);

  const handleDelete = (kanji: string) => {
    if (confirm(`Delete "${kanji}" from the vocabulary database?`)) {
      setVocabList((prev) => prev.filter((v) => v.kanji !== kanji));
      logAdminAction("VOCAB_TERM_DELETED", `Deleted vocabulary item: ${kanji}`, "warning");
    }
  };

  const handleAddTerm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKanji.trim() || !newReading.trim()) return;

    const newWord: MultilingualVocabWord = {
      kanji: newKanji.trim(),
      reading: newReading.trim(),
      romaji: newRomaji.trim() || newReading.trim(),
      category: newCategory,
      exampleJa: `${newKanji.trim()}があります。`,
      exampleEn: `There is a ${newMeaningEn.trim()}.`,
      meaning: {
        en: newMeaningEn.trim(),
        ta: newMeaningTa.trim() || newMeaningEn.trim(),
        hi: newMeaningHi.trim() || newMeaningEn.trim(),
      },
    };

    setVocabList((prev) => [newWord, ...prev]);
    logAdminAction("VOCAB_TERM_ADDED", `Added new vocabulary item: ${newKanji}`, "info");

    setNewKanji("");
    setNewReading("");
    setNewRomaji("");
    setNewMeaningEn("");
    setNewMeaningTa("");
    setNewMeaningHi("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
            <Layers className="w-3.5 h-3.5" />
            <span>Content Management System</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
            Vocabulary Database & 12-Language CMS
          </h1>
          <p className="text-xs text-[#E8E0D5]/70 mt-1">
            Publish, edit, and localize vocabulary entries across all supported Asian and European languages.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C83C50] hover:bg-[#B03244] text-[#FFFFFF] text-xs font-bold shadow-lg shadow-[#C83C50]/20 flex items-center space-x-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vocabulary Item</span>
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
            placeholder="Search word, kana, or meaning..."
            className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl pl-10 pr-4 py-2 text-xs text-[#FFFFFF] placeholder-[#E8E0D5]/40 focus:outline-none focus:border-[#C83C50]"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
          {["All", "Basics", "People", "Places", "Food & drink", "Verbs"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-[#C83C50] text-[#FFFFFF]"
                  : "bg-[#0B1323] text-[#E8E0D5]/70 hover:text-[#FFFFFF]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Table */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[#E8E0D5]/60 border-b border-[#E8E0D5]/10">
              <tr>
                <th className="py-3 px-3">Word (Kanji)</th>
                <th className="py-3 px-3">Reading & Romaji</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">English</th>
                <th className="py-3 px-3">Tamil (தமிழ்)</th>
                <th className="py-3 px-3">Hindi (हिन्दी)</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D5]/10">
              {filteredVocab.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#E8E0D5]/5 transition-colors">
                  <td className="py-3.5 px-3 font-bold font-japanese text-base text-[#FFFFFF]">
                    {item.kanji}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-japanese text-[#FFFFFF]">{item.reading}</div>
                    <div className="text-[10px] text-[#E8E0D5]/50 font-mono">{item.romaji}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8E0D5]/10 text-[#E8E0D5]/80">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-[#FFFFFF]">
                    {item.meaning.en}
                  </td>
                  <td className="py-3.5 px-3 text-[#E8E0D5]/80">
                    {item.meaning.ta || "—"}
                  </td>
                  <td className="py-3.5 px-3 text-[#E8E0D5]/80">
                    {item.meaning.hi || "—"}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleDelete(item.kanji)}
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

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-bold text-[#FFFFFF]">Add Vocabulary Term</h3>

            <form onSubmit={handleAddTerm} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Kanji / Written Form
                  </label>
                  <input
                    type="text"
                    required
                    value={newKanji}
                    onChange={(e) => setNewKanji(e.target.value)}
                    placeholder="電車"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Kana Reading
                  </label>
                  <input
                    type="text"
                    required
                    value={newReading}
                    onChange={(e) => setNewReading(e.target.value)}
                    placeholder="でんしゃ"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Romaji
                  </label>
                  <input
                    type="text"
                    value={newRomaji}
                    onChange={(e) => setNewRomaji(e.target.value)}
                    placeholder="densha"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                  >
                    <option value="Basics">Basics</option>
                    <option value="People">People</option>
                    <option value="Places">Places</option>
                    <option value="Food & drink">Food & drink</option>
                    <option value="Verbs">Verbs</option>
                    <option value="Things">Things</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                  English Meaning
                </label>
                <input
                  type="text"
                  required
                  value={newMeaningEn}
                  onChange={(e) => setNewMeaningEn(e.target.value)}
                  placeholder="electric train"
                  className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Tamil (தமிழ்)
                  </label>
                  <input
                    type="text"
                    value={newMeaningTa}
                    onChange={(e) => setNewMeaningTa(e.target.value)}
                    placeholder="மின்சார ரயில்"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                    Hindi (हिन्दी)
                  </label>
                  <input
                    type="text"
                    value={newMeaningHi}
                    onChange={(e) => setNewMeaningHi(e.target.value)}
                    placeholder="लोकल ट्रेन / रेलगाड़ी"
                    className="w-full bg-[#0B1323] border border-[#E8E0D5]/25 rounded-xl px-3 py-2 text-xs text-[#FFFFFF]"
                  />
                </div>
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
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getKanjiForLevel, KANJI_TARGET_COUNTS, KanjiCardItem } from "@/data/kanji";
import { getStudentProfile, toggleLearnedKanji, StudentProfile } from "@/lib/storage/studentState";
import {
  Sparkles,
  Search,
  Volume2,
  CheckCircle2,
  BookOpen,
  Layers,
  Award,
} from "lucide-react";

const LEVELS = ["N5", "N4", "N3", "N2", "N1"];

export default function KanjiVaultPage() {
  const [activeLevel, setActiveLevel] = useState("N5");
  const [searchQuery, setSearchQuery] = useState("");
  const [learnedKanji, setLearnedKanji] = useState<string[]>(() => getStudentProfile().learnedKanji || []);

  const kanjiList = useMemo(() => {
    return getKanjiForLevel(activeLevel);
  }, [activeLevel]);

  const [selectedKanjiChar, setSelectedKanjiChar] = useState<string | null>(null);

  const selectedKanji = useMemo(() => {
    if (selectedKanjiChar) {
      const found = kanjiList.find((k) => k.character === selectedKanjiChar);
      if (found) return found;
    }
    return kanjiList[0] || null;
  }, [kanjiList, selectedKanjiChar]);

  const filteredKanji = useMemo(() => {
    if (!searchQuery.trim()) return kanjiList;
    const q = searchQuery.toLowerCase();
    return kanjiList.filter(
      (item) =>
        item.character.includes(q) ||
        item.onyomi.toLowerCase().includes(q) ||
        item.kunyomi.toLowerCase().includes(q) ||
        item.meanings.toLowerCase().includes(q) ||
        item.examples.toLowerCase().includes(q)
    );
  }, [kanjiList, searchQuery]);

  const handleToggleLearned = (char: string) => {
    toggleLearnedKanji(char);
    setLearnedKanji((prev) =>
      prev.includes(char) ? prev.filter((k) => k !== char) : [...prev, char]
    );
  };

  const speakJapanese = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  const targetCount = (KANJI_TARGET_COUNTS as Record<string, number>)[activeLevel] || 100;
  const currentLearnedInDeck = kanjiList.filter((k) => learnedKanji.includes(k.character)).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kanji Vault Mastery</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
            JLPT Kanji Explorer & Readings
          </h1>
          <p className="text-xs text-[#E8E0D5]/70 mt-1">
            Explore On&apos;yomi, Kun&apos;yomi readings, meanings, and real compound word examples.
          </p>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center bg-[#101C35] p-1 rounded-xl border border-[#E8E0D5]/20 shrink-0">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setActiveLevel(lvl);
                setSearchQuery("");
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeLevel === lvl
                  ? "bg-[#C83C50] text-[#FFFFFF] shadow-md shadow-[#C83C50]/30"
                  : "text-[#E8E0D5]/70 hover:text-[#FFFFFF]"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Level Target Progress & Search */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-2 flex-1 max-w-md">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#FFFFFF]">
              JLPT {activeLevel} Mastery Progress:
            </span>
            <span className="text-[#E8E0D5]/70">
              {currentLearnedInDeck} / {kanjiList.length} in Deck (Official Target: {targetCount})
            </span>
          </div>
          <div className="w-full bg-[#E8E0D5]/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#C83C50] h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.round((currentLearnedInDeck / (kanjiList.length || 1)) * 100))}%`,
              }}
            />
          </div>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8E0D5]/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search character, reading, or meaning..."
            className="w-full bg-[#101C35] border border-[#E8E0D5]/25 rounded-xl pl-10 pr-4 py-2 text-xs text-[#FFFFFF] placeholder-[#E8E0D5]/40 focus:outline-none focus:border-[#C83C50]"
          />
        </div>
      </div>

      {/* Main Two-Column View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Kanji Grid Selector (7 cols) */}
        <div className="lg:col-span-7 bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between text-xs text-[#E8E0D5]/70 pb-2 border-b border-[#E8E0D5]/10">
            <span>Showing {filteredKanji.length} Kanji Characters</span>
            <span>Click to inspect details</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 max-h-[560px] overflow-y-auto pr-1">
            {filteredKanji.map((item, idx) => {
              const isSelected = selectedKanji?.character === item.character;
              const isLearned = learnedKanji.includes(item.character);

              return (
                <button
                  key={`${item.character}-${idx}`}
                  onClick={() => {
                    setSelectedKanjiChar(item.character);
                    speakJapanese(item.character);
                  }}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all relative ${
                    isSelected
                      ? "bg-[#C83C50] text-[#FFFFFF] shadow-lg shadow-[#C83C50]/30 scale-105 border border-[#FFFFFF]/40"
                      : isLearned
                      ? "bg-[#101C35] text-[#FFFFFF] border-2 border-emerald-500/50"
                      : "bg-[#E8E0D5]/5 hover:bg-[#E8E0D5]/15 text-[#E8E0D5] border border-[#E8E0D5]/10"
                  }`}
                >
                  {isLearned && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
                  )}
                  <span className="text-3xl font-bold font-japanese mb-1">
                    {item.character}
                  </span>
                  <span className="text-[10px] truncate max-w-full opacity-70">
                    {item.meanings.split(";")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Kanji Deep-Dive Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl sticky top-24">
          {selectedKanji ? (
            <>
              {/* Kanji Hero Showcase */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-2xl bg-[#0B1323] border border-[#E8E0D5]/20 flex items-center justify-center font-japanese text-5xl font-extrabold text-[#FFFFFF] shadow-inner">
                    {selectedKanji.character}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-black text-[#FFFFFF]">
                        {selectedKanji.meanings}
                      </span>
                    </div>
                    <div className="text-xs text-[#E8E0D5]/60 mt-1">
                      JLPT Level: <span className="font-bold text-[#C83C50]">{activeLevel}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => speakJapanese(selectedKanji.character)}
                    className="p-2.5 rounded-xl bg-[#C83C50]/20 hover:bg-[#C83C50]/30 text-[#C83C50] transition-colors"
                    title="Pronounce Character"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleToggleLearned(selectedKanji.character)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      learnedKanji.includes(selectedKanji.character)
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                        : "bg-[#E8E0D5]/10 text-[#E8E0D5]/40 border-[#E8E0D5]/20 hover:text-emerald-400"
                    }`}
                    title={learnedKanji.includes(selectedKanji.character) ? "Mastered" : "Mark as Mastered"}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Readings Section */}
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-[#0B1323] border border-[#E8E0D5]/10 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#C83C50]">
                    訓読み · Kun&apos;yomi (Japanese Native)
                  </div>
                  <div className="text-sm font-semibold font-japanese text-[#FFFFFF]">
                    {selectedKanji.kunyomi || "—"}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0B1323] border border-[#E8E0D5]/10 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    音読み · On&apos;yomi (Sino-Japanese)
                  </div>
                  <div className="text-sm font-semibold font-japanese text-[#FFFFFF]">
                    {selectedKanji.onyomi || "—"}
                  </div>
                </div>
              </div>

              {/* Compound Reading Examples */}
              <div className="p-4 rounded-xl bg-[#0B1323] border border-[#E8E0D5]/10 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#E8E0D5]/70">
                  Compounds & Word Examples · 熟語
                </div>
                <div className="text-sm font-medium font-japanese text-[#FFFFFF] leading-relaxed">
                  {selectedKanji.examples}
                </div>
                <button
                  onClick={() => speakJapanese(selectedKanji.examples)}
                  className="text-xs text-[#C83C50] hover:underline flex items-center space-x-1 pt-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Pronounce Examples</span>
                </button>
              </div>

              {/* Status indicator */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#E8E0D5]/60 border-t border-[#E8E0D5]/10">
                <span>
                  Status:{" "}
                  <strong className={learnedKanji.includes(selectedKanji.character) ? "text-emerald-400" : "text-[#E8E0D5]"}>
                    {learnedKanji.includes(selectedKanji.character) ? "Mastered" : "In Progress"}
                  </strong>
                </span>
                <button
                  onClick={() => handleToggleLearned(selectedKanji.character)}
                  className="text-xs font-semibold text-[#C83C50] hover:underline"
                >
                  {learnedKanji.includes(selectedKanji.character) ? "Remove Mastered" : "Mark Mastered"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-xs text-[#E8E0D5]/50">
              Select a Kanji character from the grid to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

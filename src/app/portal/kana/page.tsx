"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { BASIC_KANA, DAKUON_KANA, YOON_KANA, KanaItem } from "@/data/kana";
import {
  PenTool,
  Volume2,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Layers,
  Eye,
  EyeOff,
} from "lucide-react";

export default function KanaStudioPage() {
  const [scriptType, setScriptType] = useState<"hira" | "kata">("hira");
  const [groupType, setGroupType] = useState<"basic" | "dakuon" | "yoon">("basic");
  const [selectedKana, setSelectedKana] = useState<KanaItem>(BASIC_KANA[0]);
  const [showGuide, setShowGuide] = useState(true);
  const [brushColor, setBrushColor] = useState<string>("#C83C50");

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Audio Pronunciation
  const speakKana = useCallback((text: string) => {
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
  }, []);

  const getActiveList = (): KanaItem[] => {
    if (groupType === "dakuon") return DAKUON_KANA;
    if (groupType === "yoon") return YOON_KANA;
    return BASIC_KANA;
  };

  const activeList = getActiveList();

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    clearCanvas();
  }, [selectedKana, scriptType, clearCanvas]);

  // Drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = ("clientX" in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ("clientY" in e ? e.clientY : e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = brushColor;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ("clientX" in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ("clientY" in e ? e.clientY : e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const activeChar = scriptType === "hira" ? selectedKana.hira : selectedKana.kata;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
            <PenTool className="w-3.5 h-3.5" />
            <span>Kana Foundation Studio</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
            Japanese Kana & Stroke Canvas
          </h1>
          <p className="text-xs text-[#E8E0D5]/70 mt-1">
            Master Hiragana & Katakana pronunciation, romaji readings, and stroke order drawing.
          </p>
        </div>

        {/* Script Switcher */}
        <div className="flex items-center bg-[#101C35] p-1 rounded-xl border border-[#E8E0D5]/20 shrink-0">
          <button
            onClick={() => setScriptType("hira")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              scriptType === "hira"
                ? "bg-[#C83C50] text-[#FFFFFF] shadow"
                : "text-[#E8E0D5]/70 hover:text-[#FFFFFF]"
            }`}
          >
            Hiragana (ひらがな)
          </button>
          <button
            onClick={() => setScriptType("kata")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              scriptType === "kata"
                ? "bg-[#C83C50] text-[#FFFFFF] shadow"
                : "text-[#E8E0D5]/70 hover:text-[#FFFFFF]"
            }`}
          >
            Katakana (カタカナ)
          </button>
        </div>
      </div>

      {/* Main Studio Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Canvas Drawing & Character Details (5 cols) */}
        <div className="lg:col-span-5 bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-4xl font-black font-japanese text-[#FFFFFF]">
                {activeChar}
              </span>
              <div>
                <div className="text-sm font-bold text-[#E8E0D5]">
                  Romaji: <span className="text-[#FFFFFF]">{selectedKana.romaji}</span>
                </div>
                <div className="text-[11px] text-[#E8E0D5]/60">
                  {selectedKana.strokes ? `${selectedKana.strokes} Strokes` : "Standard Stroke Order"}
                </div>
              </div>
            </div>

            <button
              onClick={() => speakKana(activeChar)}
              className="p-3 rounded-xl bg-[#C83C50]/20 hover:bg-[#C83C50]/30 text-[#C83C50] border border-[#C83C50]/30 transition-colors"
              title="Hear Native Pronunciation"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Drawing Canvas Box */}
          <div className="relative w-full aspect-square max-w-[320px] mx-auto rounded-2xl bg-[#0B1323] border-2 border-[#E8E0D5]/20 overflow-hidden shadow-inner flex items-center justify-center">
            {/* Guide Grid Crosshairs */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-full h-px border-b border-dashed border-[#E8E0D5]/15" />
              <div className="h-full w-px border-r border-dashed border-[#E8E0D5]/15 absolute" />
            </div>

            {/* Ghost Background Guideline */}
            {showGuide && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-[160px] font-black font-japanese text-[#FFFFFF]/10 leading-none">
                  {activeChar}
                </span>
              </div>
            )}

            {/* Actual HTML5 Drawing Canvas */}
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            />
          </div>

          {/* Canvas Controls */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setBrushColor("#C83C50")}
                className={`w-6 h-6 rounded-full bg-[#C83C50] border-2 ${
                  brushColor === "#C83C50" ? "border-[#FFFFFF]" : "border-transparent"
                }`}
                title="Sakura Red Brush"
              />
              <button
                onClick={() => setBrushColor("#FFFFFF")}
                className={`w-6 h-6 rounded-full bg-[#FFFFFF] border-2 ${
                  brushColor === "#FFFFFF" ? "border-[#C83C50]" : "border-transparent"
                }`}
                title="White Ink Brush"
              />
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="px-2.5 py-1 rounded-lg text-xs bg-[#E8E0D5]/10 hover:bg-[#E8E0D5]/20 text-[#E8E0D5] flex items-center space-x-1 transition-colors"
              >
                {showGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showGuide ? "Hide Ghost" : "Show Ghost"}</span>
              </button>
            </div>

            <button
              onClick={clearCanvas}
              className="px-3 py-1.5 rounded-lg bg-[#E8E0D5]/10 hover:bg-[#E8E0D5]/20 text-[#E8E0D5] text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Right Column: Character Selection Tables (7 cols) */}
        <div className="lg:col-span-7 bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 space-y-6 shadow-2xl">
          {/* Sub-Group Switcher */}
          <div className="flex items-center justify-between border-b border-[#E8E0D5]/15 pb-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setGroupType("basic")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  groupType === "basic"
                    ? "bg-[#C83C50] text-[#FFFFFF]"
                    : "text-[#E8E0D5]/70 hover:bg-[#E8E0D5]/10"
                }`}
              >
                Basic (46)
              </button>
              <button
                onClick={() => setGroupType("dakuon")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  groupType === "dakuon"
                    ? "bg-[#C83C50] text-[#FFFFFF]"
                    : "text-[#E8E0D5]/70 hover:bg-[#E8E0D5]/10"
                }`}
              >
                Dakuon / Voiced (25)
              </button>
              <button
                onClick={() => setGroupType("yoon")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  groupType === "yoon"
                    ? "bg-[#C83C50] text-[#FFFFFF]"
                    : "text-[#E8E0D5]/70 hover:bg-[#E8E0D5]/10"
                }`}
              >
                Yoon / Glides (21)
              </button>
            </div>

            <span className="text-xs text-[#E8E0D5]/50 hidden sm:inline">
              Click character to draw
            </span>
          </div>

          {/* Character Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
            {activeList.map((item, idx) => {
              const char = scriptType === "hira" ? item.hira : item.kata;
              const isSelected = selectedKana.romaji === item.romaji;
              return (
                <button
                  key={`${item.romaji}-${idx}`}
                  onClick={() => {
                    setSelectedKana(item);
                    speakKana(char);
                  }}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#C83C50] text-[#FFFFFF] shadow-lg shadow-[#C83C50]/30 scale-105 border border-[#FFFFFF]/40"
                      : "bg-[#E8E0D5]/5 hover:bg-[#E8E0D5]/15 text-[#E8E0D5] border border-[#E8E0D5]/10"
                  }`}
                >
                  <span className="text-2xl font-bold font-japanese leading-none mb-1">
                    {char}
                  </span>
                  <span className="text-[10px] font-mono opacity-70 leading-none">
                    {item.romaji}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { JLPT_PLAYLISTS } from "@/data/media";
import { Video, ExternalLink, Play, Sparkles, BookOpen, Clock } from "lucide-react";

export default function VideoAcademyPage() {
  const [selectedLevel, setSelectedLevel] = useState("N5");

  const currentPlaylist =
    JLPT_PLAYLISTS.find((p) => p.level === selectedLevel) || JLPT_PLAYLISTS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
            <Video className="w-3.5 h-3.5" />
            <span>Curated Video Academy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
            JLPT Video Masterclasses
          </h1>
          <p className="text-xs text-[#E8E0D5]/70 mt-1">
            Structured video playlists designed to guide you step-by-step through each JLPT level.
          </p>
        </div>

        {/* Level Tabs */}
        <div className="flex items-center bg-[#101C35] p-1 rounded-xl border border-[#E8E0D5]/20 shrink-0">
          {JLPT_PLAYLISTS.map((item) => (
            <button
              key={item.level}
              onClick={() => setSelectedLevel(item.level)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedLevel === item.level
                  ? "bg-[#C83C50] text-[#FFFFFF] shadow"
                  : "text-[#E8E0D5]/70 hover:text-[#FFFFFF]"
              }`}
            >
              JLPT {item.level}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Video Player Shell */}
      <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E0D5]/15 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#C83C50] text-[#FFFFFF]">
                JLPT {currentPlaylist.level}
              </span>
              <h2 className="text-lg font-bold text-[#FFFFFF]">
                {currentPlaylist.desc} Playlist
              </h2>
            </div>
            <p className="text-xs text-[#E8E0D5]/70 mt-1">
              Complete video series covering grammar patterns, vocabulary drills, and listening passages.
            </p>
          </div>

          <a
            href={currentPlaylist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#C83C50] text-[#FFFFFF] text-xs font-bold shadow-lg shadow-[#C83C50]/20 hover:bg-[#C83C50]/90 transition-all shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Open in YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Embedded Iframe */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#E8E0D5]/15 bg-black">
          <iframe
            src={`https://www.youtube.com/embed/videoseries?list=${currentPlaylist.url.split("list=")[1]}`}
            title={`JLPT ${currentPlaylist.level} Video Course`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        {/* Video Study Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#E8E0D5]/5 border border-[#E8E0D5]/10 space-y-1">
            <div className="text-xs font-bold text-[#FFFFFF] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C83C50]" />
              <span>1. Shadowing Technique</span>
            </div>
            <p className="text-[11px] text-[#E8E0D5]/70 leading-relaxed">
              Repeat each spoken sentence immediately after the instructor to internalize pitch accent.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#E8E0D5]/5 border border-[#E8E0D5]/10 space-y-1">
            <div className="text-xs font-bold text-[#FFFFFF] flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>2. Note Key Particles</span>
            </div>
            <p className="text-[11px] text-[#E8E0D5]/70 leading-relaxed">
              Pay close attention to particle usage (は vs が, に vs で) in authentic conversational context.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#E8E0D5]/5 border border-[#E8E0D5]/10 space-y-1">
            <div className="text-xs font-bold text-[#FFFFFF] flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>3. Consistent 15-Minute Daily Habit</span>
            </div>
            <p className="text-[11px] text-[#E8E0D5]/70 leading-relaxed">
              Watching one short lesson per day yields vastly superior retention over weekly cramming.
            </p>
          </div>
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#FFFFFF]">All JLPT Video Playlists</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {JLPT_PLAYLISTS.map((item) => (
            <div
              key={item.level}
              onClick={() => setSelectedLevel(item.level)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedLevel === item.level
                  ? "bg-[#C83C50]/15 border-[#C83C50] text-[#FFFFFF]"
                  : "bg-[#101C35] border-[#E8E0D5]/15 text-[#E8E0D5]/80 hover:border-[#E8E0D5]/30"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#C83C50]/20 text-[#C83C50] font-bold text-xs flex items-center justify-center mb-2">
                {item.level}
              </div>
              <h4 className="text-xs font-bold text-[#FFFFFF]">{item.desc}</h4>
              <p className="text-[10px] text-[#E8E0D5]/60 mt-1">Full Curriculum Series</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

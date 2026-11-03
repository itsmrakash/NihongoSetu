"use client";

import React, { useState } from "react";
import PublicNavbar from "@/components/public/Navbar";
import PublicFooter from "@/components/public/Footer";
import { Mail, MessageSquare, Send, CheckCircle2, HelpCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "Is NihongoSetu completely free to use?",
      a: "Yes. All core learning materials, including Kana stroke practice, vocabulary vaults, kanji lists, grammar decks, and JLPT practice tests are free to all students."
    },
    {
      q: "How does the multi-lingual translation work?",
      a: "Our dictionary maps each Japanese word to meanings in 12 languages. You can select your preferred native language in the top bar to immediately customize your display."
    },
    {
      q: "Will my study progress be saved without an account?",
      a: "Yes. NihongoSetu uses offline-first local storage. Your streaks, quiz scores, and exam passes are saved directly on your device. You can export a JSON backup at any time from the Settings page."
    },
    {
      q: "Which JLPT levels are currently covered?",
      a: "We provide comprehensive N5 content and practice exam question banks for N5, N4, N3, N2, and N1."
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
              <MessageSquare className="w-3.5 h-3.5 text-[#C83C50]" />
              <span>Get in Touch · お問い合わせ</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#FFFFFF] tracking-tight">
              Contact & Platform Support
            </h1>
            <p className="text-base sm:text-lg text-[#E8E0D5]/80 font-light leading-relaxed">
              Have questions regarding our curriculum, technical suggestions, or educational partnership inquiries? Send us a message below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="rounded-3xl bg-[#FFFFFF]/5 border border-[#E8E0D5]/15 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[#FFFFFF] mb-6 flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#C83C50]" />
                <span>Send a Message</span>
              </h2>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Message Received</h3>
                  <p className="text-sm text-[#E8E0D5]/80">
                    Thank you for reaching out, {formData.name}. Our academic and technical team will review your inquiry.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", category: "General Inquiry", message: "" });
                    }}
                    className="mt-4 px-6 py-2 rounded-xl bg-[#E8E0D5]/10 text-xs text-[#E8E0D5] hover:bg-[#E8E0D5]/20 transition-colors"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#101C35] border border-[#E8E0D5]/20 text-[#FFFFFF] text-sm focus:outline-none focus:border-[#C83C50] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#101C35] border border-[#E8E0D5]/20 text-[#FFFFFF] text-sm focus:outline-none focus:border-[#C83C50] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                      Topic Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#101C35] border border-[#E8E0D5]/20 text-[#FFFFFF] text-sm focus:outline-none focus:border-[#C83C50] transition-colors"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Content Correction">Vocabulary / Grammar Correction</option>
                      <option value="Technical Issue">Technical / Audio / Canvas Bug</option>
                      <option value="Institutional Partnership">School / Teacher Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#E8E0D5] mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we assist your Japanese language journey?"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#101C35] border border-[#E8E0D5]/20 text-[#FFFFFF] text-sm focus:outline-none focus:border-[#C83C50] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#C83C50] hover:bg-[#B03244] text-[#FFFFFF] font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Frequently Asked Questions */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#FFFFFF] flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-[#C83C50]" />
                <span>Frequently Asked Questions</span>
              </h2>

              <div className="space-y-4">
                {faqs.map((f, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-[#FFFFFF]/5 border border-[#E8E0D5]/15 space-y-2"
                  >
                    <h3 className="text-base font-bold text-[#FFFFFF]">{f.q}</h3>
                    <p className="text-sm text-[#E8E0D5]/80 leading-relaxed font-light">
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

import React from "react";
import PublicNavbar from "@/components/public/Navbar";
import PublicFooter from "@/components/public/Footer";
import { ShieldCheck, Lock, Database, UserCheck, EyeOff, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#101C35] text-[#FFFFFF]">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#E8E0D5]/10 border border-[#E8E0D5]/20 text-xs font-semibold text-[#E8E0D5]">
            <ShieldCheck className="w-4 h-4 text-[#C83C50]" />
            <span>DPDP & Global Compliance</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#FFFFFF]">
            Privacy Policy & Data Security
          </h1>
          <p className="text-base text-[#E8E0D5]/80 max-w-2xl mx-auto">
            Last Updated: November 2026. NihongoSetu is committed to safeguarding your personal data, learning progress, and privacy rights.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Card 1: Core Principles */}
          <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-3 text-[#C83C50]">
              <Lock className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#FFFFFF]">1. Our Core Privacy Commitments</h2>
            </div>
            <p className="text-sm text-[#E8E0D5]/80 leading-relaxed">
              At NihongoSetu (日本語節), we believe an authentic education platform must honor student privacy without compromise. We adhere to the following principles:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-[#E8E0D5]/80 pl-2">
              <li><strong className="text-[#FFFFFF]">Zero Commercial Ad Trackers:</strong> We never sell, rent, or trade your personal information, email, or study habits to third-party advertisers or data brokers.</li>
              <li><strong className="text-[#FFFFFF]">Transparent Local Caching:</strong> Vocabulary lists, Kana brush strokes, and study streaks are stored offline on your device using local storage for instant responsiveness.</li>
              <li><strong className="text-[#FFFFFF]">Educational Exclusivity:</strong> All collected telemetry is used strictly to power spaced repetition algorithms, mock exam scoring, and curriculum recommendations.</li>
            </ul>
          </div>

          {/* Card 2: Data Collection */}
          <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-3 text-[#C83C50]">
              <Database className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#FFFFFF]">2. Information We Collect</h2>
            </div>
            <p className="text-sm text-[#E8E0D5]/80 leading-relaxed">
              We collect only the minimum necessary data to provide a personalized Japanese learning experience:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#E8E0D5]/5 border border-[#E8E0D5]/10 space-y-2">
                <h3 className="text-sm font-semibold text-[#FFFFFF]">Account Profile Data</h3>
                <p className="text-xs text-[#E8E0D5]/70 leading-relaxed">
                  Name, email address, password hash, target JLPT certification level (N5 to N1), and preferred native language (e.g., Tamil, Hindi, English).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#E8E0D5]/5 border border-[#E8E0D5]/10 space-y-2">
                <h3 className="text-sm font-semibold text-[#FFFFFF]">Study & Exam Progress</h3>
                <p className="text-xs text-[#E8E0D5]/70 leading-relaxed">
                  Kanji mastery records, vocabulary recall stats, daily study streak counts, and mock exam simulation timestamps and scores.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Offline Storage */}
          <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-3 text-[#C83C50]">
              <EyeOff className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#FFFFFF]">3. Offline Storage & Local Sync</h2>
            </div>
            <p className="text-sm text-[#E8E0D5]/80 leading-relaxed">
              To support uninterrupted study during travel or low connectivity, NihongoSetu utilizes client-side storage (<code className="text-[#C83C50] bg-[#E8E0D5]/10 px-1 py-0.5 rounded text-xs">localStorage</code> and IndexedDB). You maintain complete control over this data and may export a JSON backup or purge it at any time from your Student Settings.
            </p>
          </div>

          {/* Card 4: Rights & Contact */}
          <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-3 text-[#C83C50]">
              <UserCheck className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#FFFFFF]">4. Your Legal Rights & Data Inquiries</h2>
            </div>
            <p className="text-sm text-[#E8E0D5]/80 leading-relaxed">
              Under applicable data protection laws (including the Digital Personal Data Protection Act and international privacy frameworks), you retain the right to access, rectify, export, or permanently erase your student profile.
            </p>
            <p className="text-sm text-[#E8E0D5]/80">
              For any privacy inquiries or account erasure requests, please contact our Data Protection Officer at:{" "}
              <a href="mailto:privacy@nihongosetu.org" className="text-[#C83C50] hover:underline font-semibold">
                privacy@nihongosetu.org
              </a>.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

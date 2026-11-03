import React from "react";
import PublicNavbar from "@/components/public/Navbar";
import PublicFooter from "@/components/public/Footer";
import { Scale, BookOpen, ShieldAlert, Award, FileCheck } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#101C35] text-[#FFFFFF]">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#E8E0D5]/10 border border-[#E8E0D5]/20 text-xs font-semibold text-[#E8E0D5]">
            <Scale className="w-4 h-4 text-[#C83C50]" />
            <span>Institutional Agreement</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#FFFFFF]">
            Terms of Service
          </h1>
          <p className="text-base text-[#E8E0D5]/80 max-w-2xl mx-auto">
            Please read these Terms carefully before accessing or using NihongoSetu (日本語への架け橋).
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {/* Section 1 */}
          <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-3 text-[#C83C50]">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#FFFFFF]">1. Educational Purpose & License</h2>
            </div>
            <p className="text-sm text-[#E8E0D5]/80 leading-relaxed">
              NihongoSetu provides an interactive, structured Japanese language learning curriculum spanning JLPT levels N5 through N1. You are granted a personal, non-exclusive, revocable license to access the pedagogical materials, stroke visualizers, audio listening drills, and mock exams for non-commercial, personal study purposes.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-3 text-[#C83C50]">
              <Award className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#FFFFFF]">2. JLPT Trademark Disclaimer</h2>
            </div>
            <p className="text-sm text-[#E8E0D5]/80 leading-relaxed">
              &quot;JLPT&quot; (Japanese-Language Proficiency Test) and official JLPT level references are registered trademarks of the Japan Educational Exchanges and Services (JEES) and the Japan Foundation. NihongoSetu is an independent preparatory platform and is not officially affiliated with, sponsored by, or endorsed by JEES or the Japan Foundation.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-3 text-[#C83C50]">
              <ShieldAlert className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#FFFFFF]">3. Acceptable Use & Academic Integrity</h2>
            </div>
            <p className="text-sm text-[#E8E0D5]/80 leading-relaxed">
              Students and educators agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-[#E8E0D5]/80 pl-2">
              <li>Deploy automated bots, scrapers, or scripts to harvest question banks, audio files, or dictionary definitions.</li>
              <li>Attempt to circumvent student device limits (maximum 3 concurrent devices per enrolled student) or impersonate administrative accounts.</li>
              <li>Distribute, resell, or publicly republish proprietary mock examination questions.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="bg-[#101C35] border border-[#E8E0D5]/20 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-3 text-[#C83C50]">
              <FileCheck className="w-6 h-6" />
              <h2 className="text-xl font-bold text-[#FFFFFF]">4. Contact & Inquiries</h2>
            </div>
            <p className="text-sm text-[#E8E0D5]/80 leading-relaxed">
              If you have any questions regarding these Terms or licensing inquiries for institutional classroom deployment, please contact our administrative council at:{" "}
              <a href="mailto:academic@nihongosetu.org" className="text-[#C83C50] hover:underline font-semibold">
                academic@nihongosetu.org
              </a>.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

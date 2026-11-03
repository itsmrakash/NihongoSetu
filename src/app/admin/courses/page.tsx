"use client";

import React, { useState } from "react";
import { BookOpen, CheckCircle2, Clock, Users, Sparkles, Layers } from "lucide-react";

interface CourseModule {
  level: string;
  title: string;
  lessonsCount: number;
  grammarPoints: number;
  kanjiTarget: number;
  vocabTarget: number;
  enrolledStudents: number;
  status: "published" | "draft";
}

const INITIAL_COURSES: CourseModule[] = [
  {
    level: "N5",
    title: "Foundations of Japanese & Script Basics",
    lessonsCount: 24,
    grammarPoints: 12,
    kanjiTarget: 80,
    vocabTarget: 800,
    enrolledStudents: 220,
    status: "published",
  },
  {
    level: "N4",
    title: "Elementary Communication & Verb Nuances",
    lessonsCount: 30,
    grammarPoints: 10,
    kanjiTarget: 166,
    vocabTarget: 1500,
    enrolledStudents: 136,
    status: "published",
  },
  {
    level: "N3",
    title: "Intermediate Bridge to Everyday Fluency",
    lessonsCount: 36,
    grammarPoints: 10,
    kanjiTarget: 367,
    vocabTarget: 3750,
    enrolledStudents: 94,
    status: "published",
  },
  {
    level: "N2",
    title: "Upper-Intermediate Academic & Workplace Japanese",
    lessonsCount: 40,
    grammarPoints: 10,
    kanjiTarget: 367,
    vocabTarget: 6000,
    enrolledStudents: 47,
    status: "published",
  },
  {
    level: "N1",
    title: "Advanced Mastery: Literary & Nuanced Discourse",
    lessonsCount: 45,
    grammarPoints: 10,
    kanjiTarget: 117,
    vocabTarget: 10000,
    enrolledStudents: 26,
    status: "published",
  },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseModule[]>(INITIAL_COURSES);

  const toggleStatus = (level: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.level === level
          ? { ...c, status: c.status === "published" ? "draft" : "published" }
          : c
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#C83C50]/20 text-[#C83C50] text-xs font-semibold mb-2 border border-[#C83C50]/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Pedagogical Structure</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#FFFFFF]">
          Curriculum & Course Management
        </h1>
        <p className="text-xs text-[#E8E0D5]/70 mt-1">
          Review and organize the structured syllabi from JLPT N5 through N1.
        </p>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 gap-4">
        {courses.map((course) => (
          <div
            key={course.level}
            className="p-6 rounded-3xl bg-[#101C35] border border-[#E8E0D5]/20 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl"
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-[#C83C50] text-[#FFFFFF] font-black text-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#C83C50]/20">
                {course.level}
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-base font-bold text-[#FFFFFF]">{course.title}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      course.status === "published"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {course.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#E8E0D5]/70 pt-1">
                  <span>• {course.lessonsCount} Master Lessons</span>
                  <span>• {course.grammarPoints} Grammar Points</span>
                  <span>• {course.kanjiTarget} Kanji Targets</span>
                  <span>• {course.vocabTarget} Vocab Targets</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 shrink-0">
              <div className="text-right text-xs">
                <div className="font-bold text-[#FFFFFF] flex items-center space-x-1 justify-end">
                  <Users className="w-3.5 h-3.5 text-[#C83C50]" />
                  <span>{course.enrolledStudents} Enrolled</span>
                </div>
                <div className="text-[10px] text-[#E8E0D5]/60 mt-0.5">Active Learners</div>
              </div>

              <button
                onClick={() => toggleStatus(course.level)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  course.status === "published"
                    ? "bg-[#E8E0D5]/10 hover:bg-[#E8E0D5]/20 text-[#E8E0D5]"
                    : "bg-emerald-600 hover:bg-emerald-500 text-[#FFFFFF]"
                }`}
              >
                {course.status === "published" ? "Unpublish (Draft)" : "Publish Live"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

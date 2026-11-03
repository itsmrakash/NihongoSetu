import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  JLPTLevel,
  getServerQuestionsForLevel,
  ExamReviewItem,
} from "@/data/questions";

const VALID_LEVELS: JLPTLevel[] = ["N5", "N4", "N3", "N2", "N1"];
const SERVER_SALT = process.env.EXAM_VERIFICATION_SECRET || "nihongo_setu_secure_exam_verifier_2026";

interface GradeRequestBody {
  level: string;
  answers: Record<string, number>;
  questionIds: string[];
  timeSpentSeconds?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: GradeRequestBody = await req.json();

    // 1. Validate Level
    const rawLevel = (body.level || "").toUpperCase();
    if (!VALID_LEVELS.includes(rawLevel as JLPTLevel)) {
      return NextResponse.json(
        { error: "Invalid JLPT level specified." },
        { status: 400 }
      );
    }
    const level = rawLevel as JLPTLevel;

    // 2. Validate Question IDs
    if (!Array.isArray(body.questionIds) || body.questionIds.length === 0) {
      return NextResponse.json(
        { error: "Question IDs list is required." },
        { status: 400 }
      );
    }

    if (body.questionIds.length > 50) {
      return NextResponse.json(
        { error: "Exceeded maximum questions per examination." },
        { status: 400 }
      );
    }

    const answers = body.answers && typeof body.answers === "object" ? body.answers : {};

    // 3. Load Server Source of Truth for this Level
    const serverQuestions = getServerQuestionsForLevel(level);
    const questionMap = new Map(serverQuestions.map((q) => [q.id, q]));

    // 4. Secure Evaluation & Review Construction
    let correctCount = 0;
    const review: ExamReviewItem[] = [];

    for (const qId of body.questionIds) {
      const serverQ = questionMap.get(qId);
      if (!serverQ) {
        return NextResponse.json(
          { error: `Question ${qId} does not exist for level ${level}.` },
          { status: 400 }
        );
      }

      const userSelected = typeof answers[qId] === "number" ? answers[qId] : null;
      const isCorrect = userSelected === serverQ.correctIndex;
      if (isCorrect) {
        correctCount++;
      }

      // Solutions and explanations are released ONLY upon server-side submission
      review.push({
        id: serverQ.id,
        question: serverQ.question,
        options: serverQ.options,
        userSelected,
        correctIndex: serverQ.correctIndex,
        isCorrect,
        explanation: serverQ.explanation,
        category: serverQ.category,
      });
    }

    const total = body.questionIds.length;
    const percentage = Math.round((correctCount / total) * 100);
    const passed = percentage >= 70; // 70% passing threshold
    const gradedAt = new Date().toISOString();

    // 5. Generate Tamper-Proof Cryptographic Signature
    const signaturePayload = `${level}:${correctCount}:${total}:${percentage}:${passed}:${gradedAt}:${SERVER_SALT}`;
    const signature = crypto
      .createHash("sha256")
      .update(signaturePayload)
      .digest("hex");

    return NextResponse.json({
      success: true,
      verifiedScore: {
        score: correctCount,
        total,
        percentage,
        passed,
        level,
        gradedAt,
        signature,
      },
      review,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal grading error";
    return NextResponse.json(
      { error: "Examination grading failed: " + message },
      { status: 500 }
    );
  }
}

import { calculateQuizScore, getQuizResult } from "./quiz";
import { applyQuizResult } from "./updateMastery";
import { getNextConcept } from "./progression";

export function completeLearningSession(
  studentMastery,
  conceptId,
  questions,
  answers
) {
  const quizScore = calculateQuizScore(
    questions,
    answers
  );

  const updatedMastery = applyQuizResult(
    studentMastery,
    conceptId,
    quizScore
  );

  const result = getQuizResult(quizScore);

  let nextConcept = null;

  if (result.passed) {
    nextConcept =
      getNextConcept(updatedMastery);
  }

  return {
    conceptId,
    quizScore,
    updatedMastery,
    passed: result.passed,
    action: result.action,
    message: result.message,
    nextConcept,

    // New information for the UI
    remediationRequired: !result.passed,

    remediationConcept: !result.passed
      ? conceptId
      : null,
  };
}
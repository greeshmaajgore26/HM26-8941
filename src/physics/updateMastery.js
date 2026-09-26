import { getMasteryStatus } from "./mastery";

export function updateConceptMastery(
  currentScore,
  quizScore
) {
  const newScore = Math.round(
    currentScore * 0.4 + quizScore * 0.6
  );

  return Math.min(100, newScore);
}

export function applyQuizResult(
  studentMastery,
  conceptId,
  quizScore
) {
  const currentScore =
    studentMastery[conceptId] || 0;

  const newScore =
    updateConceptMastery(
      currentScore,
      quizScore
    );

  return {
    ...studentMastery,
    [conceptId]: newScore,
  };
}

export function getUpdatedConceptState(
  studentMastery,
  conceptId
) {
  const score =
    studentMastery[conceptId] || 0;

  return {
    score,
    status: getMasteryStatus(score),
  };
}
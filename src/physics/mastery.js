export const MASTERY_THRESHOLDS = {
  MASTERED: 80,
  DEVELOPING: 50,
};

export function getMasteryStatus(score) {
  if (score >= MASTERY_THRESHOLDS.MASTERED) {
    return "mastered";
  }

  if (score >= MASTERY_THRESHOLDS.DEVELOPING) {
    return "developing";
  }

  return "needs-revision";
}
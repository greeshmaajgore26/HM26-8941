import { getMasteryStatus } from "./mastery";
import { physicsConcepts } from "./concepts";

export function generateInterventionSignals(
  studentMastery
) {
  const signals = [];

  for (const concept of physicsConcepts) {
    const score =
      studentMastery[concept.id] || 0;

    const status =
      getMasteryStatus(score);

    if (status === "needs-revision") {
      signals.push({
        conceptId: concept.id,
        conceptName: concept.name,
        score,
        severity: "high",
        recommendation:
          `Revisit ${concept.name} with guided practice and application questions.`,
      });
    } else if (status === "developing") {
      signals.push({
        conceptId: concept.id,
        conceptName: concept.name,
        score,
        severity: "medium",
        recommendation:
          `Give ${concept.name} another short practice set before moving ahead.`,
      });
    }
  }

  return signals;
}
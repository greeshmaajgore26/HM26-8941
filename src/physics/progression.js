import { physicsConcepts } from "./concepts";
import { getMasteryStatus } from "./mastery";

export function getNextConcept(studentMastery) {
  // First, find any concept that has not been mastered
  // and whose prerequisites are all mastered.
  for (const concept of physicsConcepts) {
    const currentScore =
      studentMastery[concept.id] || 0;

    const currentStatus =
      getMasteryStatus(currentScore);

    // Never send the student backward to a concept
    // that is already mastered.
    if (currentStatus === "mastered") {
      continue;
    }

    const prerequisitesReady =
      concept.prerequisites.every(
        (prerequisiteId) => {
          const prerequisiteScore =
            studentMastery[prerequisiteId] || 0;

          return (
            getMasteryStatus(
              prerequisiteScore
            ) === "mastered"
          );
        }
      );

    if (prerequisitesReady) {
      return concept;
    }
  }

  return null;
}
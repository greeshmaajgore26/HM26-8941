import { calculateDiagnosticMastery } from "./diagnostic";
import { getNextConcept } from "./progression";
import { getMasteryStatus } from "./mastery";
import { physicsConcepts } from "./concepts";

export function startDiagnostic(answers) {
  const mastery = calculateDiagnosticMastery(answers);

  const nextConcept = getNextConcept(mastery);

  return {
    mastery,
    nextConcept,
  };
}

export function getStudentProgress(studentMastery) {
  return physicsConcepts.map((concept) => {
    const score = studentMastery[concept.id] || 0;

    return {
      id: concept.id,
      name: concept.name,
      score,
      status: getMasteryStatus(score),
    };
  });
}
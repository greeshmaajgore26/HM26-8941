export const diagnosticQuestions = [
  {
    id: 1,
    conceptId: "electric-current",
    question: "What is electric current?",
    options: [
      "Flow of electric charge",
      "Resistance to current",
      "Energy stored in a battery",
      "Potential difference",
    ],
    correctAnswer: "Flow of electric charge",
  },

  {
    id: 2,
    conceptId: "potential-difference",
    question: "What does potential difference measure?",
    options: [
      "Work done per unit charge",
      "Flow of electrons per second",
      "Resistance of a wire",
      "Length of a wire",
    ],
    correctAnswer: "Work done per unit charge",
  },

  {
    id: 3,
    conceptId: "resistance",
    question: "What does resistance describe?",
    options: [
      "Opposition to the flow of electric current",
      "Amount of charge flowing",
      "Energy produced by a battery",
      "Speed of electrons",
    ],
    correctAnswer: "Opposition to the flow of electric current",
  },

  {
    id: 4,
    conceptId: "ohms-law",
    question: "According to Ohm's Law, what is the relationship between V, I and R?",
    options: [
      "V = I × R",
      "V = I + R",
      "I = V × R",
      "R = V × I",
    ],
    correctAnswer: "V = I × R",
  },
];

export function calculateDiagnosticMastery(answers) {
  const mastery = {};

  for (const question of diagnosticQuestions) {
    const answer = answers[question.id];

    if (answer === undefined) {
      continue;
    }

    if (!mastery[question.conceptId]) {
      mastery[question.conceptId] = {
        correct: 0,
        total: 0,
      };
    }

    mastery[question.conceptId].total += 1;

    if (answer === question.correctAnswer) {
      mastery[question.conceptId].correct += 1;
    }
  }

  const scores = {};

  for (const conceptId in mastery) {
    const result = mastery[conceptId];

    scores[conceptId] = Math.round(
      (result.correct / result.total) * 100
    );
  }

  return scores;
}
export const popQuizQuestions = {
  "electric-current": [
    {
      id: "current-1",
      question: "A current of 2 A means:",
      options: [
        "2 coulombs of charge flow per second",
        "2 volts of potential difference",
        "2 ohms of resistance",
        "2 joules of energy",
      ],
      correctAnswer: "2 coulombs of charge flow per second",
      difficulty: "easy",
    },
    {
      id: "current-2",
      question: "Electric current is the rate of flow of:",
      options: [
        "Electric charge",
        "Resistance",
        "Voltage",
        "Power",
      ],
      correctAnswer: "Electric charge",
      difficulty: "easy",
    },
  ],

  "potential-difference": [
    {
      id: "voltage-1",
      question: "Potential difference is measured in:",
      options: [
        "Volts",
        "Amperes",
        "Ohms",
        "Watts",
      ],
      correctAnswer: "Volts",
      difficulty: "easy",
    },
    {
      id: "voltage-2",
      question: "Potential difference represents:",
      options: [
        "Work done per unit charge",
        "Charge flowing per second",
        "Opposition to current",
        "Electrical power",
      ],
      correctAnswer: "Work done per unit charge",
      difficulty: "medium",
    },
  ],

  resistance: [
    {
      id: "resistance-1",
      question: "Resistance is the opposition to:",
      options: [
        "Electric current",
        "Potential difference",
        "Electrical power",
        "Energy",
      ],
      correctAnswer: "Electric current",
      difficulty: "easy",
    },
    {
      id: "resistance-2",
      question: "A resistor has a resistance of 5 Ω. If the current is 2 A, what is the potential difference?",
      options: [
        "10 V",
        "2.5 V",
        "7 V",
        "3 V",
      ],
      correctAnswer: "10 V",
      difficulty: "medium",
    },
  ],

  "ohms-law": [
    {
      id: "ohms-law-1",
      question: "Which equation represents Ohm's Law?",
      options: [
        "V = I × R",
        "V = I + R",
        "I = V × R",
        "R = V × I",
      ],
      correctAnswer: "V = I × R",
      difficulty: "easy",
    },
    {
      id: "ohms-law-2",
      question: "A circuit has a resistance of 5 Ω and current of 2 A. What is the voltage?",
      options: [
        "10 V",
        "7 V",
        "3 V",
        "2.5 V",
      ],
      correctAnswer: "10 V",
      difficulty: "medium",
    },
  ],
};

export function calculateQuizScore(questions, answers) {
  if (questions.length === 0) {
    return 0;
  }

  let correct = 0;

  for (const question of questions) {
    if (answers[question.id] === question.correctAnswer) {
      correct += 1;
    }
  }

  return Math.round((correct / questions.length) * 100);
}

export function getQuizResult(score) {
  if (score >= 80) {
    return {
      passed: true,
      action: "continue",
      message: "Good understanding. Continue to the next concept.",
    };
  }

  return {
    passed: false,
    action: "revise",
    message: "This concept needs revision before continuing.",
  };
}
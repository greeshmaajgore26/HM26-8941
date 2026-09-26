const mentorData = {
  student: {
    name: "Ananya",
    classLevel: "10",
    subject: "Physics"
  },

  concept: "Resistance",
  mastery: 65,
  previousMastery: 72,
  repeatedErrors: 4,
  affectedSessions: 2,

  detectedPattern:
    "Student repeatedly confuses current and resistance.",

  likelyCause:
    "Weak understanding of the relationship between voltage, current and resistance.",

  recommendation: [
    "Revise V = I × R",
    "Give 3 guided problems",
    "Give 2 circuit application problems"
  ],

  priority: "HIGH"
};

export default mentorData;
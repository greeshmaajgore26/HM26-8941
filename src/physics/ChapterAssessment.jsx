import { useEffect, useState } from "react";

const questions = [
  {
    id: 1,
    question:
      "A current of 2 A flows through a resistor of 5 Ω. What is the potential difference?",
    options: [
      "2.5 V",
      "7 V",
      "10 V",
      "25 V",
    ],
    correctAnswer: "10 V",
  },

  {
    id: 2,
    question:
      "Which quantity represents the opposition to the flow of electric current?",
    options: [
      "Voltage",
      "Resistance",
      "Power",
      "Charge",
    ],
    correctAnswer: "Resistance",
  },

  {
    id: 3,
    question:
      "What is the SI unit of electric current?",
    options: [
      "Volt",
      "Ohm",
      "Watt",
      "Ampere",
    ],
    correctAnswer: "Ampere",
  },

  {
    id: 4,
    question:
      "Which equation represents Ohm's Law?",
    options: [
      "V = I × R",
      "P = V × I",
      "R = I / V",
      "I = V × R",
    ],
    correctAnswer: "V = I × R",
  },

  {
    id: 5,
    question:
      "A 10 V device draws 2 A of current. What is its electrical power?",
    options: [
      "5 W",
      "12 W",
      "20 W",
      "50 W",
    ],
    correctAnswer: "20 W",
  },

  {
    id: 6,
    question:
      "Which type of circuit provides multiple paths for current?",
    options: [
      "Series",
      "Parallel",
      "Open",
      "Single-loop",
    ],
    correctAnswer: "Parallel",
  },

  {
    id: 7,
    question:
      "Potential difference is measured in:",
    options: [
      "Amperes",
      "Ohms",
      "Volts",
      "Watts",
    ],
    correctAnswer: "Volts",
  },

  {
    id: 8,
    question:
      "If resistance increases while voltage stays constant, what happens to current?",
    options: [
      "It increases",
      "It decreases",
      "It becomes zero",
      "It stays exactly the same",
    ],
    correctAnswer: "It decreases",
  },

  {
    id: 9,
    question:
      "A series circuit has one continuous path for:",
    options: [
      "Current",
      "Resistance",
      "Power only",
      "Voltage only",
    ],
    correctAnswer: "Current",
  },

  {
    id: 10,
    question:
      "Which equation can be used to calculate electrical power?",
    options: [
      "P = V × I",
      "P = R / I",
      "P = V + I",
      "P = I / V",
    ],
    correctAnswer: "P = V × I",
  },
];

function ChapterAssessment({
  onComplete,
  onExit,
}) {
  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState({});

  const [timeLeft, setTimeLeft] =
    useState(600);

  const [submitted, setSubmitted] =
    useState(false);

  const [score, setScore] = useState(0);

  useEffect(() => {
    if (submitted) {
      return;
    }

    if (timeLeft <= 0) {
      finishAssessment();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  function selectAnswer(answer) {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]:
        answer,
    });
  }

  function nextQuestion() {
    if (
      !answers[questions[currentQuestion].id]
    ) {
      return;
    }

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );
      return;
    }

    finishAssessment();
  }

  function finishAssessment() {
    let correct = 0;

    for (const question of questions) {
      if (
        answers[question.id] ===
        question.correctAnswer
      ) {
        correct += 1;
      }
    }

    const finalScore = Math.round(
      (correct / questions.length) * 100
    );

    setScore(finalScore);
    setSubmitted(true);
  }

  function continueAfterResult() {
    onComplete({
      score,
      totalQuestions: questions.length,
      passed: score >= 80,
    });
  }

  const question =
    questions[currentQuestion];

  const selectedAnswer =
    answers[question.id];

  const minutes = Math.floor(
    timeLeft / 60
  );

  const seconds = String(
    timeLeft % 60
  ).padStart(2, "0");

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.glowLeft} />
        <div style={styles.glowRight} />

        <div style={styles.resultCard}>
          <div style={styles.icon}>
            {score >= 80 ? "✓" : "↻"}
          </div>

          <div style={styles.label}>
            CHAPTER ASSESSMENT COMPLETE
          </div>

          <h1 style={styles.resultTitle}>
            {score >= 80
              ? "Chapter demonstrated."
              : "A little more practice needed."}
          </h1>

          <div style={styles.bigScore}>
            {score}%
          </div>

          <p style={styles.subtitle}>
            You answered{" "}
            {
              questions.filter(
                (item) =>
                  answers[item.id] ===
                  item.correctAnswer
              ).length
            }{" "}
            out of {questions.length} questions
            correctly.
          </p>

          <div style={styles.resultMessage}>
            {score >= 80
              ? "Your understanding of the Electricity chapter is strong enough to mark this chapter as demonstrated."
              : "The system will use this result to identify areas that need more revision."}
          </div>

          <button
            onClick={continueAfterResult}
            style={styles.primaryButton}
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <div style={styles.label}>
              CLASS 10 PHYSICS · ELECTRICITY
            </div>

            <h1 style={styles.title}>
              Chapter Assessment
            </h1>

            <p style={styles.subtitle}>
              Demonstrate your understanding of
              the chapter.
            </p>
          </div>

          <div
            style={{
              ...styles.timer,
              ...(timeLeft <= 60
                ? styles.timerWarning
                : {}),
            }}
          >
            <div style={styles.timerLabel}>
              TIME LEFT
            </div>

            <div style={styles.timerValue}>
              {minutes}:{seconds}
            </div>
          </div>
        </div>

        <div style={styles.progressArea}>
          <div style={styles.progressText}>
            Question {currentQuestion + 1} of{" "}
            {questions.length}
          </div>

          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressFill,
                width: `${
                  ((currentQuestion + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        <div style={styles.questionArea}>
          <div style={styles.questionNumber}>
            {String(
              currentQuestion + 1
            ).padStart(2, "0")}
          </div>

          <h2 style={styles.question}>
            {question.question}
          </h2>

          <div style={styles.options}>
            {question.options.map(
              (option) => {
                const selected =
                  selectedAnswer === option;

                return (
                  <button
                    key={option}
                    onClick={() =>
                      selectAnswer(option)
                    }
                    style={{
                      ...styles.option,
                      ...(selected
                        ? styles.selectedOption
                        : {}),
                    }}
                  >
                    <span
                      style={{
                        ...styles.radio,
                        ...(selected
                          ? styles.selectedRadio
                          : {}),
                      }}
                    >
                      {selected ? "✓" : ""}
                    </span>

                    {option}
                  </button>
                );
              }
            )}
          </div>
        </div>

        <div style={styles.footer}>
          <button
            onClick={onExit}
            style={styles.exitButton}
          >
            Exit assessment
          </button>

          <button
            onClick={nextQuestion}
            disabled={!selectedAnswer}
            style={{
              ...styles.primaryButton,
              opacity: selectedAnswer
                ? 1
                : 0.4,
            }}
          >
            {currentQuestion ===
            questions.length - 1
              ? "Submit assessment"
              : "Next question →"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 15% 15%, rgba(99, 64, 180, 0.28), transparent 32%), radial-gradient(circle at 85% 20%, rgba(24, 111, 132, 0.18), transparent 30%), #050812",
    color: "#f4f4f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px 20px",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  glowLeft: {
    position: "absolute",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background:
      "rgba(124, 92, 246, 0.13)",
    filter: "blur(120px)",
    top: "-180px",
    left: "-100px",
  },

  glowRight: {
    position: "absolute",
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    background:
      "rgba(25, 130, 150, 0.09)",
    filter: "blur(120px)",
    top: "-120px",
    right: "-120px",
  },

  card: {
    width: "850px",
    maxWidth: "100%",
    padding: "48px 50px",
    borderRadius: "28px",
    background:
      "rgba(20, 23, 42, 0.9)",
    border:
      "1px solid rgba(148, 163, 184, 0.16)",
    boxShadow:
      "0 35px 90px rgba(0, 0, 0, 0.45)",
    position: "relative",
    zIndex: 2,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "30px",
  },

  label: {
    color: "#8e96a9",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.5px",
  },

  title: {
    margin: "10px 0 5px",
    fontSize: "31px",
    letterSpacing: "-0.8px",
  },

  subtitle: {
    margin: 0,
    color: "#8f97aa",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  timer: {
    minWidth: "105px",
    padding: "13px 16px",
    borderRadius: "14px",
    textAlign: "center",
    background:
      "rgba(128, 104, 245, 0.09)",
    border:
      "1px solid rgba(128, 104, 245, 0.18)",
  },

  timerWarning: {
    background:
      "rgba(248, 113, 113, 0.09)",
    border:
      "1px solid rgba(248, 113, 113, 0.22)",
  },

  timerLabel: {
    color: "#747d90",
    fontSize: "8px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  timerValue: {
    marginTop: "4px",
    color: "#c5bcff",
    fontSize: "21px",
    fontWeight: "800",
  },

  progressArea: {
    marginTop: "30px",
  },

  progressText: {
    color: "#777f91",
    fontSize: "11px",
    marginBottom: "8px",
  },

  progressTrack: {
    height: "5px",
    borderRadius: "999px",
    background:
      "rgba(255, 255, 255, 0.07)",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background:
      "linear-gradient(90deg, #8b70ff, #43d5ed)",
  },

  questionArea: {
    marginTop: "40px",
  },

  questionNumber: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a995ff",
    background:
      "rgba(128, 104, 245, 0.1)",
    border:
      "1px solid rgba(128, 104, 245, 0.18)",
    fontWeight: "800",
    fontSize: "13px",
  },

  question: {
    margin: "20px 0 0",
    color: "#f2f3f7",
    fontSize: "23px",
    lineHeight: "1.4",
    letterSpacing: "-0.4px",
  },

  options: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "25px",
  },

  option: {
    width: "100%",
    padding: "15px",
    borderRadius: "13px",
    border:
      "1px solid rgba(148, 163, 184, 0.12)",
    background:
      "rgba(255, 255, 255, 0.025)",
    color: "#cbd0dc",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "13px",
  },

  selectedOption: {
    border:
      "1px solid rgba(139, 112, 255, 0.65)",
    background:
      "rgba(104, 83, 210, 0.15)",
  },

  radio: {
    width: "22px",
    height: "22px",
    minWidth: "22px",
    borderRadius: "50%",
    border:
      "1px solid rgba(175, 181, 200, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
  },

  selectedRadio: {
    background: "#8068f5",
    borderColor: "#9d8cff",
  },

  footer: {
    marginTop: "30px",
    paddingTop: "22px",
    borderTop:
      "1px solid rgba(148, 163, 184, 0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  exitButton: {
    border: "none",
    background: "transparent",
    color: "#697285",
    cursor: "pointer",
    fontSize: "11px",
  },

  primaryButton: {
    border: "none",
    borderRadius: "13px",
    padding: "14px 23px",
    color: "white",
    fontWeight: "750",
    fontSize: "13px",
    background:
      "linear-gradient(90deg, #8a70ff, #6656ed)",
    boxShadow:
      "0 12px 30px rgba(112, 87, 239, 0.28)",
    cursor: "pointer",
  },

  resultCard: {
    width: "620px",
    maxWidth: "100%",
    padding: "55px",
    borderRadius: "28px",
    textAlign: "center",
    background:
      "rgba(20, 23, 42, 0.9)",
    border:
      "1px solid rgba(148, 163, 184, 0.14)",
    boxShadow:
      "0 35px 90px rgba(0, 0, 0, 0.45)",
    position: "relative",
    zIndex: 2,
  },

  icon: {
    width: "55px",
    height: "55px",
    margin: "0 auto 22px",
    borderRadius: "17px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#73e2bd",
    background:
      "rgba(76, 220, 175, 0.1)",
    border:
      "1px solid rgba(76, 220, 175, 0.2)",
    fontSize: "20px",
    fontWeight: "800",
  },

  resultTitle: {
    margin: "14px 0",
    fontSize: "29px",
    letterSpacing: "-0.7px",
  },

  bigScore: {
    marginTop: "25px",
    color: "#a995ff",
    fontSize: "52px",
    fontWeight: "800",
  },

  resultMessage: {
    margin: "22px 0",
    padding: "17px",
    borderRadius: "14px",
    background:
      "rgba(255, 255, 255, 0.025)",
    color: "#9ca4b6",
    fontSize: "12px",
    lineHeight: "1.6",
  },
};

export default ChapterAssessment;
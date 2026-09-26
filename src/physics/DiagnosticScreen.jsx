import { useState } from "react";
import { diagnosticQuestions } from "./diagnostic";
import { startDiagnostic } from "./learningEngine";

function DiagnosticScreen({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState({});

  const question =
    diagnosticQuestions[currentQuestion];

  function selectAnswer(answer) {
    setAnswers({
      ...answers,
      [question.id]: answer,
    });
  }

  function nextQuestion() {
    if (!answers[question.id]) {
      return;
    }

    if (
      currentQuestion <
      diagnosticQuestions.length - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    const result = startDiagnostic(answers);

    onComplete(result);
  }

  const selectedAnswer =
    answers[question.id];

  return (
    <div style={styles.page}>
      <div style={styles.glowLeft} />
      <div style={styles.glowRight} />

      <div style={styles.card}>
        <div style={styles.label}>
          PHYSICS · INITIAL DIAGNOSTIC
        </div>

        <div style={styles.progressText}>
          {currentQuestion + 1} /{" "}
          {diagnosticQuestions.length}
        </div>

        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${
                ((currentQuestion + 1) /
                  diagnosticQuestions.length) *
                100
              }%`,
            }}
          />
        </div>

        <div style={styles.questionSection}>
          <div style={styles.numberBox}>
            {String(
              currentQuestion + 1
            ).padStart(2, "0")}
          </div>

          <h1 style={styles.title}>
            {question.question}
          </h1>

          <p style={styles.subtitle}>
            This helps us understand what you
            already know before deciding where
            you should begin.
          </p>

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

                    <span>{option}</span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        <div style={styles.footer}>
          <span style={styles.helper}>
            Your answers determine your starting
            point.
          </span>

          <button
            onClick={nextQuestion}
            disabled={!selectedAnswer}
            style={{
              ...styles.primaryButton,
              opacity: selectedAnswer
                ? 1
                : 0.4,
              cursor: selectedAnswer
                ? "pointer"
                : "not-allowed",
            }}
          >
            {currentQuestion ===
            diagnosticQuestions.length - 1
              ? "Finish diagnostic →"
              : "Continue →"}
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
    width: "775px",
    maxWidth: "100%",
    padding: "58px 56px",
    borderRadius: "30px",
    background:
      "rgba(20, 23, 42, 0.88)",
    border:
      "1px solid rgba(148, 163, 184, 0.16)",
    boxShadow:
      "0 35px 90px rgba(0, 0, 0, 0.45)",
    backdropFilter: "blur(20px)",
    position: "relative",
    zIndex: 2,
  },

  label: {
    color: "#8e96a9",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1.4px",
  },

  progressText: {
    marginTop: "8px",
    color: "#b7a8ff",
    fontSize: "13px",
    fontWeight: "700",
  },

  progressTrack: {
    height: "6px",
    background:
      "rgba(255, 255, 255, 0.07)",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "16px",
  },

  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background:
      "linear-gradient(90deg, #8b70ff, #43d5ed)",
    boxShadow:
      "0 0 14px rgba(116, 112, 255, 0.6)",
  },

  questionSection: {
    marginTop: "48px",
  },

  numberBox: {
    width: "54px",
    height: "54px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#b7a8ff",
    fontWeight: "800",
    fontSize: "15px",
    background:
      "linear-gradient(135deg, rgba(120, 100, 255, 0.17), rgba(44, 190, 215, 0.08))",
    border:
      "1px solid rgba(132, 122, 255, 0.22)",
    marginBottom: "24px",
  },

  title: {
    fontSize: "30px",
    lineHeight: "1.3",
    letterSpacing: "-0.8px",
    margin: "0 0 14px",
    fontWeight: "750",
    color: "#f5f5fa",
  },

  subtitle: {
    color: "#9ba2b5",
    fontSize: "15px",
    lineHeight: "1.7",
    margin: 0,
    maxWidth: "650px",
  },

  options: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "28px",
  },

  option: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "16px 17px",
    borderRadius: "14px",
    border:
      "1px solid rgba(148, 163, 184, 0.13)",
    background:
      "rgba(255, 255, 255, 0.025)",
    color: "#cdd2df",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "15px",
  },

  selectedOption: {
    border:
      "1px solid rgba(139, 112, 255, 0.7)",
    background:
      "rgba(104, 83, 210, 0.16)",
  },

  radio: {
    width: "24px",
    height: "24px",
    minWidth: "24px",
    borderRadius: "50%",
    border:
      "1px solid rgba(175, 181, 200, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  },

  selectedRadio: {
    background: "#8068f5",
    borderColor: "#9d8cff",
  },

  footer: {
    marginTop: "32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  helper: {
    color: "#70788b",
    fontSize: "12px",
  },

  primaryButton: {
    border: "none",
    borderRadius: "13px",
    padding: "15px 26px",
    color: "white",
    fontWeight: "750",
    fontSize: "14px",
    background:
      "linear-gradient(90deg, #8a70ff, #6656ed)",
    boxShadow:
      "0 12px 30px rgba(112, 87, 239, 0.28)",
    cursor: "pointer",
  },
};

export default DiagnosticScreen;
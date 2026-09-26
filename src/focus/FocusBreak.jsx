import { useEffect, useState } from "react";

const riddles = [
  {
    question:
      "I have keys but no locks, I have space but no room. What am I?",
    answer: "A keyboard",
  },
  {
    question:
      "What has to be broken before you can use it?",
    answer: "An egg",
  },
  {
    question:
      "What gets wetter the more it dries?",
    answer: "A towel",
  },
  {
    question:
      "I am full of holes but I can still hold water. What am I?",
    answer: "A sponge",
  },
  {
    question:
      "What has a face and two hands but no arms or legs?",
    answer: "A clock",
  },
];

const exercises = [
  {
    title: "Eye Reset",
    duration: "30 seconds",
    instruction:
      "Look away from your screen and focus on something far away for 20–30 seconds.",
  },
  {
    title: "Shoulder Stretch",
    duration: "45 seconds",
    instruction:
      "Roll your shoulders slowly backwards 5 times, then forwards 5 times.",
  },
  {
    title: "Quick Walk",
    duration: "2 minutes",
    instruction:
      "Stand up and take a short walk around your room or workspace.",
  },
  {
    title: "Deep Breathing",
    duration: "1 minute",
    instruction:
      "Take a slow breath in, pause briefly, then breathe out slowly. Repeat several times.",
  },
  {
    title: "Others",
    duration: "Your choice",
    instruction:
      "Take this break however you prefer — listen to music, grab a snack, chat with someone, relax, or do anything else that helps you reset.",
  },
];

function FocusBreak({ onExit }) {
  const [mode, setMode] = useState("focus");

  const [timeLeft, setTimeLeft] =
    useState(25 * 60);

  const [riddleIndex, setRiddleIndex] =
    useState(0);

  const [showAnswer, setShowAnswer] =
    useState(false);

  const [exerciseIndex, setExerciseIndex] =
    useState(0);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (mode === "focus") {
        setMode("break");
        setTimeLeft(5 * 60);
      }

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, mode]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
      String(seconds % 60).padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  }

  function startBreak() {
    setMode("break");
    setTimeLeft(5 * 60);
  }

  function startFocusAgain() {
    setMode("focus");
    setTimeLeft(25 * 60);
  }

  function nextRiddle() {
    setShowAnswer(false);

    setRiddleIndex(
      (riddleIndex + 1) % riddles.length
    );
  }

  function nextExercise() {
    setExerciseIndex(
      (exerciseIndex + 1) % exercises.length
    );
  }

  const riddle = riddles[riddleIndex];

  const exercise = exercises[exerciseIndex];

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* HEADER */}

        <div style={styles.label}>
          FOCUS & WELLBEING
        </div>

        <h1 style={styles.title}>
          {mode === "focus"
            ? "Focus session"
            : "Break time"}
        </h1>

        <p style={styles.subtitle}>
          {mode === "focus"
            ? "Stay focused. Your study time is activity — mastery is measured separately."
            : "Take a short reset before returning to learning. Choose what feels right for you."}
        </p>

        {/* TIMER */}

        <div style={styles.timer}>
          {formatTime(timeLeft)}
        </div>

        {/* FOCUS MODE */}

        {mode === "focus" ? (
          <div style={styles.focusBox}>

            <div style={styles.focusIcon}>
              ◉
            </div>

            <h2>
              Keep going
            </h2>

            <p>
              Focus on your current learning
              activity. When the timer ends,
              you'll get a short break.
            </p>

            <button
              onClick={startBreak}
              style={styles.secondaryButton}
            >
              Take break now
            </button>

          </div>
        ) : (
          <>
            {/* BREAK HEADER */}

            <div style={styles.breakHeader}>
              <span>
                5 MINUTE RESET
              </span>

              <span>
                Your break is yours.
              </span>
            </div>

            {/* RIDDLE */}

            <div style={styles.section}>

              <div style={styles.sectionLabel}>
                🧩 QUICK RIDDLE
              </div>

              <h2 style={styles.sectionTitle}>
                {riddle.question}
              </h2>

              {showAnswer ? (
                <div style={styles.answer}>
                  Answer: {riddle.answer}
                </div>
              ) : (
                <button
                  onClick={() =>
                    setShowAnswer(true)
                  }
                  style={styles.smallButton}
                >
                  Reveal answer
                </button>
              )}

              <button
                onClick={nextRiddle}
                style={styles.linkButton}
              >
                Another riddle →
              </button>

            </div>

            {/* BREAK ACTIVITY */}

            <div style={styles.section}>

              <div style={styles.sectionLabel}>
                🌿 BREAK ACTIVITY
              </div>

              <h2 style={styles.sectionTitle}>
                {exercise.title}
              </h2>

              <div style={styles.duration}>
                {exercise.duration}
              </div>

              <p style={styles.instruction}>
                {exercise.instruction}
              </p>

              {exercise.title === "Others" && (
                <div style={styles.freedomNote}>
                  ✨ No rules here. Choose anything
                  that helps you feel refreshed.
                </div>
              )}

              <button
                onClick={nextExercise}
                style={styles.linkButton}
              >
                Another activity →
              </button>

            </div>

            {/* RETURN TO FOCUS */}

            <button
              onClick={startFocusAgain}
              style={styles.button}
            >
              Back to focus →
            </button>

          </>
        )}

        {/* EXIT */}

        <button
          onClick={onExit}
          style={styles.exitButton}
        >
          Exit focus mode
        </button>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",

    background:
      "radial-gradient(circle at 20% 15%, rgba(99,64,180,0.25), transparent 35%), radial-gradient(circle at 80% 20%, rgba(24,111,132,0.16), transparent 30%), #050812",

    color: "#f4f4f8",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    padding: "40px 20px",

    fontFamily:
      "Inter, system-ui, sans-serif",
  },

  card: {
    width: "720px",

    maxWidth: "100%",

    padding: "45px",

    borderRadius: "28px",

    background:
      "rgba(20,23,42,0.94)",

    border:
      "1px solid rgba(148,163,184,0.15)",

    boxShadow:
      "0 30px 90px rgba(0,0,0,0.45)",
  },

  label: {
    color: "#8e96a9",

    fontSize: "10px",

    fontWeight: "800",

    letterSpacing: "1.5px",
  },

  title: {
    margin: "12px 0 7px",

    fontSize: "32px",
  },

  subtitle: {
    color: "#8f97aa",

    fontSize: "13px",

    lineHeight: "1.6",
  },

  timer: {
    margin: "30px auto",

    width: "210px",

    padding: "22px",

    borderRadius: "20px",

    textAlign: "center",

    background:
      "rgba(128,104,245,0.1)",

    border:
      "1px solid rgba(128,104,245,0.2)",

    color: "#b7a9ff",

    fontSize: "45px",

    fontWeight: "800",

    letterSpacing: "2px",
  },

  focusBox: {
    textAlign: "center",

    padding: "25px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.025)",
  },

  focusIcon: {
    fontSize: "30px",

    color: "#a995ff",
  },

  breakHeader: {
    display: "flex",

    justifyContent: "space-between",

    gap: "15px",

    color: "#858da0",

    fontSize: "9px",

    fontWeight: "800",

    letterSpacing: "1px",
  },

  section: {
    marginTop: "22px",

    padding: "22px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.025)",

    border:
      "1px solid rgba(148,163,184,0.08)",
  },

  sectionLabel: {
    color: "#9d8cff",

    fontSize: "10px",

    fontWeight: "800",

    letterSpacing: "1px",
  },

  sectionTitle: {
    margin: "12px 0",

    fontSize: "19px",

    lineHeight: "1.5",
  },

  answer: {
    marginTop: "15px",

    padding: "12px",

    borderRadius: "10px",

    background:
      "rgba(76,220,175,0.08)",

    color: "#82e3c0",

    fontSize: "13px",
  },

  duration: {
    display: "inline-block",

    padding: "5px 9px",

    borderRadius: "999px",

    background:
      "rgba(128,104,245,0.1)",

    color: "#b7a9ff",

    fontSize: "10px",
  },

  instruction: {
    color: "#9ca4b6",

    lineHeight: "1.6",

    fontSize: "13px",
  },

  freedomNote: {
    marginTop: "14px",

    padding: "12px",

    borderRadius: "10px",

    background:
      "rgba(76,220,175,0.06)",

    border:
      "1px solid rgba(76,220,175,0.12)",

    color: "#82cdb4",

    fontSize: "12px",

    lineHeight: "1.5",
  },

  button: {
    marginTop: "22px",

    border: "none",

    borderRadius: "13px",

    padding: "14px 22px",

    color: "white",

    fontWeight: "750",

    fontSize: "13px",

    background:
      "linear-gradient(90deg,#8a70ff,#6656ed)",

    cursor: "pointer",
  },

  secondaryButton: {
    marginTop: "18px",

    border:
      "1px solid rgba(139,112,255,0.3)",

    borderRadius: "12px",

    padding: "12px 18px",

    color: "#c9c0ff",

    background:
      "rgba(128,104,245,0.08)",

    cursor: "pointer",
  },

  smallButton: {
    border: "none",

    borderRadius: "10px",

    padding: "10px 14px",

    color: "#ddd8ff",

    background:
      "rgba(128,104,245,0.12)",

    cursor: "pointer",

    fontSize: "11px",
  },

  linkButton: {
    marginLeft: "12px",

    border: "none",

    background: "transparent",

    color: "#8f82e8",

    cursor: "pointer",

    fontSize: "11px",
  },

  exitButton: {
    display: "block",

    margin: "25px auto 0",

    border: "none",

    background: "transparent",

    color: "#697285",

    cursor: "pointer",

    fontSize: "11px",
  },
};

export default FocusBreak;
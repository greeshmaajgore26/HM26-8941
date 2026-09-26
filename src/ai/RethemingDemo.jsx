import { useState } from "react";
import canonicalQuestion from "../data/canonicalQuestion";
import { validateQuestion } from "./validateQuestion";

function RethemingDemo() {
  const [theme, setTheme] = useState("football");
  const [generatedQuestion, setGeneratedQuestion] = useState(null);
  const [validation, setValidation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateQuestion = async (selectedTheme) => {
    setTheme(selectedTheme);
    setLoading(true);
    setError("");
    setGeneratedQuestion(null);
    setValidation(null);

    try {
      const response = await fetch("http://localhost:3001/api/retheme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          theme: selectedTheme
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Failed to generate question."
        );
      }

      const question = data.generatedQuestion;

      const result = validateQuestion(
        canonicalQuestion,
        question
      );

      setGeneratedQuestion(question);
      setValidation(result);
    } catch (err) {
      console.error(err);
      setError(
        "Could not generate the AI question. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>🤖 AI Contextual Re-Theming</h1>

      <p>
        The learning objective stays identical while
        the narrative adapts to the student's interests.
      </p>

      <hr />

      <h2>Choose a Student Interest</h2>

      <button
        onClick={() => generateQuestion("football")}
        disabled={loading}
      >
        ⚽ Football
      </button>

      <button
        onClick={() => generateQuestion("marine science")}
        disabled={loading}
      >
        🌊 Marine Science
      </button>

      <button
        onClick={() => generateQuestion("finance")}
        disabled={loading}
      >
        💰 Finance
      </button>

      <hr />

      <h2>🔒 Canonical Question</h2>

      <p>
        <strong>Concept:</strong>{" "}
        {canonicalQuestion.concept}
      </p>

      <p>
        <strong>Resistance:</strong>{" "}
        {canonicalQuestion.lockedVariables.resistance} Ω
      </p>

      <p>
        <strong>Current:</strong>{" "}
        {canonicalQuestion.lockedVariables.current} A
      </p>

      <p>
        <strong>Formula:</strong>{" "}
        {canonicalQuestion.formula}
      </p>

      <p>
        <strong>Correct Answer:</strong>{" "}
        {canonicalQuestion.correctAnswer}{" "}
        {canonicalQuestion.answerUnit}
      </p>

      <hr />

      {loading && (
        <div>
          <h2>🤖 AI is creating your question...</h2>
          <p>
            Adapting the story to your interest while
            keeping the physics unchanged.
          </p>
        </div>
      )}

      {error && (
        <div>
          <h2>❌ Error</h2>
          <p>{error}</p>
        </div>
      )}

      {generatedQuestion && !loading && (
        <>
          <h2>
            ✨ {generatedQuestion.theme} Version
          </h2>

          <p>{generatedQuestion.narrative}</p>

          <h3>{generatedQuestion.question}</h3>

          <hr />

          <h2>🔍 AI Safety Check</h2>

          {validation?.valid ? (
            <div>
              <h3>✅ Validation Passed</h3>

              <p>
                The AI changed the narrative but preserved
                the locked educational information.
              </p>
            </div>
          ) : (
            <div>
              <h3>❌ Validation Failed</h3>

              {validation?.errors.map((error) => (
                <p key={error}>⚠️ {error}</p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RethemingDemo;
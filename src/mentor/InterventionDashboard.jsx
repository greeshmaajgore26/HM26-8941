import { useState } from "react";
import mentorData from "../data/mentorData";
import DailyReport from "./DailyReport";
import MentorContact from "./MentorContact";

function InterventionDashboard() {
  const [view, setView] = useState("intervention");

  if (view === "report") {
    return (
      <div className="mentor-page">
        <button
          onClick={() => setView("intervention")}
          style={{
            marginBottom: "20px",
            padding: "10px 18px",
            cursor: "pointer"
          }}
        >
          ← Back to Intervention Dashboard
        </button>

        <DailyReport />
      </div>
    );
  }

  if (view === "contact") {
    return (
      <div className="mentor-page">
        <button
          onClick={() => setView("intervention")}
          style={{
            marginBottom: "20px",
            padding: "10px 18px",
            cursor: "pointer"
          }}
        >
          ← Back to Intervention Dashboard
        </button>

        <MentorContact />
      </div>
    );
  }

  return (
    <div className="mentor-page">
      <h1>👨‍🏫 Mentor Dashboard</h1>

      <p>
        Monitor student learning and identify when
        proactive intervention may be needed.
      </p>

      {/* =================================
          QUICK ACTIONS
          ================================= */}

      <div
        style={{
          display: "flex",
          gap: "12px",
          margin: "20px 0",
          flexWrap: "wrap"
        }}
      >
        <button
          onClick={() => setView("intervention")}
          style={{
            padding: "10px 18px",
            cursor: "pointer"
          }}
        >
          🚨 Interventions
        </button>

        <button
          onClick={() => setView("report")}
          style={{
            padding: "10px 18px",
            cursor: "pointer"
          }}
        >
          📊 Daily Report
        </button>

        <button
          onClick={() => setView("contact")}
          style={{
            padding: "10px 18px",
            cursor: "pointer"
          }}
        >
          💬 Contact Student
        </button>
      </div>

      {/* =================================
          INTERVENTION ALERT
          ================================= */}

      <div className="alert-card">
        <div className="alert-header">
          <div>
            <span className="warning">
              🚨 Intervention Recommended
            </span>

            <h2>
              {mentorData.student.name}
            </h2>

            <p>
              Class {mentorData.student.classLevel} •{" "}
              {mentorData.student.subject}
            </p>
          </div>

          <div className="priority">
            {mentorData.priority}
          </div>
        </div>

        <hr />

        {/* CONCEPT */}

        <div className="section">
          <h3>📚 Concept</h3>

          <p>
            {mentorData.concept}
          </p>
        </div>

        {/* DETECTED PATTERN */}

        <div className="section">
          <h3>🔎 Detected Pattern</h3>

          <p>
            {mentorData.detectedPattern}
          </p>
        </div>

        {/* LIKELY CAUSE */}

        <div className="section">
          <h3>🧠 Likely Underlying Cause</h3>

          <p>
            {mentorData.likelyCause}
          </p>
        </div>

        {/* EVIDENCE */}

        <div className="section">
          <h3>📊 Evidence</h3>

          <p>
            Repeated errors:{" "}
            <strong>
              {mentorData.repeatedErrors}
            </strong>
          </p>

          <p>
            Sessions affected:{" "}
            <strong>
              {mentorData.affectedSessions}
            </strong>
          </p>

          <p>
            Current mastery:{" "}
            <strong>
              {mentorData.mastery}%
            </strong>
          </p>

          <p>
            Previous mastery:{" "}
            <strong>
              {mentorData.previousMastery}%
            </strong>
          </p>
        </div>

        {/* RECOMMENDATION */}

        <div className="section">
          <h3>💡 Recommended Intervention</h3>

          <ol>
            {mentorData.recommendation.map(
              (action, index) => (
                <li key={index}>
                  {action}
                </li>
              )
            )}
          </ol>
        </div>

        {/* ACTIONS */}

        <div className="action-buttons">
          <button
            onClick={() =>
              alert(
                "Student attempt history will be connected to Person 2's assessment data."
              )
            }
          >
            View Attempts
          </button>

          <button
            onClick={() =>
              alert(
                "Intervention recorded. Targeted revision recommended."
              )
            }
          >
            Take Action
          </button>

          <button
            onClick={() => setView("contact")}
          >
            Contact Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterventionDashboard;
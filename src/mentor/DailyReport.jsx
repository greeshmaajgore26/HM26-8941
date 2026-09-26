import mentorData from "../data/mentorData";

function DailyReport() {
  return (
    <div className="daily-report">
      <h1>📊 Daily Student Report</h1>

      <p>
        A summary of today's learning activity and
        intervention signals.
      </p>

      <div className="report-card">
        <div className="report-header">
          <div>
            <h2>{mentorData.student.name}</h2>

            <p>
              Class {mentorData.student.classLevel} •{" "}
              {mentorData.student.subject}
            </p>
          </div>

          <span className="priority">
            {mentorData.priority}
          </span>
        </div>

        <hr />

        <div className="report-row">
          <span>Current Mastery</span>
          <strong>{mentorData.mastery}%</strong>
        </div>

        <div className="report-row">
          <span>Previous Mastery</span>
          <strong>{mentorData.previousMastery}%</strong>
        </div>

        <div className="report-row">
          <span>Repeated Errors</span>
          <strong>{mentorData.repeatedErrors}</strong>
        </div>

        <div className="report-row">
          <span>Sessions Affected</span>
          <strong>{mentorData.affectedSessions}</strong>
        </div>

        <hr />

        <h3>🔎 Learning Pattern</h3>

        <p>
          {mentorData.detectedPattern}
        </p>

        <h3>💡 Today's Recommendation</h3>

        <ol>
          {mentorData.recommendation.map(
            (action, index) => (
              <li key={index}>{action}</li>
            )
          )}
        </ol>

        <div className="report-footer">
          <span>Generated from student learning data</span>
          <span>⚡ Proactive intervention</span>
        </div>
      </div>
    </div>
  );
}

export default DailyReport;
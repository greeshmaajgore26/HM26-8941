import { learningContent } from "./learningContent";

function RevisionScreen({
  conceptId,
  onContinue,
}) {
  const content = learningContent[conceptId];

  if (!content) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.label}>
            PHYSICS · REVISION
          </div>

          <h1 style={styles.title}>
            Revision content unavailable
          </h1>

          <button
            onClick={onContinue}
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
        <div style={styles.label}>
          PHYSICS · TARGETED REVISION
        </div>

        <div style={styles.badge}>
          ↻ NEEDS REINFORCEMENT
        </div>

        <h1 style={styles.title}>
          Let's strengthen{" "}
          <span style={styles.highlight}>
            {content.title}
          </span>
        </h1>

        <p style={styles.subtitle}>
          Your last check showed that this concept
          needs a little more practice. We won't
          move forward until the idea is clear.
        </p>

        <div style={styles.explanationBox}>
          <div style={styles.sectionLabel}>
            CORE IDEA
          </div>

          <p style={styles.explanation}>
            {content.explanation}
          </p>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionLabel}>
            REMEMBER THESE
          </div>

          <div style={styles.points}>
            {content.keyPoints.map(
              (point, index) => (
                <div
                  key={point}
                  style={styles.point}
                >
                  <div style={styles.pointNumber}>
                    {index + 1}
                  </div>

                  <div style={styles.pointText}>
                    {point}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div style={styles.formulaBox}>
          <div style={styles.sectionLabel}>
            KEY RELATIONSHIP
          </div>

          <div style={styles.formula}>
            {content.formula}
          </div>
        </div>

        <div style={styles.exampleBox}>
          <div style={styles.sectionLabel}>
            QUICK EXAMPLE
          </div>

          <p style={styles.example}>
            {content.example}
          </p>
        </div>

        <div style={styles.tipBox}>
          <span style={styles.tipIcon}>💡</span>

          <div>
            <div style={styles.tipLabel}>
              REVISION TIP
            </div>

            <div style={styles.tipText}>
              {content.revisionTip}
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <span style={styles.helper}>
            Take your time. Understanding comes
            before progression.
          </span>

          <button
            onClick={onContinue}
            style={styles.primaryButton}
          >
            Reassess me →
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
    width: "820px",
    maxWidth: "100%",
    padding: "54px 56px",
    borderRadius: "30px",
    background:
      "rgba(20, 23, 42, 0.9)",
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
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.5px",
  },

  badge: {
    display: "inline-block",
    marginTop: "20px",
    padding: "8px 12px",
    borderRadius: "999px",
    color: "#f1c36d",
    background:
      "rgba(241, 195, 109, 0.09)",
    border:
      "1px solid rgba(241, 195, 109, 0.2)",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  title: {
    margin: "22px 0 14px",
    fontSize: "32px",
    lineHeight: "1.25",
    letterSpacing: "-0.9px",
    fontWeight: "750",
    color: "#f5f5fa",
  },

  highlight: {
    color: "#a995ff",
  },

  subtitle: {
    margin: 0,
    color: "#9ba2b5",
    fontSize: "15px",
    lineHeight: "1.7",
    maxWidth: "680px",
  },

  explanationBox: {
    marginTop: "30px",
    padding: "22px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg, rgba(116, 91, 235, 0.12), rgba(41, 151, 174, 0.05))",
    border:
      "1px solid rgba(139, 112, 255, 0.16)",
  },

  section: {
    marginTop: "28px",
  },

  sectionLabel: {
    color: "#737c91",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.3px",
  },

  explanation: {
    margin: "10px 0 0",
    color: "#d2d5df",
    fontSize: "14px",
    lineHeight: "1.75",
  },

  points: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "12px",
  },

  point: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px 15px",
    borderRadius: "13px",
    background:
      "rgba(255, 255, 255, 0.025)",
    border:
      "1px solid rgba(148, 163, 184, 0.08)",
  },

  pointNumber: {
    width: "25px",
    height: "25px",
    minWidth: "25px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "rgba(128, 104, 245, 0.15)",
    color: "#a995ff",
    fontSize: "11px",
    fontWeight: "800",
  },

  pointText: {
    color: "#cbd0dc",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  formulaBox: {
    marginTop: "28px",
    padding: "20px",
    borderRadius: "17px",
    textAlign: "center",
    background:
      "rgba(67, 213, 237, 0.045)",
    border:
      "1px solid rgba(67, 213, 237, 0.12)",
  },

  formula: {
    marginTop: "10px",
    color: "#70ddec",
    fontSize: "25px",
    fontWeight: "750",
    letterSpacing: "0.5px",
  },

  exampleBox: {
    marginTop: "16px",
    padding: "20px",
    borderRadius: "17px",
    background:
      "rgba(255, 255, 255, 0.025)",
    border:
      "1px solid rgba(148, 163, 184, 0.09)",
  },

  example: {
    margin: "9px 0 0",
    color: "#c4c9d5",
    fontSize: "13px",
    lineHeight: "1.65",
  },

  tipBox: {
    marginTop: "18px",
    display: "flex",
    gap: "13px",
    alignItems: "flex-start",
    padding: "17px",
    borderRadius: "15px",
    background:
      "rgba(128, 104, 245, 0.07)",
    border:
      "1px solid rgba(128, 104, 245, 0.12)",
  },

  tipIcon: {
    fontSize: "18px",
  },

  tipLabel: {
    color: "#a995ff",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  tipText: {
    marginTop: "5px",
    color: "#aeb4c2",
    fontSize: "12px",
    lineHeight: "1.6",
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
    fontSize: "11px",
    lineHeight: "1.5",
    maxWidth: "300px",
  },

  primaryButton: {
    border: "none",
    borderRadius: "13px",
    padding: "15px 25px",
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

export default RevisionScreen;
import { physicsConcepts } from "./concepts";
import { getMasteryStatus } from "./mastery";

function KnowledgeGraph({ mastery }) {
  function getStatusInfo(concept) {
    const score = mastery[concept.id] || 0;

    const prerequisitesReady =
      concept.prerequisites.every(
        (prerequisiteId) => {
          const prerequisiteScore =
            mastery[prerequisiteId] || 0;

          return (
            getMasteryStatus(
              prerequisiteScore
            ) === "mastered"
          );
        }
      );

    if (score >= 80) {
      return {
        label: "Mastered",
        icon: "🟢",
        className: "mastered",
      };
    }

    if (!prerequisitesReady) {
      return {
        label: "Locked",
        icon: "🔒",
        className: "locked",
      };
    }

    if (score >= 50) {
      return {
        label: "Developing",
        icon: "🟡",
        className: "developing",
      };
    }

    return {
      label: "Needs Revision",
      icon: "🔴",
      className: "revision",
    };
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <div style={styles.label}>
            KNOWLEDGE GRAPH
          </div>

          <h2 style={styles.title}>
            Your learning path
          </h2>

          <p style={styles.subtitle}>
            Concepts unlock when their
            prerequisites are demonstrated.
          </p>
        </div>
      </div>

      <div style={styles.graph}>
        {physicsConcepts.map(
          (concept, index) => {
            const status =
              getStatusInfo(concept);

            const score =
              mastery[concept.id] || 0;

            return (
              <div
                key={concept.id}
                style={styles.nodeWrapper}
              >
                {index > 0 && (
                  <div
                    style={styles.connector}
                  />
                )}

                <div
                  style={{
                    ...styles.node,
                    ...(status.className ===
                    "mastered"
                      ? styles.masteredNode
                      : {}),
                    ...(status.className ===
                    "developing"
                      ? styles.developingNode
                      : {}),
                    ...(status.className ===
                    "revision"
                      ? styles.revisionNode
                      : {}),
                    ...(status.className ===
                    "locked"
                      ? styles.lockedNode
                      : {}),
                  }}
                >
                  <div style={styles.nodeTop}>
                    <span style={styles.icon}>
                      {status.icon}
                    </span>

                    <span
                      style={styles.status}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div style={styles.name}>
                    {concept.name}
                  </div>

                  <div style={styles.scoreRow}>
                    <div
                      style={
                        styles.scoreTrack
                      }
                    >
                      <div
                        style={{
                          ...styles.scoreFill,
                          width: `${score}%`,
                        }}
                      />
                    </div>

                    <span
                      style={styles.score}
                    >
                      {score}%
                    </span>
                  </div>

                  {concept.prerequisites
                    .length > 0 && (
                    <div
                      style={
                        styles.prerequisites
                      }
                    >
                      Requires:{" "}
                      {concept.prerequisites
                        .map(
                          (id) =>
                            physicsConcepts.find(
                              (item) =>
                                item.id === id
                            )?.name
                        )
                        .join(", ")}
                    </div>
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "32px",
    padding: "28px",
    borderRadius: "22px",
    background:
      "rgba(255, 255, 255, 0.025)",
    border:
      "1px solid rgba(148, 163, 184, 0.12)",
  },

  label: {
    color: "#8e96a9",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.4px",
  },

  title: {
    margin: "8px 0 5px",
    color: "#f5f5fa",
    fontSize: "22px",
  },

  subtitle: {
    margin: 0,
    color: "#858da0",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  graph: {
    marginTop: "28px",
  },

  nodeWrapper: {
    position: "relative",
  },

  connector: {
    height: "24px",
    width: "2px",
    background:
      "linear-gradient(#7164c8, #38435d)",
    marginLeft: "25px",
  },

  node: {
    padding: "18px",
    borderRadius: "17px",
    background:
      "rgba(20, 23, 42, 0.8)",
    border:
      "1px solid rgba(148, 163, 184, 0.12)",
  },

  masteredNode: {
    border:
      "1px solid rgba(76, 220, 175, 0.35)",
    boxShadow:
      "0 0 22px rgba(76, 220, 175, 0.05)",
  },

  developingNode: {
    border:
      "1px solid rgba(241, 195, 107, 0.35)",
  },

  revisionNode: {
    border:
      "1px solid rgba(248, 113, 113, 0.35)",
  },

  lockedNode: {
    opacity: 0.55,
  },

  nodeTop: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  icon: {
    fontSize: "14px",
  },

  status: {
    color: "#858da0",
    fontSize: "11px",
    fontWeight: "700",
  },

  name: {
    marginTop: "10px",
    color: "#e7e8ef",
    fontWeight: "750",
    fontSize: "16px",
  },

  scoreRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "12px",
  },

  scoreTrack: {
    flex: 1,
    height: "5px",
    borderRadius: "999px",
    background:
      "rgba(255, 255, 255, 0.07)",
    overflow: "hidden",
  },

  scoreFill: {
    height: "100%",
    borderRadius: "999px",
    background:
      "linear-gradient(90deg, #8068f5, #43d5ed)",
  },

  score: {
    color: "#b7a8ff",
    fontSize: "12px",
    fontWeight: "750",
    width: "35px",
    textAlign: "right",
  },

  prerequisites: {
    marginTop: "10px",
    color: "#656d80",
    fontSize: "10px",
    lineHeight: "1.5",
  },
};

export default KnowledgeGraph;
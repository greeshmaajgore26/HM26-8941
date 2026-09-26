function Psychology({ student, onBack }) {
  const topics = [
    {
      title: "Human Behavior",
      emoji: "👥",
      description:
        "Understand why people behave differently in different situations."
    },
    {
      title: "Memory & Learning",
      emoji: "🧠",
      description:
        "Explore how our brain stores, recalls and learns information."
    },
    {
      title: "Emotions",
      emoji: "😊",
      description:
        "Learn how emotions influence our thoughts and actions."
    },
    {
      title: "Motivation",
      emoji: "🎯",
      description:
        "Discover what drives people to achieve their goals."
    },
    {
      title: "Social Psychology",
      emoji: "🌍",
      description:
        "Explore how people influence and interact with one another."
    }
  ];

  return (
    <div className="psychology-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Dashboard
      </button>

      <div className="psychology-header">

        <div>
          <p className="dashboard-small">
            Explore Interests
          </p>

          <h1>
            🧠 Psychology
          </h1>

          <p className="psychology-subtitle">
            Discover how the human mind works.
          </p>
        </div>

        <div className="psychology-icon">
          🧠
        </div>

      </div>

      {/* PERSONALIZED MESSAGE */}

      <div className="personalized-card">

        <div className="personalized-icon">
          ✨
        </div>

        <div>
          <h2>
            A little something for you, {student.name}
          </h2>

          <p>
            Since you enjoy{" "}
            <strong>
              {student.extracurricular ||
                "exploring different activities"}
            </strong>
            , you might find Psychology especially
            interesting because it helps explain how
            people think, learn and make decisions.
          </p>
        </div>

      </div>

      {/* TOPICS */}

      <h2 className="section-title">
        Explore Psychology
      </h2>

      <div className="psychology-topics">

        {topics.map((topic) => (
          <div
            className="psychology-topic"
            key={topic.title}
            onClick={() =>
              alert(
                `${topic.title} lesson coming soon!`
              )
            }
          >

            <div className="topic-emoji">
              {topic.emoji}
            </div>

            <div className="topic-content">

              <h3>
                {topic.title}
              </h3>

              <p>
                {topic.description}
              </p>

              <span>
                Explore →
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Psychology;
import { useState } from "react";

function MentorContact() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const sendMessage = () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    setSent(true);
    setMessage("");
  };

  return (
    <div className="contact-page">
      <h1>💬 Student Messages</h1>

      <p>
        Communicate directly with the student.
      </p>

      {sent ? (
        <div className="success-message">
          ✅ Message sent to the student.
        </div>
      ) : (
        <>
          <textarea
            placeholder="Write a message to the student..."
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
          />

          <button onClick={sendMessage}>
            Send Message
          </button>
        </>
      )}
    </div>
  );
}

export default MentorContact;
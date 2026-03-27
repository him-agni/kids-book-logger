import React, { useState } from "react";
import axios from "axios";

const AIBuddy = ({ age }) => {
  const [view, setView] = useState("recommend");
  const [topic, setTopic] = useState("");
  const [childAge, setChildAge] = useState(age || 8);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    if (!topic) return alert("Please tell me what you like!");
    setLoading(true);
    setResponse("");
    try {
      const { data } = await axios.post(
        "https://kids-book-logger-l3ecwb05m-him-agnis-projects.vercel.app/api/ai/recommend",
        {
          age: childAge,
          history: [],
          preferences: topic,
        },
      );
      setResponse(data.recommendation);
    } catch (err) {
      setResponse(
        "Oops! The AI buddy is taking a nap or the backend isn't running.",
      );
    }
    setLoading(false);
  };

  const generateStory = async () => {
    if (!topic) return alert("Please give me a topic!");
    setLoading(true);
    setResponse("");
    try {
      const { data } = await axios.post(
        "https://kids-book-logger-l3ecwb05m-him-agnis-projects.vercel.app/api/ai/story",
        {
          age: childAge,
          topic,
        },
      );
      setResponse(data.story);
    } catch (err) {
      setResponse("Oops! I dropped my storytelling hat.");
    }
    setLoading(false);
  };

  return (
    <div
      className="card animate-pop"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          background:
            "linear-gradient(to right, var(--primary), var(--accent))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "1rem",
        }}
      >
        AI Reading Buddy 🤖✨
      </h2>

      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#666",
          marginBottom: "2rem",
        }}
      >
        Your magic helper that recommends amazing books and writes custom
        stories just for you!
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <button
          className={`btn ${view === "recommend" ? "" : "btn-secondary"}`}
          onClick={() => {
            setView("recommend");
            setResponse("");
          }}
        >
          📚 Get Recommendations
        </button>
        <button
          className={`btn ${view === "story" ? "" : "btn-secondary"}`}
          onClick={() => {
            setView("story");
            setResponse("");
          }}
        >
          ✍️ Create Custom Story
        </button>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            marginBottom: "1.5rem",
            background: "#f0f4f8",
            padding: "1rem",
            borderRadius: "12px",
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: "1.1rem",
              fontWeight: "bold",
              marginBottom: "0.8rem",
              color: "var(--text-dark)",
            }}
          >
            Child's Age: {childAge} years old 🎈
          </label>
          <input
            type="range"
            min="1"
            max="15"
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            style={{ width: "100%", cursor: "pointer" }}
          />
        </div>

        <h3 style={{ marginBottom: "1rem", color: "var(--text-dark)" }}>
          {view === "recommend"
            ? "What do you like to read about?"
            : "What should the story be about?"}
        </h3>
        <textarea
          className="input-field"
          rows="3"
          placeholder={
            view === "recommend"
              ? "E.g., Dinosaurs, space, princesses..."
              : "E.g., A brave dog who goes to the moon..."
          }
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ width: "100%", resize: "vertical", minHeight: "100px" }}
        ></textarea>

        <button
          className="btn btn-accent"
          style={{
            marginTop: "1.5rem",
            width: "100%",
            padding: "16px",
            fontSize: "1.2rem",
          }}
          onClick={view === "recommend" ? getRecommendation : generateStory}
          disabled={loading}
        >
          {loading ? "Thinking magically... 💭✨" : "Ask AI Buddy! 🚀"}
        </button>
      </div>

      {response && (
        <div
          className="animate-pop"
          style={{
            background: "#F8F9FA",
            padding: "2rem",
            borderRadius: "24px",
            border: "4px solid var(--tertiary)",
          }}
        >
          <p
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.8",
              fontSize: "1.15rem",
              fontWeight: "600",
              color: "#333",
            }}
          >
            {response}
          </p>
        </div>
      )}
    </div>
  );
};
export default AIBuddy;

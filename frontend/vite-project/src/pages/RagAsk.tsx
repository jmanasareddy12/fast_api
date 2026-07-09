import { useState } from "react";
import { ragAsk } from "../Services/RagService";
import "./RagAsk.css";

function RagAsk() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function handleAsk() {
    const response = await ragAsk(question);
    setAnswer(response.answer);
  }

  return (
    <div className="ragask-page">
      <h1>Ask AI</h1>

      <div className="ragask-container">
        <div className="ragask-input-group">
          <input
            type="text"
            className="ragask-input"
            placeholder="Ask anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button className="ragask-ask-button" onClick={handleAsk}>
            Ask
          </button>
        </div>

        {answer && (
          <div className="ragask-result">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}

export default RagAsk;
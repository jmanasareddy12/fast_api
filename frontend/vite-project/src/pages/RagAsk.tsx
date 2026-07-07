import { useState } from "react";
import { ragAsk } from "../Services/RagService";

function RagAsk() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function handleAsk() {
    const response = await ragAsk(question);
    setAnswer(response.answer);
  }

  return (
    <div className="page">
      <h1>Ask AI</h1>

      <input
        type="text"
        placeholder="Ask anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={handleAsk}>
        Ask
      </button>

      {answer && (
        <div className="result">
          {answer}
        </div>
      )}
    </div>
  );
}

export default RagAsk;
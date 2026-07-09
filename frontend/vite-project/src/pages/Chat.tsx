import { useState, useRef, useEffect } from "react";
import { askCareerChatbot } from "../Services/ChatService";
import "./Chat.css";

interface Message {
  sender: "user" | "bot";
  text: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState<string>(() => {
    const existing = localStorage.getItem("chat_session_id");
    if (existing) return existing;
    const newId = "session_" + Date.now();
    localStorage.setItem("chat_session_id", newId);
    return newId;
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askCareerChatbot(text, sessionId);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `Error: ${msg}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h2>Career Guidance Chatbot</h2>

      <div className="chat-box">
        {messages.length === 0 && (
          <div className="chat-placeholder">
            Ask me anything about careers, skills, or job paths.
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.sender}`}
          >
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong>
            {msg.text}
          </div>
        ))}

        {loading && <div className="chat-typing">Bot is typing...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question..."
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chat;
import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      { sender: "You", text: userMessage },
    ]);

    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: data.response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "Sorry, I couldn't connect to the backend.",
        },
      ]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="app">
      <div className="chat-container">

        <div className="chat-header">
          <h1>Agentic Retrieval Agent</h1>
          <p>Ask questions and get intelligent answers</p>
        </div>

        <div className="chat-box">
          {messages.length === 0 && (
            <div className="welcome">
              <h2>Hello! 👋</h2>
              <p>How can I help you today?</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === "You"
                  ? "user-message"
                  : "ai-message"
              }`}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={sendMessage}>
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
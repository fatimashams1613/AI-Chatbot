import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();

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

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">AI</div>
          <div>
            <h2>Agentic AI</h2>
            <span>Retrieval Agent</span>
          </div>
        </div>

        <button className="new-chat" onClick={() => setMessages([])}>
          + New Chat
        </button>

        <div className="sidebar-section">
          <p>ABOUT</p>
          <span>Intelligent AI assistant</span>
          <span>Retrieval powered</span>
          <span>Azure connected</span>
        </div>

        <div className="sidebar-bottom">
          <span>● System Online</span>
        </div>
      </aside>

      <main className="main">

        <header className="topbar">
          <div>
            <h1>Agentic Retrieval Agent</h1>
            <p>Ask questions and get intelligent answers</p>
          </div>

          <div className="status">
            <span className="status-dot"></span>
            Online
          </div>
        </header>

        <section className="chat-area">

          {messages.length === 0 ? (
            <div className="welcome">
              <div className="welcome-icon">✦</div>
              <h2>How can I help you?</h2>
              <p>
                Ask a question and I'll use my AI capabilities
                to provide an answer.
              </p>

              <div className="suggestions">
                <button onClick={() => setMessage("What can you help me with?")}>
                  What can you help me with?
                </button>

                <button onClick={() => setMessage("Explain artificial intelligence")}>
                  Explain AI
                </button>

                <button onClick={() => setMessage("Give me a summary")}>
                  Give me a summary
                </button>
              </div>
            </div>
          ) : (
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.sender === "You"
                      ? "user-message"
                      : "ai-message"
                  }`}
                >
                  <div className="avatar">
                    {msg.sender === "You" ? "You" : "AI"}
                  </div>

                  <div className="message-content">
                    <strong>{msg.sender}</strong>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

        <div className="input-wrapper">
          <div className="input-area">
            <input
              type="text"
              placeholder="Message your AI assistant..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={sendMessage}>
              Send ↑
            </button>
          </div>

          <p className="footer-text">
            AI can make mistakes. Check important information.
          </p>
        </div>

      </main>
    </div>
  );
}

export default App;
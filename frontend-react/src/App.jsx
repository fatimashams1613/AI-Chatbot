try {
  const response = await fetch("/api/chat", {
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
    {
      sender: "AI",
      text: data.response || data.error || "No response received.",
    },
  ]);
} catch (error) {
  console.error(error);

  setMessages((prev) => [
    ...prev,
    {
      sender: "AI",
      text: "Sorry, I couldn't connect to the AI backend.",
    },
  ]);
}
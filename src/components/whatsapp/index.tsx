"use client"
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  sender: "me" | "other";
  text: string;
  timestamp: number;
}

const WhatsAppChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      sender: "me",
      text: input,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "other",
          text: "Reply to: " + msg.text,
          timestamp: Date.now() + 1,
        },
      ]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        width: 400,
        height: 500,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                background: msg.sender === "me" ? "#dcf8c6" : "#fff",
                padding: 8,
                borderRadius: 6,
                maxWidth: "75%",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div style={{ display: "flex", borderTop: "1px solid #eee" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, padding: 10, border: "none" }}
          placeholder="Type a message"
        />
        <button onClick={sendMessage} style={{ padding: "0 20px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default WhatsAppChat
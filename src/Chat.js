// Chat.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { db } from "./firebase"; // ← Firebaseをimportする
import { doc, getDoc } from "firebase/firestore"; // ← Firestoreの機能をimport

function Chat({ profile }) {  // ← ここでプロフィールを受け取る
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (profile) {
      let intro = `あなたは身長${profile.height}cm、体重${profile.weight}kg`;
      if (profile.bodyFat) {
        intro += `、体脂肪率${profile.bodyFat}%`;
      }
      if (profile.muscleMass) {
        intro += `、筋肉量${profile.muscleMass}kg`;
      }
      intro += `、年齢${profile.age}歳のクライアントを担当する専属トレーナーです。目標達成に向けてトレーニング、食事管理、健康指導を最適化してください。`;

      const introMessage = { role: "system", content: intro };
      setMessages([introMessage]);
    }
  }, [profile]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = response.data.choices[0].message.content.trim();
      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (error) {
      console.error("エラー:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "サーバーエラーが発生しました。もう一度お試しください。" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", height: "100vh", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>トレーナーチャット</h1>

      <div style={{ flexGrow: 1, overflowY: "auto", marginBottom: 20 }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              background: msg.role === "user" ? "#d2f8d2" : "#eee",
              padding: 12,
              marginBottom: 10,
              borderRadius: 20,
              maxWidth: "70%",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              fontSize: 16,
              lineHeight: 1.6,
              wordBreak: "break-word",
            }}
          >
            <strong>{msg.role === "user" ? "あなた" : "マネージャー"}</strong><br />
            {msg.content.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}

        {isLoading && (
          <div style={{ background: "#eee", padding: 10, borderRadius: 20, maxWidth: "70%", alignSelf: "flex-start" }}>
            <strong>マネージャー</strong><br />
            考えています...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="メッセージを入力"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          style={{ flexGrow: 1, padding: 12, fontSize: 16, borderRadius: 8, border: "1px solid #ccc" }}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          style={{ padding: "12px 24px", background: isLoading ? "#ccc" : "#4CAF50", color: "white", border: "none", borderRadius: 8, fontSize: 16 }}
        >
          {isLoading ? "送信中..." : "送信"}
        </button>
      </div>
    </div>
  );
}

export default Chat;

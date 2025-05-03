import React, { useState } from "react";

function Meal() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const newMsgObj = {
      sender: "user", // 仮で "user" 固定（あとで "admin" も追加する想定）
      text: newMessage,
    };
    setMessages([...messages, newMsgObj]);
    setNewMessage("");
  };

  return (
    <div style={{
      maxWidth: "800px",
      margin: "50px auto",
      background: "#ffffff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>食事チャットページ</h2>

      <div style={{
        height: "300px",
        overflowY: "scroll",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "20px",
        background: "#f9f9f9",
        textAlign: "left"
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "10px"
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="メッセージを入力"
        style={{
          width: "70%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginRight: "10px"
        }}
      />
      <button
        onClick={handleSend}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        送信
      </button>
    </div>
  );
}

export default Meal; 
import React from "react";

function Question() {
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
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>質問BOXページ</h2>
      <p style={{ fontSize: "16px", color: "#666" }}>
        質問や相談を投稿できます。
      </p>
    </div>
  );
}

export default Question; 
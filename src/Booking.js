import React from "react";

function Booking() {
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
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>予約フォームページ</h2>
      <p style={{ fontSize: "16px", color: "#666" }}>
        パーソナルセッションの予約ができます。
      </p>
    </div>
  );
}

export default Booking; 
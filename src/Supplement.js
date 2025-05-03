import React from "react";

function Supplement() {
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
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>サプリ管理ページ</h2>
      <p style={{ fontSize: "16px", color: "#666" }}>
        サプリメントの管理や情報をまとめます。
      </p>
    </div>
  );
}

export default Supplement; 
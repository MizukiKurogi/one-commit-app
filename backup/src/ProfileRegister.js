// src/ProfileRegister.js
import React, { useState } from "react";

function ProfileRegister({ onRegister }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRegister) {
      onRegister({ height, weight, age });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>プロフィール登録</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="身長 (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
          required
        />
        <input
          type="number"
          placeholder="体重 (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
          required
        />
        <input
          type="number"
          placeholder="年齢 (歳)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
          required
        />
        <button type="submit">登録してチャット開始</button>
      </form>
    </div>
  );
}

export default ProfileRegister;

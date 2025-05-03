// src/ProfileEdit.js

import React, { useState, useEffect } from "react";

function ProfileEdit({ onSave }) {
  const [profile, setProfile] = useState({ 
    height: "", 
    weight: "", 
    age: "", 
    bodyFat: "", 
    muscleMass: "",
    weekGoal: ""
  });
  const [lastUpdate, setLastUpdate] = useState(null);
  const [lastHeightAgeUpdate, setLastHeightAgeUpdate] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    const weightUpdateDate = localStorage.getItem("lastUpdate");
    const heightAgeUpdateDate = localStorage.getItem("lastHeightAgeUpdate");

    if (storedProfile) {
      setProfile(storedProfile);
    }
    if (weightUpdateDate) {
      setLastUpdate(new Date(weightUpdateDate));
    }
    if (heightAgeUpdateDate) {
      setLastHeightAgeUpdate(new Date(heightAgeUpdateDate));
    }
  }, []);

  const isMonday = () => {
    const today = new Date();
    return today.getDay() === 1;
  };

  const canUpdateWeekly = () => {
    if (!lastUpdate) return true;
    const today = new Date();
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    return today > lastMonday;
  };

  const canUpdateHeightAge = () => {
    if (!lastHeightAgeUpdate) return true;
    const today = new Date();
    const oneYearLater = new Date(lastHeightAgeUpdate);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    return today >= oneYearLater;
  };

  const handleSave = () => {
    const today = new Date();

    if (isMonday() && canUpdateWeekly()) {
      localStorage.setItem("lastUpdate", today.toISOString());
    } else if (!isMonday()) {
      setMessage("体重・体脂肪率・筋肉量は月曜日のみ更新できます。");
      return;
    }

    if (canUpdateHeightAge()) {
      localStorage.setItem("lastHeightAgeUpdate", today.toISOString());
    } else {
      setMessage("身長・年齢の変更は年1回だけ可能です。");
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(profile));
    setMessage("プロフィールが更新されました。");
    if (onSave) onSave();
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>プロフィール編集</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 300 }}>

        <input
          type="number"
          value={profile.height}
          onChange={(e) => setProfile({ ...profile, height: e.target.value })}
          placeholder="身長 (cm)"
          disabled={!canUpdateHeightAge()}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
          required
        />

        <input
          type="number"
          value={profile.weight}
          onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
          placeholder="体重 (kg)"
          disabled={!isMonday() || !canUpdateWeekly()}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
          required
        />

        <input
          type="number"
          value={profile.bodyFat}
          onChange={(e) => setProfile({ ...profile, bodyFat: e.target.value })}
          placeholder="体脂肪率 (%) (任意)"
          disabled={!isMonday() || !canUpdateWeekly()}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
        />

        <input
          type="number"
          value={profile.muscleMass}
          onChange={(e) => setProfile({ ...profile, muscleMass: e.target.value })}
          placeholder="筋肉量 (kg) (任意)"
          disabled={!isMonday() || !canUpdateWeekly()}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
        />

        <input
          type="number"
          value={profile.age}
          onChange={(e) => setProfile({ ...profile, age: e.target.value })}
          placeholder="年齢 (歳)"
          disabled={!canUpdateHeightAge()}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
          required
        />

        <input
          type="text"
          value={profile.weekGoal || ""}
          onChange={(e) => setProfile({ ...profile, weekGoal: e.target.value })}
          placeholder="1週間の目標 (例: 体重-1kg)"
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
        />

        <button
          onClick={handleSave}
          style={{ padding: 12, backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: 8 }}
        >
          プロフィールを保存
        </button>

        <div style={{ fontSize: 12, color: "gray", marginTop: 10 }}>
          ※体重・体脂肪率・筋肉量は毎週月曜日のみ更新可能です。<br />
          ※身長・年齢の変更は1年に1回のみ可能です。
        </div>

        {message && <div style={{ marginTop: 10, color: "red" }}>{message}</div>}
      </div>
    </div>
  );
}

export default ProfileEdit;
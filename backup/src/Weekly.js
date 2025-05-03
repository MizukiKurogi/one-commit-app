import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

function Weekly({ userId, profile }) {
  const [achieved, setAchieved] = useState(false);
  const [comment, setComment] = useState("");
  const [savedData, setSavedData] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentWeek = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  useEffect(() => {
    const fetchWeekly = async () => {
      if (!userId) return;
      const ref = doc(db, "weeklyRecords", userId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setSavedData(snap.data());
        setAchieved(snap.data().achieved || false);
        setComment(snap.data().comment || "");
      }
      setLoading(false);
    };
    fetchWeekly();
  }, [userId]);

  const handleSave = async () => {
    const ref = doc(db, "weeklyRecords", userId);
    const data = {
      achieved,
      comment,
      goal: profile?.weekGoal || "今週の目標なし",
      updatedAt: serverTimestamp(),
    };
    await setDoc(ref, data);
    setSavedData(data);
    alert("ウィークリー結果を保存しました！");
  };

  const getAdvice = () => {
    if (!savedData) return null;
    if (savedData.achieved) {
      return "素晴らしいですね！この調子で来週も続けましょう💪";
    } else {
      return "今週は少しペースを見直してみましょう。来週は目標をもう少し明確にすると良いかもしれません。";
    }
  };

  if (loading) return <p>読み込み中...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>ウィークリープラン</h2>
      <p>今週の目標：<strong>{profile?.weekGoal || "設定なし"}</strong></p>

      <label>
        <input
          type="checkbox"
          checked={achieved}
          onChange={(e) => setAchieved(e.target.checked)}
        />
        目標を達成できましたか？
      </label>

      <br />
      <textarea
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="コメント（任意）"
        style={{ width: "100%", marginTop: 10 }}
      />

      <br />
      <button onClick={handleSave} style={{ marginTop: 10 }}>
        保存
      </button>

      {savedData && (
        <div style={{ marginTop: 20 }}>
          <h3>来週へのアドバイス</h3>
          <p>{getAdvice()}</p>
        </div>
      )}
    </div>
  );
}

export default Weekly; 
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

function Monthly({ userId }) {
  const [weightRecords, setWeightRecords] = useState([]);
  const [currentWeight, setCurrentWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");

  useEffect(() => {
    const fetchWeightData = async () => {
      if (!userId) return;
      const ref = doc(db, "monthlyRecords", userId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setWeightRecords(data.records || []);
        setGoalWeight(data.goalWeight || "");
      }
    };
    fetchWeightData();
  }, [userId]);

  const handleSaveWeight = async () => {
    if (!userId || !currentWeight) return;
    const newRecord = {
      date: new Date().toISOString().split("T")[0],
      weight: parseFloat(currentWeight),
    };
    const updatedRecords = [...weightRecords, newRecord];
    const ref = doc(db, "monthlyRecords", userId);
    await setDoc(ref, {
      records: updatedRecords,
      goalWeight,
      updatedAt: serverTimestamp(),
    });
    setWeightRecords(updatedRecords);
    setCurrentWeight("");
  };

  const chartData = {
    labels: weightRecords.map((r) => r.date),
    datasets: [
      {
        label: "体重 (kg)",
        data: weightRecords.map((r) => r.weight),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
        pointRadius: 5,
        fill: true,
      },
      {
        label: "目標体重",
        data: weightRecords.map(() => parseFloat(goalWeight)),
        borderColor: "#FF5722",
        borderDash: [6, 6],
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "bottom" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}kg`,
        },
      },
    },
    scales: {
      y: {
        min: Math.min(...weightRecords.map((r) => r.weight)) - 2,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const estimateDays = () => {
    if (weightRecords.length < 2) return null;
    const start = weightRecords[0].weight;
    const now = weightRecords[weightRecords.length - 1].weight;
    const lostPerDay = (start - now) / (weightRecords.length - 1);
    if (lostPerDay <= 0) return "このペースでは達成できません💦";
    const remaining = now - parseFloat(goalWeight);
    const daysNeeded = Math.ceil(Math.abs(remaining) / lostPerDay);
    return `このペースなら約 ${daysNeeded}日で目標達成できます！`;
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h2 style={{ marginBottom: 16 }}>📊 体重の推移</h2>
      <Line data={chartData} options={chartOptions} />

      <div style={{ marginTop: 24 }}>
        <input
          type="number"
          placeholder="今日の体重 (kg)"
          value={currentWeight}
          onChange={(e) => setCurrentWeight(e.target.value)}
          style={{ padding: 10, borderRadius: 8, marginRight: 8 }}
        />
        <button
          onClick={handleSaveWeight}
          style={{ padding: 10, borderRadius: 8, background: "#4CAF50", color: "white", border: "none" }}
        >
          記録する
        </button>
      </div>

      {estimateDays() && (
        <div style={{ marginTop: 20, fontWeight: "bold", color: "#333" }}>
          {estimateDays()}
        </div>
      )}
    </div>
  );
}

export default Monthly; 
import React, { useEffect, useState } from "react";
import Daily from "./Daily";
import Weekly from "./Weekly";
import Monthly from "./Monthly";
import { FaCalendarDay, FaCalendarWeek, FaChartLine } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

function TodoDashboard({ profile, userId }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [times, setTimes] = useState({
    wakeUp: "07:00",
    lunch: "12:00",
    training: "20:00",
    sleep: "23:30",
  });
  const [activeTab, setActiveTab] = useState("daily");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const saved = localStorage.getItem(`schedule_${today}`);
    if (!saved) {
      setShowModal(true);
    }
  }, []);

  const handleSave = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(`schedule_${today}`, JSON.stringify(times));
    setShowModal(false);
  };

  const handleSkip = () => {
    setShowModal(false);
  };

  const tabStyle = (tab) => ({
    padding: 10,
    cursor: "pointer",
    borderBottom: activeTab === tab ? "2px solid #4CAF50" : "1px solid #ccc",
    fontWeight: activeTab === tab ? "bold" : "normal",
    flex: 1,
    textAlign: "center"
  });

  return (
    <div style={{ padding: 20 }}>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 8,
              maxWidth: 400,
              width: "90%",
            }}
          >
            <h2>{t('registerSchedule')}</h2>
            {Object.entries(times).map(([key, value]) => (
              <div key={key} style={{ marginBottom: 10 }}>
                <label>
                  {key === "wakeUp" && t('wakeUpTime')}
                  {key === "lunch" && t('lunchTime')}
                  {key === "training" && t('trainingTime')}
                  {key === "sleep" && t('sleepTime')}<br />
                  <input
                    type="time"
                    value={value}
                    onChange={(e) =>
                      setTimes((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    style={{ padding: 8, borderRadius: 6, width: "100%" }}
                  />
                </label>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
              <button onClick={handleSave} style={{ padding: 10, background: "#4CAF50", color: "white", border: "none", borderRadius: 6 }}>{t('save')}</button>
              <button onClick={handleSkip} style={{ padding: 10, background: "#ccc", border: "none", borderRadius: 6 }}>{t('skipToday')}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", borderBottom: "1px solid #ccc", marginBottom: 20 }}>
        <div style={tabStyle("daily")} onClick={() => setActiveTab("daily")}>デイリー</div>
        <div style={tabStyle("weekly")} onClick={() => setActiveTab("weekly")}>ウィークリー</div>
        <div style={tabStyle("monthly")} onClick={() => setActiveTab("monthly")}>マンスリー</div>
      </div>

      {activeTab === "daily" && <Daily profile={profile} schedule={times} />}
      {activeTab === "weekly" && <Weekly userId={userId} profile={profile} />}
      {activeTab === "monthly" && <Monthly userId={userId} profile={profile} />}
    </div>
  );
}

export default TodoDashboard; 
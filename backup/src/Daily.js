import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";

const sampleSchedule = (profile) => {
  const base = [
    { time: "07:00", label: "起床後サプリ（EAA）", key: "morningSupplement" },
    { time: "08:00", label: "朝食：たんぱく質中心", key: "breakfast" },
    { time: "12:30", label: "昼食＆マルチビタミン摂取", key: "lunch" },
    { time: "18:30", label: "夕食：糖質少なめ＆プロテイン", key: "dinner" },
    { time: "23:00", label: "就寝前サプリ（グルタミン）", key: "nightSupplement" },
    { time: "23:30", label: `${profile.trainingPart || "筋トレ"}`, key: "training" },
  ];
  return base;
};

function Daily({ profile }) {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [schedule, setSchedule] = useState([]);
  const [checks, setChecks] = useState({});

  const isMobile = width < 600;

  const containerStyle = {
    padding: 20,
    fontFamily: "sans-serif",
    fontSize: isMobile ? 14 : 16,
  };

  const headingStyle = {
    fontSize: isMobile ? 20 : 28,
    marginBottom: 12,
  };

  const subHeadingStyle = {
    fontSize: isMobile ? 16 : 22,
    marginTop: 20,
    marginBottom: 8,
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const saved = localStorage.getItem(`dailyChecks_${today}`);
    if (saved) {
      setChecks(JSON.parse(saved));
    }
    if (profile) {
      const generated = sampleSchedule(profile);
      setSchedule(generated);
    }
  }, [profile]);

  const toggleCheck = (key) => {
    const today = new Date().toISOString().split("T")[0];
    const updated = { ...checks, [key]: !checks[key] };
    setChecks(updated);
    localStorage.setItem(`dailyChecks_${today}`, JSON.stringify(updated));
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>{t("dailyTitle")}</h1>
      <ul>
        <li>{t("wakeUpTime")}: {schedule.map(item => item.time).join(", ")}</li>
        <li>{t("lunchTime")}: {schedule.map(item => item.label).join(", ")}</li>
        <li>{t("trainingTime")}: {schedule.map(item => item.label).join(", ")}</li>
        <li>{t("sleepTime")}: {schedule.map(item => item.time).join(", ")}</li>
      </ul>

      <div style={{ marginTop: 20 }}>
        <h2 style={subHeadingStyle}>{t("todaySupplements")}</h2>
        <ul>
          {profile?.supplements?.map((supplement, index) => (
            <li key={index}>{supplement}</li>
          )) || <li>{t("noSupplements")}</li>}
        </ul>
      </div>

      <h2>{t("todaySchedule")}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {schedule.map((item) => (
          <li
            key={item.key}
            style={{ display: "flex", alignItems: "center", marginBottom: 12 }}
          >
            <button
              onClick={() => toggleCheck(item.key)}
              style={{
                background: "none",
                border: "none",
                marginRight: 12,
                color: checks[item.key] ? "#4CAF50" : "#aaa",
                fontSize: 20,
              }}
            >
              {checks[item.key] ? <FaCheckCircle /> : <FaRegCircle />}
            </button>
            <span>
              <strong>{item.time}</strong> - {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Daily; 
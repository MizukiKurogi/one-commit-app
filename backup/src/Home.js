// src/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const icons = [
    { label: t('chat'), path: "/chat" },
    { label: t('todo'), path: "/todo" },
    { label: t('weekly'), path: "/weekly" },
    { label: t('monthly'), path: "/monthly" },
    { label: t('profileEdit'), path: "/profile-edit" },
    { label: t('settings'), path: "/settings" },
  ];

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>{t('title')}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          justifyItems: "center",
        }}
      >
        {icons.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            style={{
              width: 120,
              height: 120,
              backgroundColor: "#f0f0f0",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

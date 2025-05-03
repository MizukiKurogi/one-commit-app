// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Chat from "./Chat";
import ProfileRegister from "./ProfileRegister";
import ProfileEdit from "./ProfileEdit";
import Home from "./Home"; // ホーム画面（6アイコン）
import TodoDashboard from "./TodoDashboard";
import Weekly from "./Weekly";
import Monthly from "./Monthly";
import Login from "./Login";

function App() {
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserId(currentUser.uid);
      }
    });
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    return () => unsubscribe();
  }, []);

  const handleProfileRegister = (newProfile) => {
    localStorage.setItem("userProfile", JSON.stringify(newProfile));
    setProfile(newProfile);
  };

  const handleProfileEdit = (updatedProfile) => {
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
  };

  return (
    <Router>
      <div style={{ padding: 20 }}>
        <nav style={{ marginBottom: 20 }}>
          <Link to="/home" style={{ marginRight: 20 }}>ホーム</Link>
          <Link to="/chat" style={{ marginRight: 20 }}>チャット</Link>
          <Link to="/profile-edit" style={{ marginRight: 20 }}>プロフィール編集</Link>
          <Link to="/todo" style={{ marginRight: 20 }}>ToDo管理</Link>
        </nav>

        <Routes>
          <Route path="/" element={<EntryPoint />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile-edit" element={<ProfileEdit onSave={handleProfileEdit} />} />
          <Route path="/profile-register" element={<ProfileRegister onRegister={handleProfileRegister} />} />
          <Route path="/chat" element={<Chat profile={profile} />} />
          <Route path="/todo" element={<TodoDashboard userId={userId} profile={profile} />} />
          <Route path="/weekly" element={<Weekly userId={userId} />} />
          <Route path="/monthly" element={<Monthly userId={userId} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

function EntryPoint() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    const lastUpdate = localStorage.getItem("lastUpdate");

    if (!storedProfile) {
      navigate("/profile-register");
      return;
    }

    if (!lastUpdate) {
      navigate("/profile-edit");
      return;
    }

    const lastUpdateDate = new Date(lastUpdate);
    const today = new Date();
    const diffDays = Math.floor((today - lastUpdateDate) / (1000 * 60 * 60 * 24));

    if (diffDays >= 7) {
      navigate("/profile-edit");
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return null;
}

export default App;
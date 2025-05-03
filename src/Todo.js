import React, { useState, useEffect } from "react";

function ToDo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const today = new Date();
    const lastGeneratedDate = localStorage.getItem("todoGeneratedDate");

    if (lastGeneratedDate) {
      const lastDate = new Date(lastGeneratedDate);
      const todayDay = today.getDay(); // 0:日曜 1:月曜

      if (todayDay === 1 && today.toDateString() !== lastDate.toDateString()) {
        // 今日が月曜 & 最後に生成した日付と違ったら → 再生成
        generateInitialTodos();
      } else {
        // 保存済みのToDoをロード
        const savedTodos = JSON.parse(localStorage.getItem("userTodos"));
        if (savedTodos) setTodos(savedTodos);
      }
    } else {
      // 初回なら生成
      generateInitialTodos();
    }
  }, []);

  const generateInitialTodos = () => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    if (!profile) return;

    let initialTodos = [
      "毎日 プロテイン30g摂取",
      "毎日 水を2L飲む",
      "毎日 野菜をしっかり摂る",
      "夜8時以降の食事を控える",
      "1日15分のストレッチ",
    ];

    if (profile.weekGoal && profile.weekGoal.includes("減量")) {
      initialTodos.push("毎日 有酸素運動20分実施");
    }
    if (profile.weekGoal && profile.weekGoal.includes("筋肉")) {
      initialTodos.push("毎日 高タンパク食を意識する");
    }

    const newTodos = initialTodos.map((text) => ({ text, completed: false }));

    setTodos(newTodos);
    localStorage.setItem("userTodos", JSON.stringify(newTodos));
    localStorage.setItem("todoGeneratedDate", new Date().toISOString());
  };

  const toggleTodo = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
    localStorage.setItem("userTodos", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>今週のTo Doリスト</h1>

      {todos.length === 0 ? (
        <p>To Doがまだ登録されていません。</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {todos.map((todo, index) => (
            <li key={index} style={{ marginBottom: 10 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                />
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.text}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ToDo; 
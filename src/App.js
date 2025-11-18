import React, { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState("");
  // Initialize tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a task
  const addTask = () => {
    if (!task.trim()) return;
    setTasks([
      ...tasks,
      { text: task, completed: false, id: Date.now() }
    ]);
    setTask("");
  };

  // Mark task as completed
  const markCompleted = (id) => {
    setTasks(tasks.map((taskObj) =>
      taskObj.id === id ? { ...taskObj, completed: !taskObj.completed } : taskObj
    ));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((taskObj) => taskObj.id !== id));
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 400, margin: "auto" }}>
      <h2>To-Do List</h2>
      <input
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="New Task"
        style={{ padding: "5px", width: "60%" }}
      />
      <button onClick={addTask} style={{ padding: "5px" }}>Add Task</button>
      <ul>
        {tasks.map((taskObj) => (
          <li key={taskObj.id} style={{ margin: "6px 0" }}>
            - <span style={{ textDecoration: taskObj.completed ? "line-through" : "none" }}>
              {taskObj.text}
            </span>
            <button onClick={() => markCompleted(taskObj.id)}>
              {taskObj.completed ? "Undone" : "Done"}
            </button>
            <button onClick={() => deleteTask(taskObj.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

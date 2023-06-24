import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = () => {
    if (taskTitle.trim() === "" || taskDescription.trim() === "") {
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTaskTitle("");
    setTaskDescription("");
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskStatus(task.id)}
            />
            <span>{task.title}</span>
            <span>{task.description}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
￼Enter

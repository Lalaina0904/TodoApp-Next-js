"use client";

import { useState, useEffect } from "react";
import localforage from "localforage";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const fetchTasks = async () => {
        const tasks = await localforage.getItem("tasks");
        if (tasks) {
            setTasks(tasks);
        }
    };

    const addTask = () => {
        if (newTask.trim() !== "") {
            const updatedTasks = [
                ...tasks,
                { id: Date.now(), text: newTask, completed: false },
            ];
            setTasks(updatedTasks);
            localforage.setItem("tasks", updatedTasks);
            setNewTask("");
        }
    };

    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localforage.setItem("tasks", updatedTasks);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Ajouter une tâche"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={addTask}>Ajouter</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                        />
                        <span
                            style={{
                                textDecoration: task.completed
                                    ? "line-through"
                                    : "none",
                            }}
                        >
                            {task.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

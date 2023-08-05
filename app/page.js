"use client";

import { useState } from "react";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState("");

    const addTask = () => {
        if (newTask.trim() !== "") {
            const updatedTasks = [
                ...tasks,
                { id: Date.now(), text: newTask, completed: false },
            ];
            setTasks(updatedTasks);
            setNewTask("");
        }
    };

    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const startEditing = (taskId, taskText) => {
        setEditingTaskId(taskId);
        setEditingTaskText(taskText);
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditingTaskText("");
    };

    const saveEditingTask = (taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, text: editingTaskText } : task
        );
        setTasks(updatedTasks);
        setEditingTaskId(null);
        setEditingTaskText("");
    };

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
                <button className="add__btn" onClick={addTask}>
                    Ajouter
                </button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {editingTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTaskText}
                                    onChange={(e) =>
                                        setEditingTaskText(e.target.value)
                                    }
                                />
                                <button
                                    className="btn__save"
                                    onClick={() => saveEditingTask(task.id)}
                                >
                                    Enregistrer
                                </button>
                                <button
                                    className="btn__cancel"
                                    onClick={cancelEditing}
                                >
                                    Annuler
                                </button>
                            </>
                        ) : (
                            <>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() =>
                                        toggleTaskCompletion(task.id)
                                    }
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
                                <button
                                    className="btn__update"
                                    onClick={() =>
                                        startEditing(task.id, task.text)
                                    }
                                >
                                    Modifier
                                </button>
                                <button
                                    className="btn__delete"
                                    onClick={() => deleteTask(task.id)}
                                >
                                    X
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

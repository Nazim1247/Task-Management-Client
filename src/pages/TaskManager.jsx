import { useState, useEffect } from "react";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Fetch Tasks from Backend
    useEffect(() => {
        fetch("https://task-management-server-five-pied.vercel.app/tasks")
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error("Error fetching tasks:", err));
    }, []);

    // Function to Add Task
    const addTask = () => {
        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        const newTask = {
            title,
            description,
            category: "To-Do",
        };

        fetch("https://task-management-server-five-pied.vercel.app/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
            .then((res) => res.json())
            .then((data) => {
                setTasks([...tasks, data]); // Update UI
                setTitle("");
                setDescription("");
            })
            .catch((err) => console.error("Error adding task:", err));
    };

    return (
        <div>
            <h1>Task Manager</h1>

            {/* Task Input Form */}
            <div>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>

            {/* Task List */}
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>{task.title}</strong> - {task.description} | {task.category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;

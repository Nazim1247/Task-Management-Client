import { useState } from "react";


const TaskBoard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Complete React Project", status: "To-Do" },
        { id: 2, title: "Fix Backend API", status: "In Progress" },
        { id: 3, title: "Deploy App", status: "Done" },
      ]);

    return (
        <div className="flex justify-between p-4 items-center gap-6">
            <div className="w-1/3 p-4 border">
                <h2 className="text-xl font-bold mb-3">To-Do</h2>
                {tasks.filter(task => task.status === "To-Do").map(task => (
          <div key={task.id} className="p-2 bg-gray-100 mb-2 rounded">
            {task.title}
          </div>
        ))}
            </div>
            <div className="w-1/3 p-4 border">
                <h2 className="text-xl font-bold mb-3">In Progress</h2>
                {tasks.filter(task => task.status === "In Progress").map(task => (
          <div key={task.id} className="p-2 bg-blue-100 mb-2 rounded">
            {task.title}
          </div>
        ))}
            </div>
            <div className="w-1/3 p-4 border">
                <h2 className="text-xl font-bold mb-3">Done</h2>
                {tasks.filter(task => task.status === "Done").map(task => (
          <div key={task.id} className="p-2 bg-green-100 mb-2 rounded" draggable>
            {task.title}
          </div>
        ))}
            </div>
        </div>
    );
};

export default TaskBoard;
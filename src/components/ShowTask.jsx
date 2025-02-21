// import { useEffect, useState } from "react";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import { useDrag } from "react-dnd";

// const ShowTask = () => {
//     const axiosSecure = useAxiosSecure();
//     const [tasks, setTasks] = useState([]);

//     useEffect(()=>{
//         fetchAllTasks()
//     },[])

//     const fetchAllTasks = async ()=>{
//         await axiosSecure.get('/tasks')
//         .then(res =>{
//             setTasks(res.data)
//         })
//         .catch(error =>{
//             console.log(error.message)
//         })
//     }

//     return (
//         <div>
//             <h2>All Tasks: {tasks.length}</h2>
//             <div className="flex items-start gap-6 justify-center">
            
//             <TaskColumn title="To-Do" tasks={tasks} category="To-Do" />
//                 <TaskColumn title="In Progress" tasks={tasks} category="In Progress" />
//                 <TaskColumn title="Done" tasks={tasks} category="Done" />
//             </div>
//         </div>
//     );
// };

// const TaskColumn = ({ title, tasks, category }) => {
//     return (
//         <div>
//             <h2>{title}</h2>
//             {tasks
//                 .filter(task => task.category === category)
//                 .map(task => (
//                     <TaskCard key={task._id} task={task} />
//                 ))}
//         </div>
//     );
// };

// const TaskCard = ({ task }) => {
//     const [{ isDragging }, drag] = useDrag(() => ({
//         type: 'task',
//         item: { id: task._id }, // একক `task` পাস করছি
//         collect: (monitor) => ({
//             isDragging: !!monitor.isDragging()
//         })
//     }));

//     return (
//         <div 
//             className={`border rounded-lg shadow py-2 px-4 mt-4 ${isDragging ? "opacity-25" : "opacity-100"}`}
//             ref={drag}
//         >
//             <h2>{task.category}</h2>
//             <h2>{task.title}</h2>
//             <p>{task.description}</p>
//             <div className="flex items-center gap-6 justify-center">
//                 <button className="btn btn-xs">E</button>
//                 <button className="btn btn-xs">X</button>
//             </div>
//         </div>
//     );
// };

// export default ShowTask;

import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useDrag, useDrop } from "react-dnd";

const ShowTask = () => {
    const axiosSecure = useAxiosSecure();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const fetchAllTasks = async () => {
        try {
            const res = await axiosSecure.get("/tasks");
            setTasks(res.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // ✅ ডাটা আপডেট করার জন্য ফাংশন
    const updateTaskCategory = async (taskId, newCategory) => {
        try {
            await axiosSecure.put(`/tasks/${taskId}`, { category: newCategory });

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === taskId ? { ...task, category: newCategory } : task
                )
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h2>All Tasks: {tasks.length}</h2>
            <div className="flex items-start gap-6 justify-center">
                <TaskColumn title="To-Do" tasks={tasks} category="To-Do" updateTaskCategory={updateTaskCategory} />
                <TaskColumn title="In Progress" tasks={tasks} category="In Progress" updateTaskCategory={updateTaskCategory} />
                <TaskColumn title="Done" tasks={tasks} category="Done" updateTaskCategory={updateTaskCategory} />
            </div>
        </div>
    );
};

const TaskColumn = ({ title, tasks, category, updateTaskCategory }) => {
    // ✅ এখানে `useDrop` যোগ করা হয়েছে
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => updateTaskCategory(item.id, category),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    return (
        <div ref={drop} className={`p-4 w-64 min-h-[200px] border rounded-lg ${isOver ? "bg-gray-300" : "bg-gray-100"}`}>
            <h2 className="text-lg font-semibold">{title}</h2>
            {tasks
                .filter(task => task.category === category)
                .map(task => (
                    <TaskCard key={task._id} task={task} />
                ))}
        </div>
    );
};

const TaskCard = ({ task }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    return (
        <div
            className={`border rounded-lg shadow py-2 px-4 mt-4 ${isDragging ? "opacity-25" : "opacity-100"}`}
            ref={drag}
        >
            <h2>{task.category}</h2>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <div className="flex items-center gap-6 justify-center">
                <button className="btn btn-xs">E</button>
                <button className="btn btn-xs">X</button>
            </div>
        </div>
    );
};

export default ShowTask;

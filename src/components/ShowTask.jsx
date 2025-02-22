/* eslint-disable react/prop-types */

import { useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useDrag, useDrop } from "react-dnd";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ShowTask = () => {
    const {user} =  useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    // const [tasks, setTasks] = useState([]);

    // useEffect(() => {
    //     fetchAllTasks();
    // }, []);

    // const fetchAllTasks = async () => {
    //     try {
    //         const res = await axiosSecure.get("/tasks");
    //         setTasks(res.data);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    const {data: tasks = [], isLoading, refetch} = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/tasks/${user?.email}`)
            return data;
        }
    })

    if(isLoading) return <p className="text-center"><span className="loading loading-spinner loading-lg"></span></p>


    
    const updateTaskCategory = async (taskId, newCategory) => {
        try {
            const taskToUpdate = tasks.find(task => task._id === taskId);
            await axiosSecure.put(`/tasks/${taskId}`, { category: newCategory, title: taskToUpdate.title, description: taskToUpdate.description });
            refetch()

            // setTasks(prevTasks =>
            //     prevTasks.map(task =>
            //         task._id === taskId ? { ...task, category: newCategory } : task
            //     )
            // );
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            {/* <h2>All Tasks: {tasks.length}</h2> */}
            <div className="flex items-start gap-6 justify-center">
                <TaskColumn title="To-Do" tasks={tasks} category="To-Do" updateTaskCategory={updateTaskCategory} refetch={refetch}/>
                <TaskColumn title="In Progress" tasks={tasks} category="In Progress" updateTaskCategory={updateTaskCategory} refetch={refetch}/>
                <TaskColumn title="Done" tasks={tasks} category="Done" updateTaskCategory={updateTaskCategory} refetch={refetch}/>
            </div>
        </div>
    );
};

const TaskColumn = ({ title, tasks, category, updateTaskCategory, refetch }) => {
    
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => updateTaskCategory(item.id, category),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    return (
        <div ref={drop} className={`p-4 w-64 min-h-[200px] border rounded-lg ${isOver ? "bg-gray-300" : "bg-gray-100"}`}>
            <h2 className="text-lg font-semibold bg-primary p-2 rounded-lg text-white">{title}</h2>
            {tasks
                .filter(task => task.category === category)
                .map(task => (
                    <TaskCard key={task._id} task={task} refetch={refetch}/>
                ))}
        </div>
    );
};

const TaskCard = ({ task, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const handleRemove = (id)=>{
        // console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/tasks/${id}`)
                
                .then(res =>{
                    if(res.data.deletedCount > 0){
                        refetch()
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success"
                        });
                    }
                })
            }
          });
    }

    return (
        <div
            className={`border rounded-lg shadow py-2 px-4 mt-4 ${isDragging ? "opacity-25" : "opacity-100"}`}
            ref={drag}
        >
            <h2>{task.category}</h2>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.date}</p>
            <div className="flex items-center gap-6 justify-center">
                <Link to={`/updateTask/${task._id}`}>E</Link>
                <button onClick={()=> handleRemove(task._id)} className="btn btn-xs">X</button>
            </div>
        </div>
    );
};

export default ShowTask;

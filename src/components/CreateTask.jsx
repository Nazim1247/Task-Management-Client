/* eslint-disable react/prop-types */
import { useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({tasks,setTasks}) => {
    const [task,setTask] = useState({
        id: '',
        name: '',
        status: 'todo',
    })
    // console.log(task)

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(task.name.length < 3) 
            return Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "A Task must have more then 3 characters",
                    showConfirmButton: false,
                    timer: 1500
                    });
        if(task.name.length > 50) 
            return Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "A Task must not be more then 50 characters",
                    showConfirmButton: false,
                    timer: 1500
                    });

        setTasks((prev)=>{
            const list = (Array.isArray(prev) ? [...prev, task] : [task]);
            localStorage.setItem('tasks', JSON.stringify(list))
            return list
        })

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "A Task Added",
            showConfirmButton: false,
            timer: 1500
            });

        setTask({
        id: '',
        name: '',
        status: 'todo',
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="input input-bordered" placeholder="Create Task"
            value={task.name} 
            onChange={(e)=> setTask({...task, id: uuidv4(), name: e.target.value})}/>

            {/* <input type="text" className="input input-bordered" placeholder="Title"
            value={task.name} 
            onChange={(e)=> setTask({...task, id: uuidv4(), name: e.target.value})}/>

            <input type="text" className="input input-bordered" placeholder="Description"
            value={task.name} 
            onChange={(e)=> setTask({...task, id: uuidv4(), name: e.target.value})}/>

            <input type="text" className="input input-bordered" placeholder="Category"
            value={task.name} 
            onChange={(e)=> setTask({...task, id: uuidv4(), name: e.target.value})}/> */}

            <button className="btn btn-primary ml-4">Add Task</button>
        </form>
    );
};

export default CreateTask;
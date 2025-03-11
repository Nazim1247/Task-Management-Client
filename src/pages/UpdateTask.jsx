
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const UpdateTask = () => {
    const navigate = useNavigate();
    const [task, setTask] = useState([]);
    // console.log(task)
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();

    useEffect(()=>{
        fetchATasks()
    },[])

    const fetchATasks = async () => {
            try {
                const res = await axiosSecure.get(`/task/${id}`);
                setTask(res.data);
            } catch (error) {
                console.log(error.message);
            }
        };

    const handleSubmit = async (e)=>{
            e.preventDefault()
            const form = e.target;
            const title = form.title.value;
            const description = form.description.value;
            const category = form.category.value;
            
            // const date = form.date.value;
            // console.log(title,description,category,date,email)
    
            const taskInfo = {
                title,description,category
            }
            await axiosSecure.put(`/tasks/${id}`,taskInfo)
            .then(res =>{
                console.log(res.data)
                if(res.data.modifiedCount > 0){
                    navigate('/')
                    Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task Updated Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                    });
                }
            })
            .catch(error =>{
                console.log(error.message)
            })
        }
    return (
        <div className="hero bg-base-200 dark:bg-gray-900">
  <div className="hero-content flex-col w-full lg:w-2/3 mx-auto">
    <div className="text-center lg:text-left">
      <h1 className="text-2xl font-bold">Update Task</h1>
      
    </div>
    <div className="card bg-base-100 dark:bg-gray-800 w-full mx-auto">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          
          <input type="text" name="title" defaultValue={task.title} placeholder="Title" className="input input-bordered dark:bg-gray-900" required />
        </div>
        <div className="form-control">
          
          <input type="text" name="description" defaultValue={task.description} placeholder="Description" className="input input-bordered dark:bg-gray-900" required />
        </div>
        <div className="form-control">
          
          <select name="category" value={task.category}
          onChange={(e)=> setTask(e.target.value)} className="select select-bordered w-full dark:bg-gray-900">
         <option>Select Your Category</option>
         <option>To-Do</option>
         <option>In Progress</option>
         <option>Done</option>
         </select>
        </div>
        
        <div className="form-control mt-6">
          <button className="btn btn-primary">Update Task</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default UpdateTask;
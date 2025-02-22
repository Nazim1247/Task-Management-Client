
import { useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";

const AddTask = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const email = user.email;
        const date = Date();
        // const date = form.date.value;
        // console.log(title,description,category,date,email)

        const taskInfo = {
            title,description,category,date,email
        }
        
        await axiosSecure.post('/tasks',taskInfo)
        .then(res =>{
            console.log(res.data)
            if(res.data.insertedId){
                Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Task Added Successfully!",
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
        <div className="hero bg-base-200 dark:bg-gray-700 rounded-xl">
  <div className="hero-content flex-col w-full">
    <div className="text-center ">
      <h3 className="text-2xl font-bold">Add Task</h3>
      
    </div>
    <div className="card bg-base-100 dark:bg-gray-800 w-full mx-auto">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          
          <input type="text" name="title" placeholder="Title" className="input input-bordered dark:bg-gray-700" required />
        </div>
        <div className="form-control">
          
          <input type="text" name="description" placeholder="Description" className="input input-bordered dark:bg-gray-700" required />
        </div>
        <div className="form-control">
          
          <select name="category" className="select select-bordered w-full dark:bg-gray-700">
         <option>Select Your Category</option>
         <option>To-Do</option>
         <option>In Progress</option>
         <option>Done</option>
         </select>
        </div>
        
        <div className="form-control">
          <button className="btn btn-primary">Add Task</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default AddTask;
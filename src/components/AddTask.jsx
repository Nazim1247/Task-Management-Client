
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddTask = () => {
    
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const date = Date();
        // const date = form.date.value;
        console.log(title,description,category,date)

        const taskInfo = {
            title,description,category,date
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
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col w-full">
    <div className="text-center lg:text-left">
      <h1 className="text-2xl font-bold">Add Task</h1>
      
    </div>
    <div className="card bg-base-100 w-full mx-auto">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          {/* <label className="label">
            <span className="label-text">Title</span>
          </label> */}
          <input type="text" name="title" placeholder="Title" className="input input-bordered" required />
        </div>
        <div className="form-control">
          {/* <label className="label">
            <span className="label-text">Description</span>
          </label> */}
          <input type="text" name="description" placeholder="Description" className="input input-bordered" required />
        </div>
        <div className="form-control">
          {/* <label className="label">
            <span className="label-text">Category</span>
          </label> */}
          <select name="category" className="select select-bordered w-full">
         <option disabled selected>Select Your Category</option>
         <option>To-Do</option>
         <option>In Progress</option>
         <option>Done</option>
         </select>
        </div>
        {/* <div className="form-control">
          <label className="label">
            <span className="label-text">Timestamp</span>
          </label>
          <input type="date" name="date" placeholder="Timestamp" className="input input-bordered" required />
        </div> */}
        <div className="form-control mt-6">
          <button className="btn btn-primary">Add Task</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default AddTask;
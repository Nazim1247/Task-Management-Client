import { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SocialLogin from "../social/SocialLogin";
import { AuthContext } from "../components/AuthProvider";


const Register = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {createUser, setUser, updateUser} = useContext(AuthContext);

    const handleSubmit = (e)=>{
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(name,photo,email,password)

        createUser(email,password)
        .then(async(result) =>{
            setUser({
                ...result.user,photoUrl: photo
            })

            //update user
            updateUser({displayName: name, photoURL: photo})
            navigate('/')
            // console.log(result.user)
            const userInfo = {
                name,
                photo,
                email
            }
            await axiosSecure.post('/users',userInfo)
            .then(res =>{
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Register Successfully!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
            .catch(error=>{
                console.log(error.message)
            })
        })
        .catch(error =>{
            console.log(error.message)
        })
    }

    return (
        <div>
        <div className="hero bg-base-200 dark:bg-gray-900">
        <div className="hero-content flex-col lg:w-2/3 mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold">Register now!</h1>
            
          </div>
          <div className="card bg-base-100 dark:bg-gray-800 w-full">
            <Link to='/login' className="text-center my-4">Already Have an Account? <span className="text-red-600">Login</span></Link>
            <button type="button" className="btn mx-auto dark:bg-gray-900 dark:text-gray-200">
            <SocialLogin></SocialLogin>
            </button>
            <div className="divider md:w-2/3 mx-auto dark:bg-gray-900">OR</div>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span>Name</span>
                </label>
                <input type="text" name="name" placeholder="name" className="input input-bordered dark:bg-gray-900" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span>Photo Url</span>
                </label>
                <input type="text" name="photo" placeholder="photo url" className="input input-bordered dark:bg-gray-900" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span>Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered dark:bg-gray-900" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span>Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered dark:bg-gray-900" required />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Register;
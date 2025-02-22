import { Link } from "react-router";
import SocialLogin from "../social/SocialLogin";


const Login = () => {
    const handleSubmit = (e)=>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)
    }

    return (
        <div className="hero bg-base-200 min-h-screen mt-16 dark:bg-gray-900">
        <div className="hero-content flex-col lg:w-2/3 mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold">Login now!</h1>
            
          </div>
          <div className="card bg-base-100 dark:bg-gray-800 w-full">
          <Link to='/register' className="text-center my-4">New to this Page? <span className="text-red-600">Register</span></Link>
            <button type="button" className="btn mx-auto dark:bg-gray-900 dark:text-gray-200">
            <SocialLogin></SocialLogin>
            </button>
            <div className="divider md:w-2/3 mx-auto dark:bg-gray-900">OR</div>
            <form onSubmit={handleSubmit} className="card-body">
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
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Login;
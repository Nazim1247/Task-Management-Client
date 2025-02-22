import { useContext } from "react";
import { Link } from "react-router";
// import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";


const Navbar = () => {
  // const navigate = useNavigate();
  const {user, logoutUser} = useContext(AuthContext);
  // console.log(user)
    const links = <div className="flex items-center gap-2">

    {/* <NavLink to='/addTask'>Add Task</NavLink>
    <NavLink to='/taskManager'>Task Manager</NavLink> */}

    </div>

const handleLogout = ()=>{
  logoutUser()
  .then(() =>{
    // navigate('/login')
    Swal.fire({
    position: "top-center",
    icon: "success",
    title: "Logout User Successfully!!",
    showConfirmButton: false,
    timer: 1500
    });
  })
  .catch(error =>{
    console.log(error.message)
  })
}

    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {links}
        
      </ul>
    </div>
    <a className="text-xl font-bold">Task Management</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}

    </ul>
  </div>
  <div className="navbar-end">
  {
      user && user.email ? 
      <>
      <button className='btn btn-ghost' onClick={handleLogout}>Logout</button>
      <img title={user?.displayName} className='w-10 h-10 rounded-full' src={user?.photoURL} alt="" />
      </> 
      : 
      <Link className='btn btn-ghost' to='/login'>Login</Link>
    }
  </div>
</div>
        </div>
    );
};

export default Navbar;
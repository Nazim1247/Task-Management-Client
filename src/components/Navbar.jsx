import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdOutlineLightMode } from "react-icons/md";


const Navbar = () => {
  const [isDark,setIsDark]=useState(false);
  const navigate = useNavigate();
  const {user, logoutUser} = useContext(AuthContext);
  // console.log(user)

const handleLogout = ()=>{
  logoutUser()
  .then(() =>{
    navigate('/login')
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

const handleTheme = ()=>{
  setIsDark(!isDark)
  document.body.classList.toggle('dark')
}

    return (
        <div>
            <div className="navbar w-11/12 mx-auto">
  <div className="navbar-start">
  <button onClick={handleTheme} className='btn btn-ghost text-4xl'>{isDark?<BsFillMoonStarsFill className='text-gray-500' title='Click for Light Mode' />:<MdOutlineLightMode className='text-white' title='Click for Dark Mode'/>}</button>  
    <h2 className="text-xl font-bold">Task Management</h2>
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
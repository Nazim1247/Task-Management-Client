import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdOutlineLightMode } from "react-icons/md";


const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();
  const {user, logoutUser} = useContext(AuthContext);
  // console.log(user)
  const links = <div className='flex lg:flex-row flex-col space-x-3'>
    <NavLink to='/' className={({ isActive }) => isActive ? 'btn btn-ghost btn-sm text-black font-bold' : 'btn btn-ghost btn-sm text-white'}>Manage Task</NavLink>
    <NavLink to='/addTask' className={({ isActive }) => isActive ? 'btn btn-ghost btn-sm text-black font-bold' : 'btn btn-ghost btn-sm text-white'}>Add Task</NavLink>
  </div>

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
  setTheme((prevTheme)=>(prevTheme === 'light'? 'dark': 'light'))
}
 useEffect(()=>{
  if(theme === 'dark'){
    document.documentElement.classList.add('dark')
}else{
    document.documentElement.classList.remove('dark')
}
localStorage.setItem('theme', theme)
 },[theme])

    return (
        <div>
            <div className="navbar w-11/12 mx-auto">
  <div className="navbar-start">
  <button onClick={handleTheme} className='btn btn-ghost btn-sm text-3xl'>
    {theme === 'light'?
    <MdOutlineLightMode className='text-white' title='Click for Dark Mode'/>:
    <BsFillMoonStarsFill className='text-gray-500' title='Click for Light Mode' />}
    </button>
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-primary">
        {links}
      </ul>
    </div>
    <h2 className="text-xl font-bold hidden md:flex">Task Management</h2>
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
      <button className='btn btn-ghost btn-sm' onClick={handleLogout}>Logout</button>
      <img title={user?.displayName} className='w-8 h-8 rounded-full' src={user?.photoURL} alt="" />
      </> 
      : 
      <Link className='btn btn-ghost btn-sm' to='/login'>Login</Link>
    }
  </div>
</div>
        </div>
    );
};

export default Navbar;
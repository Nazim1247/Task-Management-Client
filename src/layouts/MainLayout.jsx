import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const MainLayout = () => {
    return (
        <div className='max-w-[1280px] mx-auto dark:bg-gray-900 dark:text-gray-200'>
            <div className='bg-primary text-white fixed top-0 z-50 w-full max-w-[1280px] mx-auto'>
                <Navbar></Navbar>
            </div>
            <div className="min-h-[423px]">
            <Outlet></Outlet>
            </div>
            <div className="w-full max-w-[1280px] mx-auto">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;
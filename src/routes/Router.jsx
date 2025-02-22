import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../errorPage/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../App";
import UpdateTask from "../pages/UpdateTask";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        
        children: [
            {
                path: '/',
                element: <App></App>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/updateTask/:id',
                element: <UpdateTask></UpdateTask>
            },
            
        ],
        
    },
])

export default router;
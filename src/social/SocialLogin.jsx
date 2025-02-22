import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
// import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../components/AuthProvider";


const SocialLogin = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {googleLogin}=useContext(AuthContext);

    const handleGoogleLogin = ()=>{
        googleLogin()
        .then(result =>{
            const userInfo = {
                name: result.user?.displayName,
                email: result.user?.email,
                photo: result.user?.photoURL,
            }
            axiosSecure.post('/users', userInfo)
            .then(res =>{
                // console.log('google user added')
                navigate('/')
                if(res.data.insertedId){
                    Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Login Successfully!!",
                    showConfirmButton: false,
                    timer: 1500
                    });
                }
            })

        })
    }

    return (
        <div>
            <button className="flex items-center gap-2" type="button" onClick={handleGoogleLogin}><FcGoogle className="text-lg"/> Continue With Google</button>
        </div>
    );
};

export default SocialLogin;
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://task-management-server-five-pied.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
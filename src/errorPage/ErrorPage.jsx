import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router";


const ErrorPage = () => {
    return (
        <div className="text-center mt-12 space-y-4">
            <p className="text-xl">Opps!!</p>
            <h2 className="text-3xl font-bold">Data Not Found</h2>
            <Link to={'/'}><button className="btn btn-primary mt-4"><FaArrowLeftLong />Back to Home</button></Link>
        </div>
    );
};

export default ErrorPage;
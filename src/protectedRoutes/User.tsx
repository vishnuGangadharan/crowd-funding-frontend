import { useSelector } from "react-redux";
import { RootState } from "../../src/redux/store";
import { Navigate, Outlet } from "react-router-dom";


const UserProtected: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth);
    console.log("user" , user);
    
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default UserProtected;
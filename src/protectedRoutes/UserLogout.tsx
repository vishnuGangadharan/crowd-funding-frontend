import { useSelector } from "react-redux";
import { RootState } from "../../src/redux/store";
import { Navigate, Outlet } from "react-router-dom";


const UserLogout: React.FC = () => {
    const {userInfo} = useSelector((state: RootState) => state.auth);
    
    return !userInfo ?   <Outlet />   :  <Navigate to="/home" />
};

export default UserLogout;
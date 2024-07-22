import { RootState } from "../../src/redux/store";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const adminLogout = () => {
    const adminInfo = useSelector((state: RootState) => state.admin.adminInfo);
    return !adminInfo ?   <Outlet />   :  <Navigate to="/users" />

 
}

export default adminLogout

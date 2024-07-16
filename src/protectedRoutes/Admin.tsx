import { RootState } from "../../src/redux/store";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminProtected: React.FC = () => {
    const adminInfo = useSelector((state: RootState) => state.admin.adminInfo);

    console.log("protect", adminInfo)
    return adminInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtected;

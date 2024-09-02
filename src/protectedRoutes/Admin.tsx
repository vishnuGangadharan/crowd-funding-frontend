import { RootState } from "../../src/redux/store";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminProtected: React.FC = () => {
    const adminInfo = useSelector((state: RootState) => state.admin.adminInfo);
    
    if (!adminInfo) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default AdminProtected;

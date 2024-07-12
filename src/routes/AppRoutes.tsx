import { Routes, Route } from "react-router-dom"
import UserRoutes from "./UserRoutes"
import AdminRoutes from "./AdminRoutes"


const AppRoutes = () => {


  return (
    <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes/>} />
    </Routes>
    
  )
}


export default AppRoutes

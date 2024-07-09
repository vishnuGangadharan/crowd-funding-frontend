import { Routes, Route } from "react-router-dom"
import UserRoutes from "./UserRoutes"


const AppRoutes = () => {


  return (
    <Routes>
        <Route path="/*" element={<UserRoutes />} />
    </Routes>
    
  )
}


export default AppRoutes

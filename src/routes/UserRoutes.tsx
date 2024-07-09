import { Suspense ,lazy} from "react"
import { Route, Routes } from "react-router-dom"


const Login = lazy(()=> import ("../pages/Login"))
const Home = lazy(()=> import ("../pages/Home"))
const Signup = lazy(()=> import ("../pages/SignUp"))
const OTP = lazy(()=> import ("../pages/OTP"))

const UserRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp" element={<OTP />} />
        </Routes>
    </Suspense>
  )
}

export default UserRoutes

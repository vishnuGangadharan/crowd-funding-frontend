import { Suspense ,lazy} from "react"
import { Route, Routes } from "react-router-dom"


const Login = lazy(()=> import ("../pages/Login"))
const Home = lazy(()=> import ("../pages/Home"))
const Signup = lazy(()=> import ("../pages/SignUp"))
const OTP = lazy(()=> import ("../pages/OTP"))
const Profile = lazy(()=> import ("../pages/Profile"))
const Email = lazy(()=> import ("../Components/user/mutipleForm/Email"))
const  Form2 = lazy(()=> import ("../Components/user/mutipleForm/Form2"))


const UserRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp" element={<OTP />} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/form2' element={<Form2/>}/>
            <Route path='/email' element={<Email/>}/>
        </Routes>
    </Suspense>
  )
}

export default UserRoutes

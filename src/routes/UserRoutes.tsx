import { Suspense ,lazy} from "react"
import { Route, Routes } from "react-router-dom"


const Login = lazy(()=> import ("../pages/Login"))
const Home = lazy(()=> import ("../pages/Home"))
const Signup = lazy(()=> import ("../pages/SignUp"))
const OTP = lazy(()=> import ("../pages/OTP"))
const Profile = lazy(()=> import ("../pages/Profile"))
const FundraisingRegister = lazy(()=> import ("../Components/user/mutipleForm/FundraiserRegister"))
const MediaUploader = lazy(()=> import ("../pages/MediaUploader"))




const UserRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp" element={<OTP />} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/registration' element={<FundraisingRegister/>}/>
            <Route path='/meadia-uploader' element={<MediaUploader/>}/>
        </Routes>
    </Suspense>
  )
}

export default UserRoutes

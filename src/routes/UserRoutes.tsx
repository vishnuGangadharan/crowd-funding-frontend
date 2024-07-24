import { Suspense ,lazy} from "react"
import { Route, Routes } from "react-router-dom"
import UserProtected from "../protectedRoutes/User"
import UserLogout from "../protectedRoutes/UserLogout"

const Login = lazy(()=> import ("../pages/Login"))
const Home = lazy(()=> import ("../pages/Home"))
const Signup = lazy(()=> import ("../pages/SignUp"))
const OTP = lazy(()=> import ("../pages/OTP"))
const Profile = lazy(()=> import ("../pages/Profile"))
const FundraisingRegister = lazy(()=> import ("../Components/user/mutipleForm/FundraiserRegister"))
const MediaUploader = lazy(()=> import ("../pages/user/MediaUploader"))
const Fundraising  = lazy(()=> import ("../pages/user/Fundraisings"))
const OTPforFunddRegister = lazy(()=> import ('../pages/user/OTPforFundRegister'))


const UserRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* if user is logout */}
            <Route path="/home" element={<Home />} />
          <Route element={<UserLogout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
            <Route path="/otp" element={<OTP />} />
          {/* if the user is login */}
          <Route element={<UserProtected />}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/registration' element={<FundraisingRegister/>}/>
            <Route path='/media-uploader' element={<MediaUploader/>}/>
            <Route path='/fundraising' element={<Fundraising/>}/>
            <Route path='/beneficiary-otp' element={<OTPforFunddRegister/>}/>

          </Route>
        </Routes>
    </Suspense>
  )
}

export default UserRoutes

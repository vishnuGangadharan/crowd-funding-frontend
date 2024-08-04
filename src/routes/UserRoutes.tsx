import { Suspense ,lazy} from "react"
import { Route, Routes } from "react-router-dom"
import UserProtected from "../protectedRoutes/User"
import UserLogout from "../protectedRoutes/UserLogout"
import UserLayout from "@/layout/UserLayout"


const Login = lazy(()=> import ("../pages/Login"))
const Home = lazy(()=> import ("../pages/Home"))
const Signup = lazy(()=> import ("../pages/SignUp"))
const OTP = lazy(()=> import ("../pages/OTP"))
const Profile = lazy(()=> import ("../pages/Profile"))
const FundraisingRegister = lazy(()=> import ("../Components/user/mutipleForm/FundraiserRegister"))
const MediaUploader = lazy(()=> import ("../pages/user/MediaUploader"))
const Fundraising  = lazy(()=> import ("../pages/user/Fundraisings"))
const OTPforFundRegister = lazy(()=> import ('../pages/user/OTPforFundRegister'))
const PostDetails = lazy(()=> import('../pages/user/PostDetails'))
const AllPosts = lazy(()=> import ('../pages/user/AllPosts'))

const UserRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            
            <Route path="/otp" element={<OTP />} />
            <Route path="/home" element={<Home />} />

          <Route element={<UserProtected />}>
          <Route element={<UserLayout />}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/fundraising' element={<Fundraising/>}/>
            <Route path='/beneficiary-otp' element={<OTPforFundRegister/>}/>
            <Route path="/postdetails/:id" element={<PostDetails />} />
            <Route path='/all-posts' element={<AllPosts/>}/>
          </Route>
            <Route path='/registration' element={<FundraisingRegister/>}/>
            <Route path='/media-uploader' element={<MediaUploader/>}/>
          </Route>


          <Route element={<UserLogout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

        </Routes>
    </Suspense>
  )
}

export default UserRoutes

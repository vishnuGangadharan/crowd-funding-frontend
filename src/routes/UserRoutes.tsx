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
const Shearing = lazy(()=> import ('../Components/user/Shearing'))
const Spinner = lazy(()=> import ('../Components/user/Spinner'))
import AllPosts from '../pages/user/AllPosts'; 
const Dummy = lazy(() => import ('../pages/user/Dummy'))
const Chat = lazy(() => import ('../pages/user/Chat'))
const ShowUpdates = lazy(() => import ('../pages/user/ShowUpdates'))
const ShowAllDonations = lazy(() => import ('../pages/user/ShowAllDonations'))
const Wallet = lazy(() => import ('../pages/user/Wallet'))
const ErrorPage = lazy(() => import ('../pages/user/404'))

const UserRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Spinner/>}>
        <Routes>
            
            <Route path="/otp" element={<OTP />} />
            <Route path="/" element={<Home />} />

          <Route element={<UserProtected />}>
          <Route element={<UserLayout />}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/fundraising' element={<Fundraising/>}/>
            <Route path="/postdetails" element={<PostDetails />} />
            <Route path='/all-posts' element={<AllPosts/>}/>
            <Route path='/share' element={<Shearing/>}/>
            <Route path='/dummy' element={<Dummy/>}/>
            <Route path="/status-updates" element={<ShowUpdates/>}/>
            <Route path="/all-donations/:beneficiaryId" element={<ShowAllDonations/>}/>
            <Route path="/wallet" element={<Wallet/>}/>
          </Route>
          <Route path="*" element={<ErrorPage/>}/>
            <Route path='/beneficiary-otp' element={<OTPforFundRegister/>}/>
            <Route path="/chat" element={<Chat/>}/>
            <Route path='/registration' element={<FundraisingRegister/>}/>
            <Route path='/media-uploader' element={<MediaUploader/>}/>
          </Route>


          <Route element={<UserLogout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<ErrorPage/>}/>
          </Route>

        </Routes>
    </Suspense>
  )
}

export default UserRoutes

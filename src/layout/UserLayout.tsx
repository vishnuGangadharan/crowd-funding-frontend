import NavBar from '@/Components/user/NavBar'
import Footer from '@/Components/user/Footer'
import { Outlet } from 'react-router-dom'
const UserLayout = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
      
    </div>
  )
}

export default UserLayout

// import React from 'react'

// import { Link, useNavigate } from 'react-router-dom';
// import { googleLogout } from '@react-oauth/google';
// import { useDispatch,useSelector } from 'react-redux';
// import { adminLogout } from '../../redux/slice/adminSlice';
// import cookies from 'js-cookie';

// const SidePanel = () => {
// const dispatch = useDispatch()
// const navigate = useNavigate()
// const handleLogout = ()=>{
//     dispatch(adminLogout());
//     cookies.remove('jwt');
//     googleLogout();
//     navigate('/login')
// }

//     return (
       
//             <div className="h-[80%] w-64 bg-gray-800 text-white ml-10 mt-10 rounded-large">
//                 <div className="flex items-center justify-center h-16 bg-gray-900 text-xl font-bold rounded-large">
//                     Admin Panel
//                 </div>
//                 <nav className="flex flex-col mt-4">
//                     <div className="flex items-center px-4 py-2 hover:bg-gray-700">
//                         Dashboard
//                     </div>
//                     <Link to='/admin/users'>
//                     <div className="flex items-center px-4 py-2 hover:bg-gray-700">
//                         Users
//                     </div>
//                     </Link>
//                     <Link to='/admin/request'>
//                     <div className="flex items-center px-4 py-2 hover:bg-gray-700">
//                         campaign request
//                     </div> 
//                     </Link>
//                     <div className="flex items-center px-4 py-2 hover:bg-gray-700">
//                         Fundraisers
//                     </div> 
//                     <div className="flex items-center px-4 py-2 hover:bg-gray-700">
//                         Reports
//                     </div>
//                     <div className="flex items-center px-4 py-2 hover:bg-gray-700" onClick={handleLogout}>
//                         LogOut
//                     </div>
//                 </nav>
//             </div>
        
//     )
// }

// export default SidePanel
import React from 'react'

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useDispatch,useSelector } from 'react-redux';
import { adminLogout } from '../../redux/slice/adminSlice';
import cookies from 'js-cookie';

const SidePanel = () => {

    const dispatch = useDispatch()
const navigate = useNavigate()
const handleLogout = ()=>{
    dispatch(adminLogout());
    cookies.remove('jwt');
    googleLogout();
    navigate('/login')
}
  return (
    <div>
        
    <div className="h-screen w-64 bg-gray-800 text-white">
        
    <Sidebar aria-label="Sidebar with logo branding example">
      <div  className="flex items-center justify-center py-6">
        <img src="/favicon.svg" alt="Flowbite logo" className="h-12 w-12" />
        <span className="ml-3 text-xl font-semibold">Flowbite</span>
      </div >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie} className="hover:bg-gray-700">
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards} className="hover:bg-gray-700">
            Kanban
          </Sidebar.Item>
          <Link to='/admin/request'>
          <Sidebar.Item  icon={HiInbox} className="hover:bg-gray-700">
          campaign request
          </Sidebar.Item>
          </Link>
          <Link to='/admin/users'>
          <Sidebar.Item  icon={HiUser} className="hover:bg-gray-700">
            Users
          </Sidebar.Item>
          </Link>
          <Sidebar.Item href="#" icon={HiShoppingBag} className="hover:bg-gray-700">
            Products
          </Sidebar.Item>
          <Sidebar.Item  href="#" icon={HiArrowSmRight} className="hover:bg-gray-700">
            Sign In
          </Sidebar.Item>
          <Sidebar.Item onClick={handleLogout} icon={HiTable} className="hover:bg-gray-700" >
           Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  </div > 
  </div>
   )
}

export default SidePanel

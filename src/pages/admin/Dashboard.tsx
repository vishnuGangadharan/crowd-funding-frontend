import React from 'react'
import SidePanel from '../../Components/admin/SidePanel';
import Users from '../../Components/admin/Users';
const Dashboard = () => {
    console.log("here admin");

  return (
    <div className='bg-purple-400 h-screen flex'>
      <SidePanel/>
      <Users/>
    </div>
  )
}

export default Dashboard

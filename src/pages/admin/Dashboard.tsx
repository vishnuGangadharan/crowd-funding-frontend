import React from 'react'
import SidePanel from '../../Components/admin/SidePanel';
import Dashboards from '../../Components/admin/Dashboards';
const Dashboard = () => {
    console.log("here admin");

  return (
    <div className='bg-purple-400 h-screen flex'>
      <SidePanel/>
      <Dashboards/>
    </div>
  )
}

export default Dashboard

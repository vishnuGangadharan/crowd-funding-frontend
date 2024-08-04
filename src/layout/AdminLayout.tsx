import React from 'react'
import SidePanel from '@/Components/admin/SidePanel'
import { Outlet } from 'react-router-dom'

function AdminLayout() {

  return (
    <div className='flex'>
        <SidePanel/>
        <Outlet/>
      
    </div>
  )
}

export default AdminLayout

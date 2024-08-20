import React from 'react'
import SidePanel from '@/Components/admin/SidePanel'
import { Outlet } from 'react-router-dom'

function AdminLayout() {

  return (
    <div className="flex min-h-screen">
    {/* SidePanel will be fixed on the left side */}
    <SidePanel  />
    {/* The main content area will take the remaining space and allow scrolling */}
    <div className="ml-56 w-full">
      <Outlet />
    </div>
  </div>
  )
}

export default AdminLayout

import SidePanel from '@/Components/admin/SidePanel'
import { Outlet } from 'react-router-dom'

function AdminLayout() {

  return (
    <div className="flex min-h-screen">
    <SidePanel  />
    <div className="ml-56 w-full">
      <Outlet />
    </div>
  </div>
  )
}

export default AdminLayout

import React from 'react'
import { Route , Routes } from 'react-router-dom'
import { lazy,Suspense } from 'react'


const Dashboard = lazy(()=> import ('../pages/admin/Dashboard'))

const AdminRoutes = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
    </Suspense>
  )
}

export default AdminRoutes

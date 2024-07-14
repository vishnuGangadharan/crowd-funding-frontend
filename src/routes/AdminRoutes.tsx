import React from 'react'
import { Route , Routes } from 'react-router-dom'
import { lazy,Suspense } from 'react'


const Users = lazy(()=> import ('../pages/admin/Dashboard'))

const AdminRoutes = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path='/users' element={<Users/>}/>
        </Routes>
    </Suspense>
  )
}

export default AdminRoutes

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Users = lazy(() => import('../Components/admin/Users'));
const AdminProtected = lazy(() => import('../protectedRoutes/Admin'));
const CampaignRequest= lazy(()=> import ('../pages/admin/CampaignRequest'))
const AdminLayout = lazy(()=> import ( "../layout/AdminLayout"))
const ReportedPosts = lazy(()=> import ('../pages/admin/ReportedPosts'))
const PostDetails = lazy(()=> import ('../pages/admin/PostDetails'))
const FundRequest = lazy(() => import ('../pages/admin/FundRequest'))
const Dashboard = lazy(()=> import ('../pages/admin/Dashboard'))

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<AdminLayout/> }>
        <Route element={<AdminProtected />}>
          <Route path="/users" element={<Users />} />
          <Route path="/request" element={<CampaignRequest />} />
          <Route path='/reports' element={<ReportedPosts/>}/>
          <Route path='/postDetails/:id' element={<PostDetails/>} />
          <Route path='/fundRequest' element={<FundRequest/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AdminRoutes;

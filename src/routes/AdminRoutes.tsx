import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AdminLayout from "../layout/AdminLayout";
import AdminProtected from '../protectedRoutes/Admin';
import AdminSpinner from "@/Components/admin/AdminSpinner";

const Users = lazy(() => import('../Components/admin/Users'));
const CampaignRequest = lazy(() => import('../pages/admin/CampaignRequest'));
const ReportedPosts = lazy(() => import('../pages/admin/ReportedPosts'));
const PostDetails = lazy(() => import('../pages/admin/PostDetails'));
const FundRequest = lazy(() => import('../pages/admin/FundRequest'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminProtected />}>
        {/* AdminLayout remains outside of Suspense */}
        <Route element={<AdminLayout />}>
          {/* Only child components are lazy-loaded */}
          <Route path="/users" element={<Suspense fallback={<AdminSpinner />}><Users /></Suspense>} />
          <Route path="/request" element={<Suspense fallback={<AdminSpinner />}><CampaignRequest /></Suspense>} />
          <Route path="/reports" element={<Suspense fallback={<AdminSpinner />}><ReportedPosts /></Suspense>} />
          <Route path="/postDetails/:id" element={<Suspense fallback={<AdminSpinner />}><PostDetails /></Suspense>} />
          <Route path="/fundRequest" element={<Suspense fallback={<AdminSpinner />}><FundRequest /></Suspense>} />
          <Route path="/dashboard" element={<Suspense fallback={<AdminSpinner />}><Dashboard /></Suspense>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

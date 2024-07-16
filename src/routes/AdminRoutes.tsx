import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Users = lazy(() => import('../pages/admin/Dashboard'));
const AdminProtected = lazy(() => import('../protectedRoutes/Admin'));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<AdminProtected />}>
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AdminRoutes;

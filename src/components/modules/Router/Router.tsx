import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';

import { Layout } from '../Layout/Layout';

import { ProtectedRoute } from './components/RotectedRoute';
import { AdminPanel, Auth, Journal, ProfileSettings } from './constants.module';
import { Skeleton } from '@/components/ui/Skeleton';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';

export const Router = () => {
  const isAuth = !!document.cookie.match('session_key=');
  const userRole = useSelector(getUserRole);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to={isAuth ? '/journal' : '/auth'} replace />} />

        <Route path='*' element={<Navigate to='/' replace />} />

        <Route
          path="/auth"
          element={
            <Suspense fallback={<Skeleton />}>
              <Auth />
            </Suspense>
          }
        />

        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Skeleton />}>
                <Journal />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Skeleton />}>
                <ProfileSettings />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Skeleton />}>
                {userRole === 2 ? <AdminPanel /> : <Navigate to="/journal" />}
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
};

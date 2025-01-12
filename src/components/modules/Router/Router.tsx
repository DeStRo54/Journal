import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';

import { ChooseMedia } from '../../../utils/helpers/ChooseMedia';
import { Layout } from '../Layout/Layout';

import { ProtectedRoute } from './components/RotectedRoute';
import { AdminPanel, Auth, JournalDesktop, JournalMobile, ProfileSettings } from './constants.module';
import { Skeleton } from '@/components/ui/Skeleton';
import { AdminRole } from '@/utils/constants/userRoles';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';

export const Router = () => {
  const isAuth = !!document.cookie.match('session_key=');
  const userRole = useSelector(getUserRole);
  const screenType = ChooseMedia;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to={isAuth ? screenType : '/auth'} replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route
          path="/auth"
          element={
            <Suspense fallback={<Skeleton />}>
              <Auth />
            </Suspense>
          }
        />

        <Route
          path="/journal-mobile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Skeleton />}>
                {screenType === '/journal-mobile' ? <JournalMobile /> : <Navigate to={screenType} />}
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="/journal-desktop"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Skeleton />}>
                {screenType === '/journal-desktop' ? <JournalDesktop /> : <Navigate to={screenType} />}
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
                {userRole === AdminRole ? <AdminPanel /> : <Navigate to="/journal" />}
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
};

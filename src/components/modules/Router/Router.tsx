import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';

import { ChooseMedia } from '../../../utils/helpers/ChooseMedia';
import { Layout } from '../Layout/Layout';

import { AdminPanel, Auth, JournalDesktop, JournalMobile, ProfileSettings } from './constants.module';
import { Loader } from '@/components/ui/Loader';
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
            <Suspense fallback={<Loader />}>
              <Auth />
            </Suspense>
          }
        />
        {isAuth && (
          <>
            <Route
              path="/journal-mobile"
              element={
                <Suspense fallback={<Loader />}>
                  {screenType === '/journal-mobile' ? <JournalMobile /> : <Navigate to={screenType} />}
                </Suspense>
              }
            />

            <Route
              path="/journal-desktop"
              element={
                <Suspense fallback={<Loader />}>
                  {screenType === '/journal-desktop' ? <JournalDesktop /> : <Navigate to={screenType} />}
                </Suspense>
              }
            />

            <Route
              path="/profile"
              element={
                <Suspense fallback={<Loader />}>
                  <ProfileSettings />
                </Suspense>
              }
            />

            <Route
              path="/admin"
              element={
                <Suspense fallback={<Loader />}>
                  {userRole === AdminRole ? <AdminPanel /> : <Navigate to={screenType} />}
                </Suspense>
              }
            />
          </>
        )}
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
};

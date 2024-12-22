import { useSelector } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';

import { Layout } from '../Layout/Layout';

import { ProtectedRoute } from './components/RotectedRoute';
import { AdminPanel } from '@/components/Pages/AdminPanel/AdminPanel';
import { Auth } from '@/components/Pages/Auth/Auth';
import { Journal } from '@/components/Pages/Journal/Journal';
import { getUserRole } from '@/utils/redux/storeSlices/userSlice/selectors';


export const Router = () => {
  const userRole = useSelector(getUserRole);
  const showAdminComponent = userRole === 'admin';
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Auth />} />
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <Journal />
            </ProtectedRoute>
          }
        />
        <Route path="/journal/moderator" element={showAdminComponent ? <AdminPanel /> : <Navigate to="/journal" />} />
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>
};

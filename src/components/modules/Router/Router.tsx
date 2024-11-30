import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { Layout } from '../Layout/Layout';

import { ProtectedRoute } from './components/RotectedRoute';
import { Auth } from '@/components/Pages/Auth/Auth';
import { Journal } from '@/components/Pages/Journal/Journal';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />}>
			<Route path="/" element={<Auth />} />
			<Route path="/journal" element={
				<ProtectedRoute>
					<Journal />
				</ProtectedRoute>} />
		</Route>
	)
);

export const Router = () => <RouterProvider router={router}></RouterProvider>;

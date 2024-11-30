import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const isAuth = !!document.cookie.match('session_key=');
  const isAuth = true;
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
  return children;
};

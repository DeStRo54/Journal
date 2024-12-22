import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const isAuth = !!document.cookie.match('session_key='); //потом починить
  const isAuth = true;
  if (isAuth) {
    return children;
  }
  return <Navigate to="/" replace />;
};

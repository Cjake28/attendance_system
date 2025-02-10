import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleBasedRedirect() {
  const { isAuthenticated, user } = useAuth();
  const role = user?.role;

  if (!isAuthenticated){
    return <Navigate to="/auth/login" replace />;
  }

    
    if (role === 'admin') {
        return <Navigate to="/admin" replace />;
    } else if (role === 'student') {
        return <Navigate to="/student" replace />;
    }else if (role === 'teacher') {
        return <Navigate to="/teacher" replace />;
    }
  

  return (
      <Outlet /> 
  );
}
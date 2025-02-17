import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedsigninRoute() {
  const { isAuthenticated, user } = useAuth();
  console.log('User sss is already logged in', isAuthenticated);
  
  if(isAuthenticated){
    console.log('User is already logged in');
    return <Navigate to="/" replace />;
  }

  return (
      <Outlet /> 
  );
}
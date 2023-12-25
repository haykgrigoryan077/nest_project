import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authorizationTypes } from '../types';

interface PrivateRouteProps {
  isAuthenticated?: string;
  redirectPath?: string;
  children: any;
}

const PrivateRoute = ({
  isAuthenticated,
  redirectPath = '/login',
  children
}: PrivateRouteProps) => {
  if (isAuthenticated === authorizationTypes.UNAUTHORIZED) {
    toast.error('You are not authorized to view this page');
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default PrivateRoute;

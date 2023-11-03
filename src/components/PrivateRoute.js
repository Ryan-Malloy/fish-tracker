import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = () => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return <Outlet />;
    }

    return <Navigate to="/admin/login" replace />;
}

export default PrivateRoute;

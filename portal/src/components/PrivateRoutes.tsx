import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    let auth = localStorage.getItem('provider');
    return (
        auth ? <Outlet /> : <Navigate to='/login' />
    );
};

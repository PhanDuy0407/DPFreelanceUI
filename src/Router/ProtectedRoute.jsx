import React, { useEffect } from 'react';
import { useAuth } from '../utils/customHook/useAuth';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ Component, isAdmin = false, ...rest }) => {
    const { user, loadingUser, refetchUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !loadingUser && !isAdmin) {
            navigate("/login");
        }

        if (isAdmin) {
            if (!user && !loadingUser) {
                navigate("/admin/login");
            }
            if (user && !user.is_admin) {
                navigate("/admin/login");
            }
        }
    }, [user, loadingUser, navigate]);

    return <Component {...rest} user={user} refetchUser={refetchUser} />;
};

export default ProtectedRoute;
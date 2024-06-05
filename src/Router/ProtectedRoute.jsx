import React, { useEffect } from 'react';
import { useAuth } from '../utils/customHook/useAuth';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ Component, ...rest }) => {
    const { user, loadingUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && !loadingUser) {
            navigate("/login");
        }
    }, [user, loadingUser, navigate]);

    if (loadingUser) {
        return <div>Loading...</div>;
    }

    return <Component {...rest} user={user} />;
};

export default ProtectedRoute;
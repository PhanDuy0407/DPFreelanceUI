import React, { useEffect } from 'react';
import { useAuth } from '../utils/customHook/useAuth';
import { useNavigate } from 'react-router-dom';
import { GoAlert } from "react-icons/go";

const ProtectedRoute = ({ Component, isAdmin = false, onlyApplicant = false, onlyRecruiter = false, ...rest }) => {
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

    if (user && !loadingUser) {
        if (onlyApplicant && !user.applicant) {
            return <div className='bg-red-100 p-2 flex items-center justify-center text-lg'> <GoAlert className='w-8 h-8 mr-4' color='red' /> Bạn cần là người tìm việc để xem được trang này</div>
        }
        else if (onlyRecruiter && !user.recruiter) {
            return <div className='bg-red-100 p-2 flex items-center justify-center text-lg'> <GoAlert className='w-8 h-8 mr-4' color='red' /> Bạn cần là nhà tuyển dụng để xem được trang này</div>
        }
    }

    return <Component {...rest} user={user} refetchUser={refetchUser} />;
};

export default ProtectedRoute;
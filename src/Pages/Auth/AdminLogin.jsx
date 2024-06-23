import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { post } from '../../utils/request'
import { useAuth } from '../../utils/customHook/useAuth';
import { notify } from '../../components/Toast';

const AdminLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();
    const { user, loadingUser, refetchUser } = useAuth()
    const mutation = post()

    useEffect(() => {
        if (user && !loadingUser && user.is_admin) navigate("/admin")
    }, [user, loadingUser])

    const onSubmit = (data) => {
        mutation.mutateAsync({ url: "/auth/admin/login", data }).then(
            (response) => {
                const token = response.data.data.access_token
                localStorage.setItem('access_token', token)
                refetchUser()
                navigate("/admin")
            }
        ).catch((error) => {
            console.log(error)
            notify(error?.response?.data?.detail || "Network Error", true)
        })
    }

    return (
        <div className='rounded-lg bg-white shadow w-1/2 mx-auto mt-16'>
            <div className='p-12'>
                <p className='text-sm text-[#757575] pb-1'>Welcome back! 👋</p>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                    Đăng nhập tài khoản
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label htmlFor='username' className='input-label'>
                            Username
                        </label>
                        <input
                            type='text'
                            className='auth-modal-input'
                            {...register('username', {
                                required: 'Username is required',
                            })}
                            placeholder='Username'
                        />
                        {errors.username && (
                            <p className='text-xs text-red-500 pt-0.5'>
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className='mb-8'>
                        <label htmlFor='password' className='input-label'>
                            Mật khẩu
                        </label>
                        <input
                            type='password'
                            placeholder='password'
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 3,
                                    message: 'Password must be at least 3 characters',
                                },
                            })}
                            className='auth-modal-input'
                        />
                        {errors.password && (
                            <p className='text-xs text-red-500 pt-0.5'>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type='submit'
                        className={`w-full rounded-lg bg-[#312ECB] px-5 py-3 text-center text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase flex items-center justify-center`}
                    >
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
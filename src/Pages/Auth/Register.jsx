import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/customHook/useAuth'
import { post } from '../../utils/request'

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm()
    const navigate = useNavigate()
    const { user, loadingUser, refetchUser } = useAuth()
    const mutation = post()

    useEffect(() => {
        if (user && !loadingUser) navigate("/account")
    }, [user, loadingUser])

    const onSubmit = (data) => {
        const payload = {
            username: data.username,
            password: data.password,
            fname: data.fname,
            lname: data.lname,
            email: data.email,
        }
        mutation.mutateAsync({ url: "/auth/register", data: payload }).then(
            (response) => {
                const token = response.data.data.access_token
                localStorage.setItem('access_token', token)
                refetchUser()
                navigate("/signup/role")
            }
        ).catch((error) => {
            console.log(error)
            alert(error?.response?.data?.detail || "Network Error")
        })
    }

    return (
        <div className='rounded-lg bg-white shadow w-1/2 mx-auto'>
            <div className='p-12'>
                <p className='text-sm text-[#757575] pb-1'>Welcome to DPFreeLance 👋</p>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                    Tạo tài khoản mới
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label htmlFor='username' className='input-label'>
                            Username
                        </label>
                        <input
                            type='text'
                            {...register('username', {
                                required: 'Username is required',
                                minLength: {
                                    value: 3,
                                    message: 'Username must be at least 3 characters',
                                },
                            })}
                            className='auth-modal-input'
                        />
                        {errors.username && (
                            <p className='text-xs text-red-500 pt-0.5'>
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='fname' className='input-label'>
                            Họ
                        </label>
                        <input
                            type='text'
                            {...register('fname', {})}
                            className='auth-modal-input'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='lname' className='input-label'>
                            Tên
                        </label>
                        <input
                            type='text'
                            {...register('lname', {})}
                            className='auth-modal-input'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='email' className='input-label'>
                            Email
                        </label>
                        <input
                            type='text'
                            {...register('email', {
                                required: 'Email is required',
                            })}
                            className='auth-modal-input'
                        />
                        {errors.email && (
                            <p className='text-xs text-red-500 pt-0.5'>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='password' className='input-label'>
                            Mật khẩu
                        </label>
                        <input
                            type='password'
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
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

                    <div className='mb-8'>
                        <label htmlFor='confirm-password' className='input-label'>
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type='password'
                            {...register('confirm_password', {
                                required: 'Confirm password is required',
                                validate: (val) => {
                                    if (watch('password') !== val) {
                                        return 'Passwords do no match'
                                    }
                                },
                            })}
                            className='auth-modal-input'
                        />
                        {errors.confirm_password && (
                            <p className='text-xs text-red-500 pt-0.5'>
                                {errors.confirm_password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type='submit'
                        className={`w-full rounded-lg bg-[#312ECB] px-5 py-3 text-center text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 uppercase flex items-center justify-center`}
                    >
                        Đăng ký
                    </button>
                </form>
                <p className='text-sm w-full text-center mt-6 font-bold text-[#6B7E8B]'>
                    Bạn đã có tài khoản?
                    <span className='text-[#625BF7] cursor-pointer'>
                        {' '}
                        Đăng nhập
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Register
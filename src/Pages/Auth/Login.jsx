import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { post } from '../../utils/request'
import { useAuth } from '../../utils/customHook/useAuth';
import { notify } from '../../components/Toast';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();
    const { user, loadingUser, refetchUser } = useAuth()
    const mutation = post()

    useEffect(() => {
        if (user && !loadingUser) navigate("/applicants/jobs")
    }, [user, loadingUser])

    const onSubmit = (data) => {
        mutation.mutateAsync({ url: "/auth/login", data }).then(
            (response) => {
                const token = response.data.data.access_token
                localStorage.setItem('access_token', token)
                refetchUser()
                navigate("/search")
            }
        ).catch((error) => {
            console.log(error)
            notify(error?.response?.data?.detail || "Lỗi", true)
        })
    }

    return (
        <div className='rounded-lg bg-white shadow w-1/2 mx-auto mt-10'>
            <div className='p-12'>
                <p className='text-sm text-[#757575] pb-1'>Welcome back! 👋</p>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                    Đăng nhập tài khoản
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label htmlFor='username' className='input-label'>
                            Tên đăng nhập
                        </label>
                        <input
                            type='text'
                            className='auth-modal-input'
                            {...register("username", {
                                required: "Vui lòng nhập tên đăng nhập",
                                pattern: {
                                    value: /^[a-zA-Z0-9]{3,15}$/,
                                    message: "Tên đăng nhập phải có từ 3 đến 15 ký tự và chỉ chứa chữ cái và số"
                                }
                            })}
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
                            {...register("password", {
                                required: "Vui lòng nhập mật khẩu"
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
                <p className='text-sm w-full text-center mt-6 font-bold text-[#6B7E8B]'>
                    Bạn không có tài khoản?
                    <span className='text-[#625BF7] cursor-pointer' onClick={() => navigate("/signup")}>
                        {' '}
                        Click vào đây
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login
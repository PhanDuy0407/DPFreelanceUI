import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/customHook/useAuth';
import { post } from '../../utils/request';
import { notify } from '../../components/Toast';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const navigate = useNavigate();
    const { user, loadingUser, refetchUser } = useAuth();
    const mutation = post();

    useEffect(() => {
        if (user && !loadingUser) navigate("/account");
    }, [user, loadingUser]);

    const onSubmit = (data) => {
        const payload = {
            username: data.username,
            password: data.password,
            fname: data.fname,
            lname: data.lname,
            email: data.email,
        };
        mutation.mutateAsync({ url: "/auth/register", data: payload }).then(
            (response) => {
                const token = response.data.data.access_token;
                localStorage.setItem('access_token', token);
                refetchUser();
                navigate("/signup/role");
            }
        ).catch((error) => {
            console.log(error);
            notify(error?.response?.data?.detail || "Lỗi", true);
        });
    };

    return (
        <div className='rounded-lg bg-white shadow w-1/2 mx-auto mt-10'>
            <div className='p-12'>
                <p className='text-sm text-[#757575] pb-1'>Welcome to DPFreeLance 👋</p>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                    Tạo tài khoản mới
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label htmlFor='username' className='input-label'>
                            Tên đăng nhập
                        </label>
                        <input
                            type='text'
                            {...register('username', {
                                required: 'Vui lòng nhập tên đăng nhập',
                                minLength: {
                                    value: 3,
                                    message: 'Tên đăng nhập phải có ít nhất 3 ký tự',
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9]{3,15}$/,
                                    message: 'Tên đăng nhập phải dài 3-15 ký tự và chỉ chứa chữ cái và số',
                                }
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
                            {...register('fname', {
                                required: 'Vui lòng nhập họ',
                            })}
                            className='auth-modal-input'
                        />
                        {errors.fname && (
                            <p className='text-xs text-red-500 pt-0.5'>
                                {errors.fname.message}
                            </p>
                        )}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='lname' className='input-label'>
                            Tên
                        </label>
                        <input
                            type='text'
                            {...register('lname', {
                                required: 'Vui lòng nhập tên',
                            })}
                            className='auth-modal-input'
                        />
                        {errors.lname && (
                            <p className='text-xs text-red-500 pt-0.5'>
                                {errors.lname.message}
                            </p>
                        )}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='email' className='input-label'>
                            Email
                        </label>
                        <input
                            type='text'
                            {...register('email', {
                                required: 'Vui lòng nhập email',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Email không hợp lệ',
                                }
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
                                required: 'Vui lòng nhập mật khẩu',
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
                                    message: 'Mật khẩu phải có ít nhất 7 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
                                }
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
                        <label htmlFor='confirm_password' className='input-label'>
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type='password'
                            {...register('confirm_password', {
                                required: 'Vui lòng xác nhận mật khẩu',
                                validate: (val) => {
                                    if (watch('password') !== val) {
                                        return 'Mật khẩu không khớp';
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
                    <span className='text-[#625BF7] cursor-pointer' onClick={() => navigate("/login")}>
                        {' '}
                        Đăng nhập
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Register;

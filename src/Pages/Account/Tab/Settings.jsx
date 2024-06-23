import React from "react";
import { useForm } from 'react-hook-form';
import { put } from "../../../utils/request";
import { useAuth } from "../../../utils/customHook/useAuth";
import { notify } from "../../../components/Toast";

const Settings = (props) => {
    const { refetchUser } = useAuth()
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const mutate = put()
    const onSubmit = (data) => {
        const payload = {
            old_password: data.currentPassword,
            new_password: data.newPassword,
        }
        mutate.mutateAsync({ url: `/auth/reset_password`, data: payload }).then(
            (response) => {
                const token = response.data.data.access_token
                localStorage.setItem('access_token', token)
                notify("Success")
                refetchUser()
            }
        ).catch((error) => {
            console.log(error)
            notify(error?.response?.data?.detail || "Network Error", true)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label htmlFor='currentPassword' className='input-label'>
                        Mật khẩu hiện tại
                    </label>
                    <input
                        type='password'
                        className='auth-modal-input'
                        {...register('currentPassword', {
                            required: 'Current password is required',
                            minLength: {
                                value: 6,
                                message: 'Current password must be at least 6 characters',
                            },
                        })}
                    />
                    {errors.currentPassword && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.currentPassword.message}
                        </p>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor='newPassword' className='input-label'>
                        Mật khẩu mới
                    </label>
                    <input
                        type='password'
                        {...register('newPassword', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                            validate: (val) => {
                                if (watch('currentPassword') === val) {
                                    return 'Enter another password'
                                }
                            },
                        })}
                        // placeholder='New password'
                        className='auth-modal-input'
                    />
                    {errors.newPassword && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.newPassword.message}
                        </p>
                    )}
                </div>

                <div className='mb-4'>
                    <label htmlFor='confirmPassword' className='input-label'>
                        Xác nhận mật khẩu mới
                    </label>
                    <input
                        type='password'
                        {...register('confirmPassword', {
                            required: 'Confirm password is required',
                            validate: (val) => {
                                if (watch('newPassword') !== val) {
                                    return 'Passwords do no match'
                                }
                            },
                        })}
                        // placeholder='Confirm password'
                        className='auth-modal-input'
                    />
                    {errors.confirmPassword && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <button
                    type='submit'
                    className='rounded-lg bg-[#312ECB] px-4 py-2 text-white'
                >
                    Lưu
                </button>
            </form>
        </div>
    );
}
export default Settings
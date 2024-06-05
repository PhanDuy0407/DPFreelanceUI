import React from "react";
import { useForm } from 'react-hook-form';

const Settings = (props) => {
    const { user } = props
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label htmlFor='currentPassword' className='input-label'>
                        Current Password
                    </label>
                    <input
                        type='password'
                        className='auth-modal-input'
                        placeholder='Current password'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='new_password' className='input-label'>
                        New password
                    </label>
                    <input
                        type='password'
                        {...register('new_password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                        placeholder='New password'
                        className='auth-modal-input'
                    />
                    {errors.password && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className='mb-4'>
                    <label htmlFor='confirm-password' className='input-label'>
                        Confirm password
                    </label>
                    <input
                        type='password'
                        {...register('confirm_password', {
                            required: 'Confirm password is required',
                            validate: (val) => {
                                if (watch('new_password') !== val) {
                                    return 'Passwords do no match'
                                }
                            },
                        })}
                        placeholder='Confirm password'
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
                    className='rounded-lg bg-[#312ECB] px-4 py-2 text-white'
                >
                    Save
                </button>
            </form>
        </div>
    );
}
export default Settings
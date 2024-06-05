import React from "react"
import { useForm } from 'react-hook-form'

const Information = (props) => {
    const { user } = props
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: user?.email || "",
            fname: user?.fname || "",
            lname: user?.lname || "",
        }
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label htmlFor='username' className='input-label'>
                        Username
                    </label>
                    <input
                        type='text'
                        defaultValue={user?.username || ""}
                        className='auth-modal-input'
                        disabled
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
                    <label htmlFor='fname' className='input-label'>
                        First name
                    </label>
                    <input
                        type='text'
                        {...register('fname', {})}
                        className='auth-modal-input'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='lname' className='input-label'>
                        Last name
                    </label>
                    <input
                        type='text'
                        {...register('lname', {})}
                        className='auth-modal-input'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='avatr' className='input-label'>Avatar</label>
                    <input type="file" className="auth-modal-input" />
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
export default Information
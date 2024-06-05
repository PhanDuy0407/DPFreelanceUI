import React from "react";
import { useForm } from "react-hook-form";

const Recruiter = (props) => {
    const { recruiter } = props?.user || {}
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            recruiter_email: recruiter?.recruiter_email || "",
            phone: recruiter?.phone,
        }
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label htmlFor='email' className='input-label'>
                        Recruiter Email
                    </label>
                    <input
                        type='text'
                        {...register('recruiter_email', {
                            required: 'Recruiter email is required',
                        })}
                        className='auth-modal-input'
                    />
                    {errors.recruiter_email && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.recruiter_email.message}
                        </p>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor='phone' className='input-label'>
                        Phone number
                    </label>
                    <input
                        type='text'
                        {...register('phone', {
                            required: 'Phone number is required',
                        })}
                        className='auth-modal-input'
                    />
                    {errors.phone && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.phone.message}
                        </p>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor='freePostAttempts' className='input-label'>
                        Free Post Attempts
                    </label>
                    <input
                        type='text'
                        defaultValue={recruiter?.free_post_attempt || 0}
                        disabled
                        className='auth-modal-input'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='remainingPostAttempts' className='input-label'>
                        Remaining Post Attempts
                    </label>
                    <input
                        type='text'
                        defaultValue={recruiter?.remain_post_attempt || 0}
                        disabled
                        className='auth-modal-input'
                    />
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
export default Recruiter
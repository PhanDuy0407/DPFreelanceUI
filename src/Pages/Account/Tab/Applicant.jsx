import React from "react";
import { useForm, useFieldArray } from 'react-hook-form';
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';

const Applicant = (props) => {
    const { applicant } = props?.user || {}
    const skills = Object.entries(applicant?.skills || { '': '' }).map(([skill, years]) => ({
        skill,
        years
    }));
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            work_time: applicant?.work_time || 0,
            bio: applicant?.bio || "",
            skills: skills,
            phone: applicant?.phone,
            cv_link: applicant?.cv_link,
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'skills',
    });

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label htmlFor='work_time' className='input-label'>
                        Work time
                    </label>
                    <input
                        type='number'
                        {...register('work_time', {
                            required: 'Work time is required',
                            min: {
                                value: 1,
                                message: "Work time must be greater than 0"
                            }
                        })}
                        className='auth-modal-input'
                    />
                    {errors.work_time && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.work_time.message}
                        </p>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor='bio' className='input-label'>
                        Bio
                    </label>
                    <textarea
                        className="auth-modal-input"
                        rows="4"
                        {...register('bio')}
                    />
                </div>
                <div className='mb-4'>
                    <div className="grid grid-cols-12 gap-2 mb-2">
                        <label htmlFor='skills' className='input-label col-span-6'>
                            Skills
                        </label>
                        <label htmlFor='yearsOfExperience' className='input-label col-span-5'>
                            Years of Experience
                        </label>
                    </div>
                    {fields.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-12 gap-2 mb-2 items-center">
                            <input
                                type="text"
                                {...register(`skills.${index}.skill`, {
                                    required: 'Skill is required',
                                })}
                                placeholder="Skills"
                                className="auth-modal-input col-span-6"
                            />
                            <input
                                {...register(`skills.${index}.years`, {
                                    required: 'Years of experience is required',
                                    min: {
                                        value: 1,
                                        message: "Years of experience must be greater than 0"
                                    },
                                })}
                                placeholder="Years of Experience"
                                type="number"
                                className="auth-modal-input col-span-5"
                            />
                            <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white p-2 rounded-full flex items-center justify-center col-span-1">
                                <AiOutlineDelete />
                            </button>
                            {errors.skills?.[index] ? (
                                <>
                                    <p className='text-xs text-red-500 pt-0.5 col-span-6'>
                                        {errors.skills[index]?.skill?.message}
                                    </p>
                                    <p className='text-xs text-red-500 pt-0.5 col-span-5'>
                                        {errors.skills[index]?.years?.message}
                                    </p>
                                </>
                            ) : null}
                        </div>
                    ))}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={() => append({ skill: '', years: '' })}
                            className="bg-green-500 text-white p-3 rounded-full flex items-center justify-center"
                        >
                            <AiOutlinePlus />
                        </button>
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor='phone' className='input-label'>
                        Phone number
                    </label>
                    <input
                        type='text'
                        defaultValue={applicant?.work_time || 0}
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
                    <label htmlFor='cv_link' className='input-label'>
                        CV link
                    </label>
                    <input
                        type='text'
                        {...register('cv_link')}
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
export default Applicant
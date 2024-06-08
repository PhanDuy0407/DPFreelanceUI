import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { get } from '../../utils/request';
import { useAuth } from '../../utils/customHook/useAuth';
import formatDate from '../../utils';
import { post } from '../../utils/request';
import { JobType, JobStatus } from '../../utils/constant';
import { JobStatusDot } from '../../components/StatusDot';

const JobDetail = () => {
    const { id } = useParams();
    const { user, loadingUser } = useAuth()
    const isApplicant = !loadingUser && user?.applicant
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()

    const [job, setJob] = useState({})
    const { isLoading, data } = get("jobDetail", `/jobs/${id}`)
    useEffect(() => {
        if (!isLoading && data) {
            setJob(data.data)
        }
    }, [isLoading, data])

    const mutate = post()
    const onSubmit = (data) => {
        const payload = {
            pricing: data.estimatePrice,
            experience_description: data.exDescription,
            plan_description: data.plan,
        }
        mutate.mutateAsync({ url: `applicants/jobs/${id}/apply`, data: payload }).then(() => {
            alert("Success")
            navigate(`/applicants/jobs`)
        }).catch((error) => {
            console.log(error)
            alert(error?.response?.data?.detail || "Network Error")
        })
    }

    if (!job && !isLoading) {
        return <div>Job not found</div>;
    }
    if (isLoading && !job) {
        return "Loading"
    }

    const posterFullName = (job.poster?.information?.fname && job.poster?.information?.lname)
        ? `${job.poster?.information?.fname} ${job.poster?.information?.lname}`
        : job.poster?.recruiter_email

    return (
        <div className="p-4 mt-4">
            <div className="container mx-auto bg-white p-6">
                <div className="flex flex-col md:flex-row">
                    {/* Main Job Info */}
                    <div className="md:w-3/5 pr-4 mb-6 md:mb-0 pt-4">
                        <h1 className="text-4xl font-bold mb-4">{job.name}</h1>
                        {job.description?.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                        {/* {job.jd_file && (
                            <div className="mb-4">
                                <a href={job.jd_file} className="text-blue hover:underline">Download Job Description</a>
                            </div>
                        )} */}
                    </div>

                    {/* Other Job Info and Poster Info */}
                    <div className="md:w-2/5 round-lg shadow-lg pt-4 h-fit">
                        <div className="px-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Thông tin công việc</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <p className="text-gray-600">Ngân sách:</p>
                                <p>{job.min_price} {job.price_unit} - {job.max_price} {job.price_unit}</p>
                                <p className="text-gray-600">Loại:</p>
                                <p>{JobType[job.type]?.label}</p>
                                <p className="text-gray-600">Trạng thái:</p>
                                <JobStatusDot status={job.status} />
                                <p className="text-gray-600">Ngày tạo:</p>
                                <p>{formatDate(job.created_at)}</p>
                                <p className="text-gray-600">Ngày hết hạn:</p>
                                <p>{formatDate(job.end_date)}</p>
                            </div>
                        </div>

                        <div className="p-4 w-2/3">
                            <h2 className="text-xl font-semibold mb-2">Thông tin người đăng</h2>
                            <div className='grid grid-cols-2 mb-4'>
                                <img
                                    src={job.poster?.information?.avatar}
                                    alt="avatar"
                                    className="w-20 h-20"
                                />
                                <a href={`/recruiters/${job.poster?.id}`} className='text-blue hover:underline'>{posterFullName}</a>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <p className="text-gray-600">Email:</p>
                                <p>{job.poster?.recruiter_email}</p>
                                <p className="text-gray-600">Số điện thoại:</p>
                                <p>{job.poster?.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {isApplicant && (<div className='rounded-lg bg-gray-200 shadow mx-auto p-8 mt-8'>
                    <h3 className='mb-6 text-2xl font-bold'>
                        Báo giá
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-4 w-1/3'>
                            <label htmlFor='estimatePrice' className='input-label'>
                                Đề xuất chi phí
                            </label>
                            <input
                                type='text'
                                className='auth-modal-input'
                                {...register('estimatePrice', {
                                    required: 'Estimate price is required',
                                })}
                                placeholder='100000'
                            />
                            {errors.estimatePrice && (
                                <p className='text-xs text-red-500 pt-0.5'>
                                    {errors.estimatePrice.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg">Bạn có những kinh nghiệm và kỹ năng nào phù hợp với dự án này?</label>
                            <textarea
                                {...register("exDescription")}
                                className="auth-modal-input"
                                rows={6}
                            // placeholder="Welcome to our job application form Please fill out the following fields to the best of your ability Your information will help us match you with the perfect opportunity Thank you for considering joining our team."
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-lg">Bạn dự định thực hiện dự án này như thế nào?</label>
                            <textarea
                                {...register("plan")}
                                className="auth-modal-input"
                                rows={6}
                            // placeholder="Welcome to our job application form Please fill out the following fields to the best of your ability Your information will help us match you with the perfect opportunity Thank you for considering joining our team."
                            />
                        </div>
                        <button
                            type='submit'
                            className='rounded-lg bg-[#312ECB] px-4 py-2 text-white'
                        >
                            Lưu
                        </button>
                    </form>
                </div>)}
            </div>
        </div>
    );
};

export default JobDetail;
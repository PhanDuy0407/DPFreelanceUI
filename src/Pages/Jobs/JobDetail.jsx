import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get } from '../../utils/request';
import { useAuth } from '../../utils/customHook/useAuth';
import { formatDate } from '../../utils';
import { post } from '../../utils/request';
import { JobType, JobStatus } from '../../utils/constant';
import { JobStatusDot } from '../../components/StatusDot';
import { skillOptions } from "../../utils/constant";
import Badge from '../../components/Badge';
import { notify } from '../../components/Toast';

const JobDetail = () => {
    const { id } = useParams();
    const { user, loadingUser } = useAuth()
    const isApplicant = !loadingUser && user?.applicant
    const navigate = useNavigate()
    const [job, setJob] = useState({})
    const { isLoading, data } = get(["jobDetail", id], `/jobs/${id}`)
    useEffect(() => {
        if (!isLoading && data) {
            setJob(data.data)
        }
    }, [isLoading, data])
    const jobSkills = skillOptions.filter((option) => (job.require_skills || []).includes(option.value))

    const mutate = post()
    const handleApply = () => {
        mutate.mutateAsync({ url: `applicants/jobs/${id}/apply` }).then(() => {
            notify("Thành công")
            navigate(`/applicants/jobs`)
        }).catch((error) => {
            console.log(error)
            notify(error?.response?.data?.detail || "Lỗi", true)
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
        <div className="container mx-auto bg-white p-6">
            <div className='flex space-x-4 mb-4'>
                <h1 className="text-4xl font-bold">{job.name}</h1>
                <JobStatusDot status={job.status} />
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-3/5 mb-6 md:mb-0 p-8 relative round-lg shadow-lg">
                    <div class="flex flex-col h-full">
                        <div class="flex-1">
                            <h2 className="text-xl font-semibold mb-2">Mô tả công việc</h2>
                            {job.description?.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                            <div className="space-x-2 mt-4">
                                <strong>Kỹ năng:</strong>
                                {jobSkills.map((skill, index) => (
                                    <Badge key={index}>
                                        {skill.label}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        {isApplicant && <button className='rounded-lg bg-[#312ECB] px-4 py-2 text-white mt-4' onClick={handleApply}>Ứng tuyển</button>}
                    </div>
                </div>

                <div className="w-2/5 round-lg shadow-lg p-8 bg-gray-200 h-fit space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Thông tin chi tiết</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-gray-600">Giá:</p>
                            <p>{job.min_price} {job.price_unit} - {job.max_price} {job.price_unit}</p>
                            <p className="text-gray-600">Loại:</p>
                            <p>{JobType[job.type]?.label}</p>
                            <p className="text-gray-600">Ngày tạo:</p>
                            <p>{formatDate(job.created_at)}</p>
                            <p className="text-gray-600">Ngày hết hạn:</p>
                            <p>{formatDate(job.end_date)}</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Thông tin người đăng</h2>
                        <div className='grid grid-cols-2 gap-4 mb-4'>
                            <img
                                src={job.poster?.information?.avatar}
                                alt="avatar"
                                className="w-20 h-20"
                            />
                            <a href={`/recruiters/${job.poster?.id}`} className='text-blue hover:underline'>{posterFullName}</a>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-gray-600">Tên công ty:</p>
                            <p>{job.poster?.company_name}</p>
                            <p className="text-gray-600">Số điện thoại:</p>
                            <p>{job.poster?.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
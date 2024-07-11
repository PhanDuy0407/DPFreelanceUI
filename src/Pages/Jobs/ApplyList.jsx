import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../components/Badge';
import { skillOptions } from '../../utils/constant';
import { JobApplyStatusDot } from '../../components/StatusDot';
import { put } from '../../utils/request';
import { JobApplyStatus } from '../../utils/constant';
import { notify } from '../../components/Toast';

function ApplyList({ data, refecthChange, jobId, isLoadingApply }) {
    const mutate = put()

    const changeStatus = (status, applicantId) => {
        const payload = { status }
        mutate.mutateAsync({ url: `recruiters/jobs/${jobId}/applies/${applicantId}`, data: payload }).then(() => notify("Thành công")).then(() => refecthChange()).catch((error) => {
            console.log(error)
            notify(error?.response?.data?.detail || "Lỗi", true)
        })
    }
    const navigate = useNavigate()
    const handleClickApply = (applicantId) => {
        navigate(`/applicants/${applicantId}`)
    }

    return (
        <div className="space-y-6">
            {data.map((item, index) => {
                const posterName = `${item.applicant?.information?.fname} ${item.applicant?.information?.lname}`
                const applicantSkills = skillOptions.filter((option) => (item.applicant?.skills || []).includes(option.value))
                return (
                    <div key={index} className='rounded-lg bg-gray-200 shadow mx-auto p-8 mt-8 relative'>
                        <div className="flex items-start space-x-4">
                            <img src={item.applicant?.information?.avatar} alt={posterName} className="w-24 h-24 rounded-full" />
                            <div className="flex flex-col justify-between h-20">
                                <div>
                                    <strong className="text-lg mx-4"> {posterName}</strong>
                                    <span onClick={() => navigate(`/applicants/${item.applicant?.id}`)} className='text-md text-gray-700 hover:text-blue hover:underline cursor-pointer'>
                                        @{item.applicant?.information?.username}
                                    </span>
                                </div>
                                <div className="ml-4 mt-2">{item.applicant?.title}</div>
                                <div className="space-x-2 ml-4 mt-2">
                                    {applicantSkills.map((skill, index) => (
                                        <Badge key={index}>
                                            {skill.label}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='absolute right-8 top-4'>
                            <JobApplyStatusDot status={item.status} />
                        </div>
                        <div className="absolute right-8 bottom-4 space-x-2">
                            <button
                                className="bg-white py-2 px-5 border rounded"
                                onClick={() => changeStatus(JobApplyStatus.DENY.value, item.applicant?.id)}
                            >
                                Từ chối
                            </button>
                            <button
                                className="bg-blue py-2 px-5 text-white rounded"
                                onClick={() => changeStatus(JobApplyStatus.ACCEPTED.value, item.applicant?.id)}
                            >
                                Chấp nhận
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default ApplyList;
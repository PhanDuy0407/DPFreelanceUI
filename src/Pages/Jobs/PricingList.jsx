import React, { useState, useEffect } from 'react';
import Badge from '../../components/Badge';
import { skillOptions } from '../../utils/constant';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import { JobPricingStatusDot } from '../../components/StatusDot';
import { put } from '../../utils/request';
import { JobPricingStatus } from '../../utils/constant';

function PricingList({ data, refecthChange, jobId, isLoadingJobPricing }) {
    const [open, setOpen] = useState(null)
    const mutate = put()
    const toggleDescription = (index) => {
        index !== open ? setOpen(index) : setOpen(null)
    };

    const changeStatus = (status, applicantId) => {
        const payload = { status }
        console.log(payload)
        mutate.mutateAsync({ url: `recruiters/jobs/${jobId}/pricing/${applicantId}/status`, data: payload }).then(() => alert("Success")).then(() => refecthChange()).catch((error) => {
            console.log(error)
            alert(error?.response?.data?.detail || "Network Error")
        })
    }

    if (!data.length && !isLoadingJobPricing) {
        return <div>No pricing found</div>
    }

    return (
        <div className="space-y-6">
            {data.map((item, index) => {
                const posterName = `${item.applicant?.information?.fname} ${item.applicant?.information?.lname}`
                const applicantSkills = skillOptions.filter((option) => Object.keys(item.applicant?.skills || {}).includes(option.value))
                return (
                    <div key={index} className='rounded-lg bg-gray-200 shadow mx-auto p-8 mt-8 relative'>
                        <h1 className='text-lg absolute right-8 top-8'>Đề xuất chi phí: <strong>{item.pricing} đ</strong></h1>
                        <div className="flex items-start space-x-4">
                            <img src={item.applicant?.information?.avatar} alt={posterName} className="w-20 h-20 rounded-full" />
                            <div className="flex flex-col justify-between h-20">
                                <span className="text-lg ml-4"> Người gửi: {posterName}</span>
                                <div className="space-x-2 ml-4 mt-auto">
                                    {applicantSkills.map((skill, index) => (
                                        <Badge key={index}>
                                            {skill.label}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <JobPricingStatusDot status={item.status} />
                        </div>
                        <div className="flex items-center space-x-2 mt-4 text-blue">
                            <span className="hover:underline cursor-pointer" onClick={() => toggleDescription(index)}>Xem chi tiết </span>
                            {open === index ? <FaArrowUp /> : <FaArrowDown />}
                        </div>
                        <CSSTransition
                            in={open === index}
                            timeout={100}
                            classNames="collapse"
                            unmountOnExit
                        >
                            <div className='mt-4'>
                                <div className="mb-4">
                                    <label className="input-label">Bạn có những kinh nghiệm và kỹ năng nào phù hợp với dự án này?</label>
                                    <textarea
                                        className="auth-modal-input"
                                        rows={6}
                                        value={item.experience_description}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-8">
                                    <label className="input-label">Bạn dự định thực hiện dự án này như thế nào?</label>
                                    <textarea
                                        className="auth-modal-input"
                                        rows={6}
                                        value={item.plan_description}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </CSSTransition>
                        <div className="absolute right-8 bottom-2 space-x-2">
                            <button
                                className="bg-white py-2 px-5 border rounded"
                                onClick={() => changeStatus(JobPricingStatus.DENY.value, item.applicant?.id)}
                            >
                                Từ chối
                            </button>
                            <button
                                className="bg-blue py-2 px-5 text-white rounded"
                                onClick={() => changeStatus(JobPricingStatus.ACCEPTED.value, item.applicant?.id)}
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

export default PricingList;
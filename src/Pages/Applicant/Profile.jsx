import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../utils/request';
import { formatDate } from '../../utils'
import { skillOptions } from '../../utils/constant';
import Badge from '../../components/Badge';

const Profile = () => {
    const [applicant, setApplicant] = useState({})
    const [applicantStatistics, setApplicantStatistic] = useState({})
    const { id } = useParams()
    const { data, isLoading } = get(["applicant", id], `applicants/${id}`)
    const { data: statistics, isLoading: loadingStatistics } = get(["applicantStatistic", id], `applicants/${id}/statistics`)

    useEffect(() => {
        if (!isLoading && data) {
            setApplicant(data.data)
        }
    }, [data, isLoading])

    useEffect(() => {
        if (!loadingStatistics && statistics) {
            setApplicantStatistic(statistics.data)
        }
    }, [statistics, loadingStatistics])
    const applicantSkills = skillOptions.filter((option) => (applicant.skills || []).includes(option.value))

    return (
        <div className="container mx-auto bg-white p-6">
            <div className="flex flex-col md:flex-row mx-auto">
                <div className="w-3/5 mb-6 md:mb-0 p-8 relative round-lg shadow-lg space-y-8">
                    <div className="flex items-start space-x-4">
                        <div className='w-64 space-y-4'>
                            <img
                                className="w-full h-64 object-cover border border-gray-200"
                                src={applicant.information?.avatar}
                                alt="Avatar"
                            />
                            <div className="grid grid-cols-2 gap-1 text-sm">
                                <p className="text-gray-600">Thời gian làm việc:</p>
                                <p>{applicant.work_time} giờ / ngày</p>
                                <p className="text-gray-600">Thành phố:</p>
                                <p>{applicant.city}</p>
                                <p className="text-gray-600">Ngày tham gia:</p>
                                <p>{formatDate(applicant.created_at)}</p>
                            </div>
                        </div>
                        <div className="flex-1 flex-col justify-between">
                            <div>
                                <strong className="text-2xl mx-4">{applicant.information?.fname} {applicant.information?.lname}</strong>
                                <span className='text-xl text-gray-700'>
                                    @{applicant.information?.username}
                                </span>
                            </div>
                            <div className="ml-4 text-lg mt-2">{applicant.title}</div>
                            <div className="space-x-2 ml-4 mt-2">
                                {applicantSkills?.map((skill, index) => (
                                    <Badge key={index}>
                                        {skill.label}
                                    </Badge>
                                ))}
                            </div>
                            <div className='ml-4 mt-4'>
                                <h2 className="text-xl font-semibold mb-2">Giới thiệu</h2>
                                {applicant.bio?.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-2/5 space-y-4">
                    <div className='round-lg shadow-lg p-8 bg-gray-200 h-fit space-y-4'>
                        <h2 className="text-xl font-semibold mb-2">Thông tin liên lạc</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-gray-600">Email:</p>
                            <p>{applicant.information?.email}</p>
                            <p className="text-gray-600">Số điện thoại:</p>
                            <p>{applicant.phone}</p>
                        </div>
                    </div>
                    <div className='round-lg shadow-lg p-8 bg-gray-200 h-fit space-y-4'>
                        <h2 className="text-xl font-semibold mb-2">Tóm lược</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-gray-600">Công việc đang thực hiện:</p>
                            <p>{applicantStatistics.job_in_progress}</p>
                            <p className="text-gray-600">Công việc đã hoàn thành:</p>
                            <p>{applicantStatistics.job_done}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;
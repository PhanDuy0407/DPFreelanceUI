import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../utils/request';
import { formatDate } from '../../utils'
import { skillOptions } from '../../utils/constant';
import Badge from '../../components/Badge';

const Profile = () => {
    const [recruiter, setRecruiter] = useState({})
    const [recruiterStatistics, setRecruiterStatistic] = useState({})
    const { id } = useParams()
    const { data, isLoading } = get(["recruiter", id], `recruiters/${id}`)
    const { data: statistics, isLoading: loadingStatistics } = get(["recruiterStatistic", id], `recruiters/${id}/statistics`)

    useEffect(() => {
        if (!isLoading && data) {
            setRecruiter(data.data)
        }
    }, [data, isLoading])

    useEffect(() => {
        if (!loadingStatistics && statistics) {
            setRecruiterStatistic(statistics.data)
        }
    }, [statistics, loadingStatistics])

    return (
        <div className="container mx-auto bg-white p-6">
            <div className="flex flex-col md:flex-row mx-auto">
                <div className="w-3/5 mb-6 md:mb-0 p-8 relative round-lg shadow-lg space-y-8">
                    <div className="flex items-start space-x-4">
                        <div className='w-64 space-y-4'>
                            <img
                                className="w-full h-64 object-cover border border-gray-200"
                                src={recruiter.information?.avatar}
                                alt="Avatar"
                            />
                        </div>
                        <div className="flex-1 flex-col justify-between">
                            <div>
                                <strong className="text-2xl mx-4">{recruiter.information?.fname} {recruiter.information?.lname}</strong>
                                <span className='text-xl text-gray-700'>
                                    @{recruiter.information?.username}
                                </span>
                            </div>
                            <div className="my-4 mx-4 text-sm">
                                <h3 className="text-lg font-semibold mb-1">Tuyển dụng</h3>
                                <p className="text-gray-600">Tin đã đăng: {recruiterStatistics.job_posted}</p>
                                <p className="text-gray-600">Công việc đang thực hiện: {recruiterStatistics.job_in_progress}</p>
                                <p className="text-gray-600">Công việc đã hoàn thành: {recruiterStatistics.job_done}</p>
                            </div>
                            <div className="my-4 mx-4 text-sm">
                                <h3 className="text-lg font-semibold mb-1">Tài khoản</h3>
                                <p className="text-gray-600">Thành phố: {recruiter.city}</p>
                                <p className="text-gray-600">Ngày tham gia: {formatDate(recruiter.created_at)}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-2/5 space-y-4">
                    <div className='round-lg shadow-lg p-8 bg-gray-200 h-full space-y-4'>
                        <h2 className="text-xl font-semibold mb-2">Thông tin liên lạc</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-gray-600">Tên công ty:</p>
                            <p>{recruiter.company_name}</p>
                            <p className="text-gray-600">Email:</p>
                            <p>{recruiter.information?.email}</p>
                            <p className="text-gray-600">Số điện thoại:</p>
                            <p>{recruiter.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;
import React, { useEffect, useState } from 'react';
import { get } from '../../../utils/request';
import { formatDate } from '../../../utils';

const RecruiterInfo = ({ id, isOpen, closeModal }) => {
    const [recruiter, setRecruiter] = useState({})
    const [recruiterStatistics, setRecruiterStatistic] = useState({})
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
            <div className="bg-white p-8 rounded shadow-lg z-10 w-2/3 relative">
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
                        <div className="my-4 mx-4 text-sm">
                            <h3 className="text-lg font-semibold mb-1">Thông tin liên lạc</h3>
                            <p className="text-gray-600">Tên công ty: {recruiter.company_name}</p>
                            <p className="text-gray-600">Email: {recruiter.information?.email}</p>
                            <p className="text-gray-600">Số điện thoại: {recruiter.phone}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default RecruiterInfo;
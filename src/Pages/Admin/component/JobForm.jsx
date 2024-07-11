import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { get, put } from '../../../utils/request'
import { skillOptions } from "../../../utils/constant";
import { JobStatusDot } from "../../../components/StatusDot";
import { JobStatus } from "../../../utils/constant";
import { notify } from "../../../components/Toast";

const JobForm = ({ id, isOpen, closeModal, refecthChange }) => {
    const [categories, setCategories] = useState([]);
    const [job, setJob] = useState({});
    const [selectedOption, setselectedOption] = useState([]);
    const { isLoading, data } = get("categories", "category")
    const { isLoading: isLoadingJob, data: jobResponse } = get(["jobsPosted", id], `/jobs/${id}`)
    const mutateStatus = put()

    const changeStatus = (status) => {
        const payload = { status }
        mutateStatus.mutateAsync({ url: `admin/jobs/${id}/status`, data: payload }).then(
            () => { notify("Thành công"); closeModal() }
        ).then(() => refecthChange()).catch((error) => {
            console.log(error)
            notify(error?.response?.data?.detail || "Lỗi", true)
        })
    }

    const {
        register,
        reset,
    } = useForm()

    useEffect(() => {
        reset(
            {
                jobTitle: job.name,
                description: job.description,
                category: job.category?.id,
                minPrice: job.min_price,
                maxPrice: job.max_price,
                priceUnit: job.price_unit,
                type: job.type,
                endDate: job.end_date?.split("T")?.[0],
            }
        )
    }, [job, reset, categories])

    useEffect(() => {
        if (!isLoading && data?.data) {
            setCategories(data.data)
        }
    }, [isLoading, data])

    useEffect(() => {
        if (!isLoadingJob && jobResponse?.data) {
            setJob(jobResponse.data)
            setselectedOption(skillOptions.filter(({ value }) => {
                return jobResponse.data.require_skills?.includes(value)
            }))
        }
    }, [isLoadingJob, jobResponse])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
            <div className="bg-white p-8 rounded shadow-lg z-10 w-2/3 relative">
                <div className='absolute right-16'>
                    <JobStatusDot status={job.status} />
                </div>
                <h1 className="text-4xl mb-8">Thông tin công việc</h1>
                <form className="space-y-5">
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label className='input-label'>Bạn đang tìm kiếm?</label>
                            <input
                                type="text"
                                placeholder="Web Developer"
                                {...register("jobTitle")}
                                className="auth-modal-input"
                                disabled
                            />
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <label htmlFor="category" className='input-label'>Lĩnh vực</label>
                            <select
                                {...register("category")}
                                className='auth-modal-input bg-[#EFEFEF4D]'
                                disabled
                            >
                                <option value={null}>Choose category</option>
                                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* second row start */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label htmlFor="minPrice" className='input-label'>Giá nhỏ nhất</label>
                            <input
                                type="text"
                                placeholder="500000"
                                {...register("minPrice")}
                                className="auth-modal-input"
                                disabled
                            />
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <label htmlFor="maxPrice" className='input-label'>Giá lớn nhất</label>
                            <input
                                type="text"
                                placeholder="1000000"
                                {...register("maxPrice")}
                                className="auth-modal-input"
                                disabled
                            />
                        </div>
                    </div>

                    {/* third row start   */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label htmlFor="priceUnit" className='input-label'>Đơn vị tiền tệ</label>
                            <select {...register("priceUnit")} className='auth-modal-input bg-[#EFEFEF4D]' disabled>
                                <option value="đ">VND</option>
                                <option value="$">USD</option>
                            </select>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <label htmlFor="type" className='input-label' disabled>Trả theo?</label>
                            <select {...register("type")} className='auth-modal-input bg-[#EFEFEF4D]' disabled>
                                <option value="PER_HOUR">Theo giờ</option>
                                <option value="PER_PRJ">Theo kíp</option>
                            </select>
                        </div>
                    </div>

                    {/* fourth row start  */}
                    <div className="create-job-flex">
                        <div className="lg:w-1/2 w-full">
                            <label htmlFor="endDate" className='input-label'>Ngày hết hạn</label>
                            <input
                                type="date"
                                placeholder="EX: 2024-02-10"
                                {...register("endDate")}
                                className="auth-modal-input"
                                disabled
                            />
                        </div>
                    </div>

                    {/* fifth row  start */}
                    <div>
                        <label className="input-label">Kỹ năng cần có</label>
                        <CreatableSelect
                            className="pl-0 text-sm text-gray-900"
                            value={selectedOption}
                            onChange={setselectedOption}
                            options={skillOptions}
                            isDisabled
                            isMulti
                        />
                    </div>

                    {/* seventh row start  */}
                    <div className="w-full">
                        <label className="input-label">Mô tả công việc</label>
                        <textarea
                            {...register("description")}
                            className="auth-modal-input"
                            rows={6}
                            disabled
                        />
                    </div>
                    <div className="mt-12 space-x-5">
                        <input
                            type="button"
                            className='text-white font-semibold px-8 py-2 rounded-md bg-blue cursor-pointer'
                            value="Duyệt"
                            onClick={() => changeStatus(JobStatus.OPEN.value)}
                        />
                        <input
                            type="button"
                            className='text-white font-semibold px-8 py-2 rounded-md bg-red-500 cursor-pointer'
                            onClick={() => changeStatus(JobStatus.DENY.value)}
                            value="Từ chối"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
};

export default JobForm;

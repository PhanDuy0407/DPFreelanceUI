import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { get, put } from '../../../utils/request'
import ApplyList from "../ApplyList";
import { skillOptions } from "../../../utils/constant";
import { JobStatusDot } from "../../../components/StatusDot";
import { JobStatus } from "../../../utils/constant";

const RecruiterJobDetail = () => {
    const { id } = useParams()
    const [tab, setTab] = useState("job")
    const [selectedOption, setselectedOption] = useState([]);
    const [categories, setCategories] = useState([]);
    const [job, setJob] = useState({});
    const [jobApplies, setJobApplies] = useState([]);
    const navigate = useNavigate()
    const { isLoading, data } = get("categories", "category")
    const { isLoading: isLoadingJob, data: jobResponse, refetch: refetchJob } = get(["jobsPosted", id], `/jobs/${id}`)
    const { isLoading: isLoadingApply, data: jobApply, refetch: refetchJobApply } = get(["jobApply", id], `recruiters/jobs/${id}/applies`)

    const disableUpdate = job?.status !== JobStatus.WAITING_FOR_APPROVE.value

    const refecthChange = () => {
        refetchJob()
        refetchJobApply()
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
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

    useEffect(() => {
        if (!isLoadingApply && jobApply?.data) {
            setJobApplies(jobApply.data)
        }
    }, [isLoadingApply, jobApply])

    const mutate = put()
    const onSubmit = (data) => {
        const payload = {
            name: data.jobTitle,
            category_id: data.category,
            description: data.description,
            min_price: data.minPrice,
            max_price: data.maxPrice,
            price_unit: data.priceUnit,
            require_skills: selectedOption.map((skill) => skill.value),
            end_date: data.endDate,
            type: data.type,
        }
        mutate.mutateAsync({ url: `/jobs/${id}`, data: payload }).then(
            (response) => {
                alert("Success")
                navigate("/recruiters/jobs")
            }
        ).catch((error) => {
            console.log(error)
            alert(error?.response?.data?.detail || "Network Error")
        })
    };


    return (
        <div className="max-w-screen-2xl container mx-auto my-4">
            <div className="mx-auto xl:px-24 px-4">
                <button
                    onClick={() => setTab('job')}
                    className={`px-4 py-2 ${tab === 'job' ? 'text-blue' : 'text-black'}`}
                >
                    Thông tin tuyển dụng
                </button>
                <button
                    onClick={() => setTab('apply')}
                    className={`px-4 py-2 ${tab === 'apply' ? 'text-blue' : 'text-black'}`}
                >
                    Người ứng tuyển
                </button>
            </div>
            {tab === "job" && (
                <div className="mx-auto xl:px-24 px-4">
                    <div className="border py-4 lg:px-16 relative">
                        <div className='absolute right-16'>
                            <JobStatusDot status={job.status} />
                        </div>
                        <h1 className="text-4xl mb-8">Thông tin công việc</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="create-job-flex">
                                <div className="lg:w-1/2 w-full">
                                    <label className='input-label'>Bạn đang tìm kiếm?</label>
                                    <input
                                        type="text"
                                        placeholder="Web Developer"
                                        {...register("jobTitle")}
                                        className="auth-modal-input"
                                        disabled={disableUpdate}
                                    />
                                </div>

                                <div className="lg:w-1/2 w-full">
                                    <label htmlFor="category" className='input-label'>Lĩnh vực</label>
                                    <select
                                        {...register("category")}
                                        className={`auth-modal-input ${disableUpdate ? 'bg-[#EFEFEF4D]' : null}`}
                                        disabled={disableUpdate}
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
                                        disabled={disableUpdate}
                                    />
                                </div>

                                <div className="lg:w-1/2 w-full">
                                    <label htmlFor="maxPrice" className='input-label'>Giá lớn nhất</label>
                                    <input
                                        type="text"
                                        placeholder="1000000"
                                        {...register("maxPrice")}
                                        className="auth-modal-input"
                                        disabled={disableUpdate}
                                    />
                                </div>
                            </div>

                            {/* third row start   */}
                            <div className="create-job-flex">
                                <div className="lg:w-1/2 w-full">
                                    <label htmlFor="priceUnit" className='input-label'>Đơn vị tiền tệ</label>
                                    <select {...register("priceUnit")} className={`auth-modal-input ${disableUpdate ? 'bg-[#EFEFEF4D]' : null}`} disabled={disableUpdate}>
                                        <option value="đ">VND</option>
                                        <option value="$">USD</option>
                                    </select>
                                </div>

                                <div className="lg:w-1/2 w-full">
                                    <label htmlFor="type" className='input-label' disabled={disableUpdate}>Trả theo?</label>
                                    <select {...register("type")} className={`auth-modal-input ${disableUpdate ? 'bg-[#EFEFEF4D]' : null}`} disabled={disableUpdate}>
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
                                        disabled={disableUpdate}
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
                                    isDisabled={disableUpdate}
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
                                    disabled={disableUpdate}
                                    placeholder="Welcome to our job application form Please fill out the following fields to the best of your ability Your information will help us match you with the perfect opportunity Thank you for considering joining our team."
                                />
                            </div>
                            <input
                                type="submit"
                                className={`block mt-12 text-white font-semibold px-8 py-2 rounded-md ${disableUpdate ? 'bg-gray-500' : "bg-blue cursor-pointer "}`}
                                disabled={disableUpdate}
                                value="Lưu"
                            />
                        </form>
                    </div>
                </div>
            )
            }
            {
                tab === "apply" && (<div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
                    <h1 className="text-4xl mb-8 text-center">Danh sách người ứng tuyển</h1>
                    <ApplyList data={jobApplies} isLoadingApply={isLoadingApply} jobId={id} refecthChange={refecthChange} />
                </div>)
            }
        </div>
    )
};

export default RecruiterJobDetail;

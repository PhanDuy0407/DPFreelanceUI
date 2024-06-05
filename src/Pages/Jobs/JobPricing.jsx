import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { get, post } from '../../utils/request'
import PricingList from "./PricingList";
import { skillOptions } from "../../utils/constant";
import { JobStatusDot } from "../../components/StatusDot";
import { JobStatus } from "../../utils/constant";

const JobPricing = () => {
    const { id } = useParams()
    const [selectedOption, setselectedOption] = useState([]);
    const [categories, setCategories] = useState([]);
    const [job, setJob] = useState({});
    const [jobsPricing, setJobsPricing] = useState([]);
    const navigate = useNavigate()
    const { isLoading, data } = get("categories", "category")
    const { isLoading: isLoadingJob, data: jobResponse, refetch: refetchJob } = get("jobsPosted", `/jobs/${id}`)
    const { isLoading: isLoadingJobPricing, data: jobPricingResponse, refetch: refetchPricing } = get("pricing", `recruiters/jobs/${id}/pricing`)

    const disableUpdate = job?.status ? ![JobStatus.OPEN.value, JobStatus.REOPEN.value].includes(job.status) : false

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const refecthChange = () => {
        refetchJob()
        refetchPricing()
    }

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
                estimateTime: job.estimate_time,
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
        if (!isLoadingJobPricing && jobPricingResponse?.data) {
            setJobsPricing(jobPricingResponse.data)
        }
    }, [isLoadingJobPricing, jobPricingResponse])

    // const mutate = post()
    const onSubmit = (data) => {
        console.log(data)
    };

    return (
        <>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
                {/* form  */}
                <div className="border py-4 lg:px-16 relative">
                    <div className='absolute right-16'>
                        <JobStatusDot status={job.status} />
                    </div>
                    <h1 className="text-4xl mb-8">Job detail</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* first row  start*/}
                        <div className="create-job-flex">
                            <div className="lg:w-1/2 w-full">
                                <label className='input-label'>Job Title</label>
                                <input
                                    type="text"
                                    placeholder="Web Developer"
                                    {...register("jobTitle")}
                                    className="auth-modal-input"
                                    disabled={disableUpdate}
                                />
                            </div>

                            <div className="lg:w-1/2 w-full">
                                <label htmlFor="category" className='input-label'>Category</label>
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
                                <label htmlFor="minPrice" className='input-label'>Minimum Price</label>
                                <input
                                    type="text"
                                    placeholder="500000"
                                    {...register("minPrice")}
                                    className="auth-modal-input"
                                    disabled={disableUpdate}
                                />
                            </div>

                            <div className="lg:w-1/2 w-full">
                                <label htmlFor="maxPrice" className='input-label'>Maximum Price</label>
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
                                <label htmlFor="priceUnit" className='input-label'>Price unit</label>
                                <select {...register("priceUnit")} className={`auth-modal-input ${disableUpdate ? 'bg-[#EFEFEF4D]' : null}`} disabled={disableUpdate}>
                                    <option value="">Choose price unit</option>
                                    <option value="đ">VND</option>
                                    <option value="$">USD</option>
                                </select>
                            </div>

                            <div className="lg:w-1/2 w-full">
                                <label htmlFor="type" className='input-label' disabled={disableUpdate}>Job type</label>
                                <select {...register("type")} className={`auth-modal-input ${disableUpdate ? 'bg-[#EFEFEF4D]' : null}`} disabled={disableUpdate}>
                                    <option value="">Choose job type</option>
                                    <option value="PER_HOUR">Per hour</option>
                                    <option value="PER_PRJ">Per project</option>
                                </select>
                            </div>
                        </div>

                        {/* fourth row start  */}
                        <div className="create-job-flex">
                            <div className="lg:w-1/2 w-full">
                                <label htmlFor="endDate" className='input-label'>Expire date</label>
                                <input
                                    type="date"
                                    placeholder="EX: 2024-02-10"
                                    {...register("endDate")}
                                    className="auth-modal-input"
                                    disabled={disableUpdate}
                                />
                            </div>

                            <div className="lg:w-1/2 w-full">
                                <label htmlFor="estimateTime" className='input-label'>Estimate time</label>
                                <input
                                    type="text"
                                    placeholder="1d"
                                    {...register("estimateTime")}
                                    className="auth-modal-input"
                                    disabled={disableUpdate}
                                />
                            </div>
                        </div>

                        {/* fifth row  start */}
                        <div>
                            <label className="input-label">Required Skills Set</label>
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
                            <label className="input-label">Job Description</label>
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
                        />
                    </form>
                </div>
            </div>
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-8">
                <h1 className="text-4xl mb-8 text-center">Pricing</h1>
                <PricingList data={jobsPricing} isLoadingJobPricing={isLoadingJobPricing} jobId={id} refecthChange={refecthChange} />
            </div>
        </>
    );
};

export default JobPricing;

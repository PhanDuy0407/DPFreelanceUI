import React, { useEffect, useState } from 'react'
import { get } from '../../utils/request';
import Jobs from './Jobs'
import JobCard from '../../components/JobCard'

const ApplicantJobs = () => {
  const [workingJobs, setWorkingJobs] = useState([]);
  const [waitingJobs, setWaitingJobs] = useState([]);
  const [deniedJobs, setDeniedJobs] = useState([]);

  const { isLoading, data } = get("myJob", "/applicants/jobs")
  useEffect(() => {
    if (data?.data) {
      const working = data.data.filter((jobApply) => jobApply.status === "ACCEPTED").map((jobApply, i) => {
        return <JobCard key={i} data={jobApply.job || {}} />
      })
      setWorkingJobs(working)
      const waiting = data.data.filter((jobApply) => jobApply.status === "WAITING_FOR_APPROVE").map((jobApply, i) => {
        return <JobCard key={i} data={jobApply.job || {}} />
      })
      setWaitingJobs(waiting)
      const denied = data.data.filter((jobApply) => jobApply.status === "DENY").map((jobApply, i) => {
        return <JobCard key={i} data={jobApply.job || {}} />
      })
      setDeniedJobs(denied)
    }
  }, [data])

  if (isLoading) return "Loading ..."
  return (
    <div className="col-span-2 bg-white p-4 rounded">
      <h1 className='ml-[20px] text-2xl mb-4'> Working Jobs </h1>
      <Jobs result={workingJobs} />
      <hr className="border-t border-gray-500 border-dashed my-4 mx-[20px]" />
      <h1 className='ml-[20px] text-2xl mb-4'> Waiting Jobs </h1>
      <Jobs result={waitingJobs} />
      <hr className="border-t border-gray-500 border-dashed my-4 mx-[20px]" />
      <h1 className='ml-[20px] text-2xl mb-4'> Denied Jobs </h1>
      <Jobs result={deniedJobs} />
    </div>
  )
}

export default ApplicantJobs
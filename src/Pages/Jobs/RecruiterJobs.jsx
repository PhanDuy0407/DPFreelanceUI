import React, { useEffect, useState } from 'react'
import { get } from '../../utils/request';
import Jobs from './Jobs'
import RecruiterJobCard from '../../components/RecruiterJobCard'
import { JobStatus } from '../../utils/constant';

const RecruiterJobs = () => {
  const [openJobs, setOpenJobs] = useState([])
  const [closedJobs, setClosedJobs] = useState([])
  const [workingJobs, setWorkingJobs] = useState([]);
  const [waitingJobs, setWaitingJobs] = useState([]);
  const [deniedJobs, setDeniedJobs] = useState([]);

  const { isLoading, data } = get("recruiterJob", "/recruiters/jobs")
  useEffect(() => {
    if (data?.data) {
      console.log(data.data)
      const open = data.data.filter((job) => job.status === JobStatus.OPEN.value).map((job, i) => {
        return <RecruiterJobCard key={i} data={job} />
      })
      setOpenJobs(open)
      const closed = data.data.filter((job) => job.status === JobStatus.CLOSED.value).map((job, i) => {
        return <RecruiterJobCard key={i} data={job} />
      })
      setClosedJobs(closed)
      const waiting = data.data.filter((job) => job.status === JobStatus.WAITING_FOR_APPROVE.value).map((job, i) => {
        return <RecruiterJobCard key={i} data={job} />
      })
      setWaitingJobs(waiting)
      const working = data.data.filter((job) => job.status === JobStatus.WORK_IN_PROGRESS.value).map((job, i) => {
        return <RecruiterJobCard key={i} data={job} />
      })
      setWorkingJobs(working)
      const denied = data.data.filter((job) => job.status === JobStatus.DENY.value).map((job, i) => {
        return <RecruiterJobCard key={i} data={job} />
      })
      setDeniedJobs(denied)
    }
  }, [data])

  if (isLoading) return "Loading ..."
  return (
    <div className="col-span-2 bg-white p-4 rounded">
      <h1 className='ml-[20px] text-2xl mb-4'> Open Jobs </h1>
      <Jobs result={openJobs} />
      <hr className="border-t border-gray-500 border-dashed my-4 mx-[20px]" />
      <h1 className='ml-[20px] text-2xl mb-4'> Working Jobs </h1>
      <Jobs result={workingJobs} />
      <hr className="border-t border-gray-500 border-dashed my-4 mx-[20px]" />
      <h1 className='ml-[20px] text-2xl mb-4'> Waiting Jobs </h1>
      <Jobs result={waitingJobs} />
      <hr className="border-t border-gray-500 border-dashed my-4 mx-[20px]" />
      <h1 className='ml-[20px] text-2xl mb-4'> Closed Jobs </h1>
      <Jobs result={closedJobs} />
      <hr className="border-t border-gray-500 border-dashed my-4 mx-[20px]" />
      <h1 className='ml-[20px] text-2xl mb-4'> Denied Jobs </h1>
      <Jobs result={deniedJobs} />
    </div>
  )
}

export default RecruiterJobs
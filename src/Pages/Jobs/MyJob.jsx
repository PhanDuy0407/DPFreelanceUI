import React, { useEffect, useState } from 'react'
import { get } from '../../utils/request';
import Jobs from './Jobs'
import JobCard from '../../components/JobCard'

const MyJob = () => {

  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const { isLoading, data } = get("myJob", "/applicants/my-jobs")
  useEffect(() => {
    if (data?.data) {
      const jobsApply = data.data.map((jobApply, i) => {
        return <JobCard key={i} data={jobApply.job || {}} />
      })
      setJobs(jobsApply)
    }
  }, [data])

  console.log(jobs)

  return (
    <div className="col-span-2 bg-white p-4 rounded">
      {isLoading ? ( // Loading indicator
        <p className="font-medium">Loading...</p>
      ) : jobs.length > 0 ? (
        <Jobs result={jobs} />
      ) : (
        <>
          <h3 className="text-lg font-bold mb-2">{jobs.length} Jobs</h3>
          <p>No data found</p>
        </>
      )}
      {/* pagination block here */}

      {jobs.length > 0 ? (
        <div className="flex justify-center mt-4 space-x-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="hover:underline"
          >
            Previous
          </button>
          <span className="mx-2">
            Page {currentPage} of{" "}
            {Math.ceil(jobs.length / itemsPerPage)}
          </span>
          <button
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(jobs.length / itemsPerPage)
            }
            className="hover:underline"
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default MyJob
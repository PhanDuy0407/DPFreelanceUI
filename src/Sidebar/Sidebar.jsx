import React from 'react'
import Category from './Category'
import JobType from './JobType'
import JobPostingData from './JobPostingData'
import WorkExperience from './WorkExperience'
import EmploymentType from './EmploymentType'

const Sidebar = ({ handleChange, handleClick }) => {
  return (
    <div className='space-y-5'>
      <h3 className='text-lg font-bold mb-2'>Bộ lọc</h3>
      <Category handleChange={handleChange} />
      <JobType handleChange={handleChange} />
      <JobPostingData handleChange={handleChange} />
    </div>
  )
}

export default Sidebar
import React, { useState } from 'react'
import WIPJobs from './WIPJobs';
import PostedJobs from './PostedJobs';
import DoneJobs from './DoneJobs';

const RecruiterJobs = () => {
  const [activeTab, setActiveTab] = useState('posted');

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => setActiveTab('posted')}
        className={`px-4 py-2 ${activeTab === 'posted' ? 'text-blue' : 'text-black'}`}
      >
        Tin đã đăng
      </button>
      <button
        onClick={() => setActiveTab('wip')}
        className={`px-4 py-2 ${activeTab === 'wip' ? 'text-blue' : 'text-black'}`}
      >
        Công việc đang thực hiện
      </button>
      <button
        onClick={() => setActiveTab('done')}
        className={`px-4 py-2 ${activeTab === 'done' ? 'text-blue' : 'text-black'}`}
      >
        Công việc đã hoàn thành
      </button>

      {activeTab === "posted" && <PostedJobs />}
      {activeTab === "wip" && <WIPJobs />}
      {activeTab === "done" && <DoneJobs />}
    </div>
  )
}

export default RecruiterJobs
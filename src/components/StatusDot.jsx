import React from 'react';
import { JobStatus, JobApplyStatus } from '../utils/constant';

export const JobStatusDot = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case JobStatus.DONE.value:
        return 'bg-[#33cc33]';
      case JobStatus.CLOSED.value:
      case JobStatus.DENY.value:
        return 'bg-[#ff0000]';
      case JobStatus.OPEN.value:
        return 'bg-blue'
      default:
        return 'bg-[#ff9900]';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></span>
      <span className="text-md font-medium">{JobStatus[status]?.label}</span>
    </div>
  );
};

export const JobApplyStatusDot = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case JobApplyStatus.ACCEPTED.value:
        return 'bg-blue';
      case JobApplyStatus.REVOKE.value:
      case JobApplyStatus.DENY.value:
        return 'bg-[#ff0000]';
      case JobApplyStatus.DONE.value:
        return 'bg-[#33cc33]';
      default:
        return 'bg-[#ff9900]';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></span>
      <span className="text-md font-medium">{JobApplyStatus[status]?.label}</span>
    </div>
  );
};
import React from 'react';
import { JobStatus, JobPricingStatus } from '../utils/constant';

export const JobStatusDot = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case JobStatus.OPEN.value:
        return 'bg-[#33cc33]';
      case JobStatus.CLOSED.value:
      case JobStatus.DENY.value:
        return 'bg-[#ff0000]';
      case JobStatus.WORK_IN_PROGRESS.value:
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

export const JobPricingStatusDot = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case JobPricingStatus.ACCEPTED.value:
        return 'bg-[#33cc33]';
      case JobPricingStatus.REVOKE.value:
      case JobPricingStatus.DENY.value:
        return 'bg-[#ff0000]';
      case JobPricingStatus.DONE.value:
        return 'bg-blue'
      default:
        return 'bg-[#ff9900]';
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      <span className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></span>
      <span className="text-md font-medium">{JobPricingStatus[status]?.label}</span>
    </div>
  );
};
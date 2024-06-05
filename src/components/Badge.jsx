import React from 'react';

const Badge = ({ children, color = 'bg-[#00ccff]', textColor = 'text-white' }) => {
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium  ${color} ${textColor}`}>
            {children}
        </span>
    );
};

export default Badge;
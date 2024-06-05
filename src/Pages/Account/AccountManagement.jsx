import React, { useState } from 'react';
import Applicant from './Tab/Applicant';
import Infomation from './Tab/Infomation';
import Recruiter from './Tab/Recruiter';
import Settings from './Tab/Settings';

const AccountManagement = (props) => {
    const [activeTab, setActiveTab] = useState('Information');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Information':
                return <Infomation {...props} />;
            case 'Applicant':
                return <Applicant {...props} />;
            case 'Recruiter':
                return <Recruiter {...props} />;
            case 'Settings':
                return <Settings {...props} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex shadow border-b border-gray-200">
            <div className="w-1/4 border-r border-gray-200 bg-gray-50">
                <ul>
                    {['Information', 'Applicant', 'Recruiter', 'Settings'].map((tab) => (
                        <li key={tab}>
                            <button
                                onClick={() => setActiveTab(tab)}
                                className={`w-full text-left px-2 py-4 ${activeTab === tab ? 'bg-[#312ECB] text-white' : 'text-gray-700'}`}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-3/4 p-6">
                <h1 className='text-xl font-bold mb-4'>{activeTab}</h1>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AccountManagement;
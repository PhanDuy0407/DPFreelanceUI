import React, { useState } from 'react';
import Applicant from './Tab/Applicant';
import Infomation from './Tab/Infomation';
import Recruiter from './Tab/Recruiter';
import Settings from './Tab/Settings';

const tabs = {
    information: "Thông tin tài khoản",
    applicant: "Thông tin freelancer",
    recruiter: "Thông tin nhà tuyển dụng",
    settings: "Cài đặt tài khoản"
}

const AccountManagement = (props) => {
    const [activeTab, setActiveTab] = useState('information');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'information':
                return <Infomation {...props} />;
            case 'applicant':
                return <Applicant {...props} />;
            case 'recruiter':
                return <Recruiter {...props} />;
            case 'settings':
                return <Settings {...props} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex shadow border-b border-gray-200">
            <div className="w-1/4 border-r border-gray-200 bg-gray-50">
                <ul>
                    {['information', 'applicant', 'recruiter', 'settings'].map((tab) => (
                        <li key={tab}>
                            <button
                                onClick={() => setActiveTab(tab)}
                                className={`w-full text-left px-2 py-4 ${activeTab === tab ? 'bg-[#312ECB] text-white' : 'text-gray-700'}`}
                            >
                                {tabs[tab]}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-3/4 p-6">
                <h1 className='text-xl font-bold mb-4'>{tabs[activeTab]}</h1>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AccountManagement;
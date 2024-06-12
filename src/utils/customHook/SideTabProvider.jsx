import React, { useState, createContext, useContext, } from 'react';
import { useNavigate } from 'react-router-dom';

const tabs = {
    analytics: "Thống kê",
    accounts: "Quản lý tài khoản",
    jobs: "Quản lý thông tin tuyển dụng",
}

const TabContext = createContext();
export const useTabContext = () => useContext(TabContext);

const SideTabProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState("analytics");
    const navigate = useNavigate()

    const handleChangeTab = (tab) => {
        setActiveTab(tab)
        navigate(`/admin/${tab}`)
    }

    return (
        <div className="flex shadow border-b border-gray-200">
            <div className="w-1/6 border-r border-gray-200 bg-gray-50">
                <ul>
                    {Object.keys(tabs).map((tab) => (
                        <li key={tab}>
                            <button
                                onClick={() => handleChangeTab(tab)}
                                className={`w-full text-left px-2 py-4 ${activeTab === tab ? 'bg-[#312ECB] text-white' : 'text-gray-700'}`}
                            >
                                {tabs[tab]}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-5/6 p-6">
                <h1 className='text-xl font-bold mb-4'>{tabs[activeTab]}</h1>
                <TabContext.Provider value={{ activeTab, setActiveTab }}>
                    {children}
                </TabContext.Provider>
            </div>
        </div>
    );
};

export default SideTabProvider;
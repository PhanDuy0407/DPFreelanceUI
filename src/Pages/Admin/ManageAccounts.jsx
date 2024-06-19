import React, { useEffect, useState } from 'react'
import { useTabContext } from '../../utils/customHook/SideTabProvider';
import Accounts from './Accounts';
import Recruiters from './Recruiters'
import Applicants from './Applicants'

const ManageAccounts = () => {
    const { setActiveTab } = useTabContext()
    const [tab, setTab] = useState('account');

    useEffect(() => {
        setActiveTab("accounts")
    }, [])

    return (
        <>
            <div>
                <button
                    onClick={() => setTab('account')}
                    className={`px-4 py-2 ${tab === 'account' ? 'text-blue' : 'text-black'}`}
                >
                    Tài khoản
                </button>
                <button
                    onClick={() => setTab('recruiter')}
                    className={`px-4 py-2 ${tab === 'recruiter' ? 'text-blue' : 'text-black'}`}
                >
                    Nhà tuyển dụng
                </button>
                <button
                    onClick={() => setTab('applicant')}
                    className={`px-4 py-2 ${tab === 'applicant' ? 'text-blue' : 'text-black'}`}
                >
                    Người tìm việc
                </button>
            </div>
            {tab === "account" && <Accounts />}
            {tab === "recruiter" && <Recruiters />}
            {tab === "applicant" && <Applicants />}
        </>
    )
}

export default ManageAccounts
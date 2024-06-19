import React, { useEffect, useState, useMemo } from 'react'
import { get } from '../../utils/request';
import SimpleTable from '../../components/SimpleTable'
import { formatDate } from '../../utils';
import { useTabContext } from '../../utils/customHook/SideTabProvider';
import ActionAccount from '../../components/action/admin/ActionAccount';
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const { setActiveTab } = useTabContext()

    useEffect(() => {
        setActiveTab("accounts")
    }, [])

    const { isLoading, data, refetch } = get("adminAccounts", "/admin/accounts")
    useEffect(() => {
        if (data?.data) {
            const listAccount = data.data.map((account) => {
                return {
                    ...account,
                }
            })
            setAccounts(listAccount)
        }
    }, [data, isLoading])

    const columns = useMemo(
        () => [
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Họ',
                accessor: 'fname',
            },
            {
                Header: "Tên",
                accessor: "lname",
            },
            {
                Header: "Tìm việc",
                accessor: "applicant",
                Cell: ({ row }) => { return row.original.applicant ? <FaRegCircleCheck className='w-6 h-6 text-green-500' /> : <FaRegCircleXmark className='w-6 h-6 text-red-500' /> },
            },
            {
                Header: "Tuyển dụng",
                accessor: "recruiter",
                Cell: ({ row }) => { return row.original.recruiter ? <FaRegCircleCheck className='w-6 h-6 text-green-500' /> : <FaRegCircleXmark className='w-6 h-6 text-red-500' /> },
            },
            {
                Header: "Kích hoạt",
                accessor: "enable",
                Cell: ({ row }) => { return row.original.enable ? <FaRegCircleCheck className='w-6 h-6 text-green-500' /> : <FaRegCircleXmark className='w-6 h-6 text-red-500' /> },
            },
            {
                Header: "Ngày tạo",
                accessor: "created_at",
                Cell: ({ row }) => formatDate(row.original.created_at)
            },
            {
                Header: "Hành động",
                accessor: "action",
                Cell: ({ row }) => <ActionAccount data={row.original} refecthChange={refetch} />
            },
        ],
        []
    );

    return (
        <SimpleTable columns={columns} data={accounts} loading={isLoading} />
    )
}

export default Accounts
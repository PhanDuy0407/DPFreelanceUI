import React, { useEffect, useState, useMemo } from 'react'
import { get } from '../../utils/request';
import SimpleTable from '../../components/SimpleTable'
import { JobStatusDot } from '../../components/StatusDot';
import { formatDate } from '../../utils';
import { JobType } from '../../utils/constant';
import { useTabContext } from '../../utils/customHook/SideTabProvider';
import ActionJob from '../../components/action/admin/ActionJob';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const { setActiveTab } = useTabContext()

    useEffect(() => {
        setActiveTab("jobs")
    }, [])

    const { isLoading, data, refetch } = get("adminJobs", "/admin/jobs", { order_by: 'created_at:desc,status:asc' })
    useEffect(() => {
        if (data?.data) {
            const listJobs = data.data.map((job) => {
                return {
                    ...job,
                }
            })
            setJobs(listJobs)
        }
    }, [data, isLoading])

    const columns = useMemo(
        () => [
            {
                Header: 'Tên công việc',
                accessor: 'name',
                Cell: ({ row }) => <a className="text-blue hover:underline" href={`/recruiters/jobs/${row.original?.id}`}>{row.values.name}</a>
            },
            {
                Header: 'Loại',
                accessor: 'type',
                Cell: ({ row }) => JobType[row.values.type]?.label
            },
            {
                Header: 'Trạng thái',
                accessor: 'status',
                Cell: ({ row }) => (
                    <JobStatusDot status={row.values.status} />
                ),
            },
            {
                Header: 'Người thuê',
                accessor: 'posterName',
                Cell: ({ row }) => {
                    return (`${row.original.poster?.information?.fname} ${row.original.poster?.information?.lname}`)
                }
            },
            {
                Header: "Người thực hiện",
                accessor: "pic",
                Cell: ({ row }) => {
                    if (row.original.job_applied) {
                        return (row.original.job_applied?.applicant?.information?.fname && row.original.job_applied?.applicant?.information?.lname)
                            ? `${row.original.job_applied?.applicant?.information?.fname} ${row.original.job_applied?.applicant?.information?.lname}`
                            : row.original.job_applied?.applicant?.information?.email
                    }
                    else return null
                }
            },
            {
                Header: "Ngày tạo",
                accessor: "created_at",
                Cell: ({ row }) => formatDate(row.original.created_at)
            },
            {
                Header: "Hành động",
                accessor: "action",
                Cell: ({ row }) => <ActionJob data={row.original} refecthChange={refetch} />
            },
        ],
        []
    );

    return (
        <div className="container mx-auto p-4">
            <SimpleTable columns={columns} data={jobs} loading={isLoading} />
        </div>
    )
}

export default Jobs
import React, { useEffect, useState, useMemo } from 'react'
import { get } from '../../utils/request';
import SimpleTable from '../../components/SimpleTable'
import { JobApplyStatusDot } from '../../components/StatusDot';
import { formatDate, truncate } from '../../utils';
import { JobType } from '../../utils/constant';
import { useTabContext } from '../../utils/customHook/SideTabProvider';

const Applies = () => {
    const [jobs, setJobs] = useState([]);
    const { setActiveTab } = useTabContext()

    useEffect(() => {
        setActiveTab("applies")
    }, [])

    const { isLoading, data, refetch } = get("adminJobs", "/admin/applies")
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
                Cell: ({ row }) => {
                    return (
                        <a className="text-blue hover:underline" href={`/jobs/${row.original.job?.id}`}>
                            {truncate(row.original.job?.name)}
                        </a>
                    )
                }
            },
            {
                Header: 'Loại',
                accessor: 'type',
                Cell: ({ row }) => JobType[row.original.job?.type]?.label
            },
            {
                Header: 'Trạng thái',
                accessor: 'status',
                Cell: ({ row }) => (
                    <JobApplyStatusDot status={row.values.status} />
                ),
            },
            {
                Header: 'Người thuê',
                accessor: 'posterName',
                Cell: ({ row }) => {
                    return (`${row.original.job?.poster?.information?.fname} ${row.original.job?.poster?.information?.lname}`)
                }
            },
            {
                Header: "Người thực hiện",
                accessor: "pic",
                Cell: ({ row }) => {
                    return (row.original.applicant?.information?.fname && row.original.applicant?.information?.lname)
                        ? `${row.original.applicant?.information?.fname} ${row.original.applicant?.information?.lname}`
                        : row.original.applicant?.information?.email
                }
            },
            {
                Header: "Ngày tạo",
                accessor: "created_at",
                Cell: ({ row }) => formatDate(row.original.created_at)
            },
            {
                Header: "Ngày được nhận",
                accessor: "applied_at",
                Cell: ({ row }) => row.values.applied_at ? formatDate(row.values.applied_at) : null
            },
            {
                Header: "Ngày hoàn thành",
                accessor: "done_at",
                Cell: ({ row }) => row.values.done_at ? formatDate(row.values.done_at) : null
            }
        ],
        []
    );

    return (
        <SimpleTable columns={columns} data={jobs} loading={isLoading} />
    )
}

export default Applies
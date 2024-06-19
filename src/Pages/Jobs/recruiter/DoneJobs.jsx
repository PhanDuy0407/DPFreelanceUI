import React, { useEffect, useState, useMemo } from 'react'
import { get } from '../../../utils/request';
import SimpleTable from '../../../components/SimpleTable'
import { JobApplyStatusDot } from '../../../components/StatusDot';
import { formatDate } from '../../../utils';
import { JobType } from '../../../utils/constant';
import { JobApplyStatus } from '../../../utils/constant';

const DoneJobs = () => {
    const [jobs, setJobs] = useState([]);

    const { isLoading, data } = get("recruiterJobs", "/recruiters/jobs", { apply_status: JobApplyStatus.DONE.value })
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
        () => {
            return [
                {
                    Header: 'Tên công việc',
                    accessor: 'name',
                    Cell: ({ row }) => <a className="text-blue hover:underline" href={`/recruiters/jobs/${row.original?.id}`}>{row.values.name}</a>
                },
                {
                    Header: 'Giá',
                    accessor: 'price',
                    Cell: ({ row }) => `${row.original.min_price} - ${row.original.max_price} VND`
                },
                {
                    Header: 'Loại',
                    accessor: 'type',
                    Cell: ({ row }) => JobType[row.values.type]?.label
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
                    Header: 'Trạng thái',
                    accessor: 'status',
                    Cell: ({ row }) => (
                        <JobApplyStatusDot status={row.original.job_applied?.status} />
                    ),
                },
                {
                    Header: "Ngày tạo",
                    accessor: "created_at",
                    Cell: ({ row }) => formatDate(row.original.created_at)
                },
                {
                    Header: "Ngày bắt đầu",
                    accessor: "applied_at",
                    Cell: ({ row }) => formatDate(row.original.job_applied?.applied_at)
                },
                {
                    Header: "Ngày hoàn thành",
                    accessor: "done_at",
                    Cell: ({ row }) => formatDate(row.original.job_applied?.done_at)
                }
            ]
        },
        []
    );

    return <SimpleTable columns={columns} data={jobs} loading={isLoading} />
}

export default DoneJobs
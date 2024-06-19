import React, { useEffect, useState, useMemo } from 'react'
import { get } from '../../../utils/request';
import SimpleTable from '../../../components/SimpleTable'
import { JobStatusDot } from '../../../components/StatusDot';
import { formatDate } from '../../../utils';
import { JobType } from '../../../utils/constant';
import { JobStatus } from '../../../utils/constant';

const PostedJob = () => {
    const [jobs, setJobs] = useState([]);

    const { isLoading, data } = get("recruiterJobs", "/recruiters/jobs")
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
                    Header: 'Số ứng viên',
                    accessor: 'number_of_applied',
                }, {
                    Header: 'Trạng thái',
                    accessor: 'status',
                    Cell: ({ row }) => (
                        <JobStatusDot status={row.values.status} />
                    ),
                }, {
                    Header: "Ngày tạo",
                    accessor: "created_at",
                    Cell: ({ row }) => formatDate(row.original.created_at)
                }
            ]
        },
        []
    );

    return <SimpleTable columns={columns} data={jobs} loading={isLoading} />
}

export default PostedJob
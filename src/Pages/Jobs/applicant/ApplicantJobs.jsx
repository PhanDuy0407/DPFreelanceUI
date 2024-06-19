import React, { useEffect, useState, useMemo } from 'react'
import { get } from '../../../utils/request';
import SimpleTable from '../../../components/SimpleTable'
import { JobApplyStatusDot } from '../../../components/StatusDot';
import { JobApplyStatus } from '../../../utils/constant';
import { formatDate } from '../../../utils';

const ApplicantJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [activeTab, setActiveTab] = useState('quotes');
    const [status, setStatus] = useState([])

    const { isLoading, data, refetch } = get("myJob", "/applicants/jobs", status.length ? { status__eq: status.join(",") } : {})
    useEffect(() => {
        if (data?.data) {
            const listJobs = data.data.map((jobApply) => {
                return {
                    ...jobApply,
                    posterName: `${jobApply.job?.poster?.information?.fname} ${jobApply.job?.poster?.information?.lname}`,
                }
            })
            setJobs(listJobs)
        }
    }, [data, isLoading])

    console.log(status)

    useEffect(() => {
        if (activeTab === 'ongoing') setStatus([JobApplyStatus.ACCEPTED.value])
        else if (activeTab === 'completed') setStatus([JobApplyStatus.DONE.value])
        else setStatus([])
    }, [activeTab])

    useEffect(() => {
        refetch()
    }, [status])

    const columns = useMemo(
        () => {
            const cols = [
                {
                    Header: 'Tên công việc',
                    accessor: 'job.name',
                    Cell: ({ row }) => <a className="text-blue hover:underline" href={`/jobs/${row.original.job.id}`}>{row.original.job.name}</a>
                },
                {
                    Header: 'Mô tả',
                    accessor: 'job.description',
                    Cell: ({ row }) => {
                        return row.values["job.description"].length > 30 ? (<div className="relative group">
                            <span>
                                {`${row.values["job.description"].substring(0, 30)}...`}
                            </span>
                        </div>) : row.values["job.description"]
                    }
                },
                {
                    Header: 'Người thuê',
                    accessor: 'posterName',
                },
                {
                    Header: 'Trạng thái',
                    accessor: 'status',
                    Cell: ({ row }) => (
                        <JobApplyStatusDot status={row.values.status} />
                    ),
                },
                {
                    Header: "Ngày ứng tuyển",
                    accessor: "created_at",
                    Cell: ({ row }) => row.values.created_at ? formatDate(row.values.created_at) : null
                },
            ]
            if (activeTab === 'ongoing' || activeTab === 'completed') {
                cols.push({
                    Header: "Ngày được nhận",
                    accessor: "applied_at",
                    Cell: ({ row }) => row.values.applied_at ? formatDate(row.values.applied_at) : null
                })
            }
            if (activeTab === 'completed') {
                cols.push({
                    Header: "Ngày hoàn thành",
                    accessor: "done_at",
                    Cell: ({ row }) => row.values.done_at ? formatDate(row.values.done_at) : null
                })
            }
            return cols
        },
        [activeTab]
    );



    return (
        <div className="container mx-auto p-4">
            <button
                onClick={() => setActiveTab('quotes')}
                className={`px-4 py-2 ${activeTab === 'quotes' ? 'text-blue' : 'text-black'}`}
            >
                Tin đã ứng tuyển
            </button>
            <button
                onClick={() => setActiveTab('ongoing')}
                className={`px-4 py-2 ${activeTab === 'ongoing' ? 'text-blue' : 'text-black'}`}
            >
                Công việc đang làm
            </button>
            <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 ${activeTab === 'completed' ? 'text-blue' : 'text-black'}`}
            >
                Công việc đã làm
            </button>

            <SimpleTable columns={columns} data={jobs} loading={isLoading} />
        </div>
    )
}

export default ApplicantJobs
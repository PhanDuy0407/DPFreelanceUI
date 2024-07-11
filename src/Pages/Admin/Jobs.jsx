import React, { useEffect, useState, useMemo } from 'react'
import { get } from '../../utils/request';
import SimpleTable from '../../components/SimpleTable'
import { JobStatusDot } from '../../components/StatusDot';
import { formatDate } from '../../utils';
import { JobType, JobStatus } from '../../utils/constant';
import { useTabContext } from '../../utils/customHook/SideTabProvider';
import ActionJob from '../../components/action/admin/ActionJob';
import FilterComponent from '../../components/Filter';
import useModal from '../../utils/customHook/useModal';
import JobForm from './component/JobForm';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const { setActiveTab } = useTabContext()
    const [filters, setFilters] = useState({})
    const [jobId, setJobId] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        if (jobId) {
            openModal()
        } else closeModal()
    }, [jobId])


    const handleApplyFilter = (filters) => {
        let filter = {}
        filters.forEach(element => {
            let operation = "__eq"
            if (element.operation === ">") {
                operation = "__gt"
            } else if (element.operation === "<") {
                operation = "__lt"
            }
            const key = `${element.column}${operation}`
            filter[key] = element.value.value || element.value
        });
        setFilters(filter)
    };

    useEffect(() => {
        setActiveTab("jobs")
    }, [])

    const { isLoading, data, refetch } = get(["adminJobs", filters], "/admin/jobs", { order_by: 'created_at:desc,status:asc', ...filters })
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
                Cell: ({ row }) => <p className="text-blue hover:underline cursor-pointer" onClick={() => setJobId(row.original?.id)}>{row.values.name}</p>
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

    const filterCols = {
        status: { type: "select", name: "Trạng thái", operations: ["="], values: Object.values(JobStatus) },
        name: { type: "text", name: "Tên công việc", operations: ["="] },
        created_at: { type: "date", name: "Ngày tạo", operations: ["=", ">", "<"] },
        type: { type: "select", name: "Loại", operations: ["="], values: Object.values(JobType) },
    }

    return (
        <>
            <FilterComponent columns={filterCols} onApplyFilter={handleApplyFilter} />
            <SimpleTable columns={columns} data={jobs} loading={isLoading} />
            {jobId && <JobForm id={jobId} isOpen={isOpen} closeModal={() => setJobId(null)} refecthChange={refetch} />}
        </>
    )
}

export default Jobs
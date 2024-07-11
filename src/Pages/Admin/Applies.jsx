import React, { useEffect, useState, useMemo } from 'react'
import { get } from '../../utils/request';
import SimpleTable from '../../components/SimpleTable'
import { JobApplyStatusDot } from '../../components/StatusDot';
import { formatDate, truncate } from '../../utils';
import { JobType } from '../../utils/constant';
import { useTabContext } from '../../utils/customHook/SideTabProvider';
import FilterComponent from '../../components/Filter';

const Applies = () => {
    const [jobs, setJobs] = useState([]);
    const { setActiveTab } = useTabContext()
    const [filters, setFilters] = useState({})

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
        setActiveTab("applies")
    }, [])

    const { isLoading, data, refetch } = get(["adminAppliesJob", filters], "/admin/applies", { ...filters })
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

    const filterCols = {
        status: { type: "select", name: "Trạng thái", operations: ["="], values: [{ label: "Đang thực hiện", value: "ACCEPTED" }, { label: "Hoàn thành", value: "DONE" }] },
        name: { type: "text", name: "Tên công việc", operations: ["="] },
        created_at: { type: "date", name: "Ngày tạo", operations: ["=", ">", "<"] },
        applied_at: { type: "date", name: "Ngày được nhận", operations: ["=", ">", "<"] },
        done_at: { type: "date", name: "Ngày hoàn thành", operations: ["=", ">", "<"] },
    }

    return (<>
        <FilterComponent columns={filterCols} onApplyFilter={handleApplyFilter} />
        <SimpleTable columns={columns} data={jobs} loading={isLoading} />
    </>)
}

export default Applies
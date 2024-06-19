import React, { useEffect, useState, useMemo } from 'react'
import { get } from '../../utils/request';
import SimpleTable from '../../components/SimpleTable'
import { JobStatusDot } from '../../components/StatusDot';
import { formatDate } from '../../utils';
import { JobType } from '../../utils/constant';
import { useTabContext } from '../../utils/customHook/SideTabProvider';
import { truncate } from '../../utils';
import ActionRecruiter from '../../components/action/admin/ActionRecruiter';

const Applicants = () => {
    const [applicants, setApplicants] = useState([]);

    const { isLoading, data } = get("adminApplicants", "/admin/applicants")
    useEffect(() => {
        if (data?.data) {
            const listApplicant = data.data.map((applicant) => {
                return {
                    ...applicant,
                }
            })
            setApplicants(listApplicant)
        }
    }, [data, isLoading])

    const columns = useMemo(
        () => [
            {
                Header: 'Username',
                accessor: 'information.username',
            },
            {
                Header: 'Email',
                accessor: 'information.email',
            },
            {
                Header: 'Họ',
                accessor: 'information.fname',
            },
            {
                Header: "Tên",
                accessor: "information.lname",
            },
            {
                Header: "Thành Phó",
                accessor: "city",
            },
            {
                Header: "Địa chỉ",
                accessor: "address",
                Cell: ({ row }) => truncate(row.original.address)
            },
            {
                Header: "Đã ứng tuyển",
                accessor: "statistic.job_apply",
            },
            {
                Header: "Đang được thực hiện",
                accessor: "statistic.job_in_progress",
            },
            {
                Header: "Đã hoàn thành",
                accessor: "statistic.job_done",
            },
            {
                Header: "Ngày tạo",
                accessor: "created_at",
                Cell: ({ row }) => formatDate(row.original.created_at)
            },
        ],
        []
    );

    return (
        <SimpleTable columns={columns} data={applicants} loading={isLoading} />
    )
}

export default Applicants
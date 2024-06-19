import React, { useEffect, useState, useMemo } from 'react'
import { get } from '../../utils/request';
import SimpleTable from '../../components/SimpleTable'
import { JobStatusDot } from '../../components/StatusDot';
import { formatDate } from '../../utils';
import { JobType } from '../../utils/constant';
import { useTabContext } from '../../utils/customHook/SideTabProvider';
import ActionRecruiter from '../../components/action/admin/ActionRecruiter';
import { truncate } from '../../utils';

const Recruiters = () => {
    const [recruiters, setRecruiters] = useState([]);

    const { isLoading, data, refetch } = get("adminRecruiters", "/admin/recruiters")
    useEffect(() => {
        if (data?.data) {
            const listRecruiter = data.data.map((recruiter) => {
                return {
                    ...recruiter,
                }
            })
            setRecruiters(listRecruiter)
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
                Header: 'Tên công ty',
                accessor: 'company_name',
            },
            {
                Header: "Số CCCD",
                accessor: "cccd",
            },
            {
                Header: "Số điện thoại",
                accessor: "phone",
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
                Header: "Số lượt đăng miến phí",
                accessor: "free_post_attempt",
            },
            {
                Header: "Số lượt đăng còn lại",
                accessor: "remain_post_attempt",
            },
            {
                Header: "Tin đã đăng",
                accessor: "statistic.job_posted",
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
            {
                Header: "Hành động",
                accessor: "action",
                Cell: ({ row }) => <ActionRecruiter data={row.original} refecthChange={refetch} />
            },
        ],
        []
    );

    return (
        <SimpleTable columns={columns} data={recruiters} loading={isLoading} />
    )
}

export default Recruiters
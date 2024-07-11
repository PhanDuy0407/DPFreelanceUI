import React, { useEffect, useState, useMemo } from 'react'
import { get } from '../../utils/request';
import SimpleTable from '../../components/SimpleTable'
import { formatDate } from '../../utils';
import { truncate } from '../../utils';
import ApplicantInfo from './component/ApplicantInfo';
import useModal from '../../utils/customHook/useModal';

const Applicants = () => {
    const [applicants, setApplicants] = useState([]);
    const [applicantId, setApplicantId] = useState(null)
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        if (applicantId) {
            openModal()
        } else closeModal()
    }, [applicantId])

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
                Cell: ({ row }) => <p className="text-blue hover:underline cursor-pointer" onClick={() => setApplicantId(row.original.id)}>{row.original.information?.username}</p>
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

    return (<>
        <SimpleTable columns={columns} data={applicants} loading={isLoading} />
        {applicantId && <ApplicantInfo id={applicantId} isOpen={isOpen} closeModal={() => setApplicantId(null)} />}
    </>
    )
}

export default Applicants
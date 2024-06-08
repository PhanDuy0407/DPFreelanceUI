import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { get } from '../../utils/request';
import SimpleTable from '../../components/SimpleTable'
import { JobStatusDot } from '../../components/StatusDot';
import formatDate from '../../utils';
import { JobType } from '../../utils/constant';

const ApplicantJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('quotes');

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
    () => [
      {
        Header: 'Tên công việc',
        accessor: 'name',
        Cell: ({ row }) => <a className="text-blue hover:underline" href={`/recruiters/jobs/${row.original?.id}`}>{row.values.name}</a>
      },
      {
        Header: 'Ngân sách',
        accessor: 'price',
        Cell: ({ row }) => `${row.original.min_price} - ${row.original.max_price} VND`
      },
      {
        Header: 'Loại',
        accessor: 'type',
        Cell: ({ row }) => JobType[row.values.type]?.label
      },
      {
        Header: 'Báo giá',
        accessor: 'number_of_pricing',
      },
      {
        Header: 'Trạng thái',
        accessor: 'status',
        Cell: ({ row }) => (
          <JobStatusDot status={row.values.status} />
        ),
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
        Header: "Chi phí",
        accessor: "pricing",
        Cell: ({ row }) => {
          if (row.original.job_applied) {
            return `${row.original.job_applied.pricing} VND`
          }
          else return null
        }
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
    <div className="container mx-auto p-4">
      <button
        onClick={() => setActiveTab('quotes')}
        className={`px-4 py-2 ${activeTab === 'quotes' ? 'text-blue' : 'text-black'}`}
      >
        Tin đã đăng
      </button>
      <button
        onClick={() => setActiveTab('ongoing')}
        className={`px-4 py-2 ${activeTab === 'ongoing' ? 'text-blue' : 'text-black'}`}
      >
        Công việc đang thực hiện
      </button>
      <button
        onClick={() => setActiveTab('completed')}
        className={`px-4 py-2 ${activeTab === 'completed' ? 'text-blue' : 'text-black'}`}
      >
        Công việc đã được bàn giao
      </button>

      <SimpleTable columns={columns} data={jobs} loading={isLoading} />
    </div>
  )
}

export default ApplicantJobs
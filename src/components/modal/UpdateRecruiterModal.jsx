import React, { useState } from 'react';
import { put } from '../../utils/request';
import { notify } from '../Toast';

const UpdateRecruiterModal = ({ isOpen, closeModal, data, refetch }) => {
    if (!isOpen) return null;
    console.log(data)

    const [postAttempt, setPostAttempt] = useState(data?.remain_post_attempt || 0)

    const mutate = put()
    const onClick = () => {
        mutate.mutateAsync({ url: `/admin/recruiters/${data?.id}/post_attempt`, data: { attempt: postAttempt } }).then(
            () => {
                notify("Success")
                refetch()
                closeModal()
            }
        ).catch((error) => {
            console.log(error)
            notify(error?.response?.data?.detail || "Network Error", true)
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
            <div className="bg-white p-8 rounded shadow-lg z-10 w-1/3 space-y-8">
                <h2 className="text-2xl">Cập nhật thông tin</h2>
                <div>
                    <label className='input-label'>Số lượt đăng tin tuyển dụng</label>
                    <input type="number" className='auth-modal-input' value={postAttempt} onChange={(event) => setPostAttempt(event.target.value)} />
                </div>
                <button onClick={onClick} className="px-4 py-2 bg-blue text-white rounded">
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default UpdateRecruiterModal;
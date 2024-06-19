import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { post } from "../../../utils/request";

const Recruiter = (props) => {
    const { recruiter } = props?.user || {}
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            city: recruiter?.city || "",
            address: recruiter?.address || "",
            phone: recruiter?.phone,
            cccd: recruiter?.cccd,
            company_name: recruiter?.company_name,
        }
    })
    const navigate = useNavigate()

    const mutate = post()
    const onSubmit = (data) => {
        mutate.mutateAsync({ url: "/recruiters/register", data }).then(
            () => props.refetchUser?.()
        ).then(() => alert("Success")).then(() => {
            if (props.navigate) {
                navigate(props.navigate)
            }
        }).catch((error) => {
            console.log(error)
            alert(error?.response?.data?.detail || "Network Error")
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label htmlFor='company_name' className='input-label'>
                        Tên công ty
                    </label>
                    <input
                        type='text'
                        {...register('company_name', {})}
                        className='auth-modal-input'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='city' className='input-label'>
                        Thành phố
                    </label>
                    <input
                        type='text'
                        {...register('city', {})}
                        className='auth-modal-input'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='address' className='input-label'>
                        Địa chỉ
                    </label>
                    <input
                        type='text'
                        {...register('address', {})}
                        className='auth-modal-input'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='phone' className='input-label'>
                        Số điện thoại
                    </label>
                    <input
                        type='text'
                        {...register('phone', {
                            required: 'Phone number is required',
                        })}
                        className='auth-modal-input'
                    />
                    {errors.phone && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.phone.message}
                        </p>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor='phone' className='input-label'>
                        Số căn cước công dân
                    </label>
                    <input
                        type='text'
                        {...register('cccd', {
                            required: 'CCCD is required',
                        })}
                        className='auth-modal-input'
                    />
                    {errors.cccd && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.cccd.message}
                        </p>
                    )}
                </div>
                {!props.navigate && <div className='mb-4'>
                    <label htmlFor='freePostAttempts' className='input-label'>
                        Số lượt đăng tin miễn phí
                    </label>
                    <input
                        type='text'
                        defaultValue={recruiter?.free_post_attempt || 0}
                        disabled
                        className='auth-modal-input'
                    />
                </div>}
                {!props.navigate && <div className='mb-4'>
                    <label htmlFor='remainingPostAttempts' className='input-label'>
                        Số lượt đăng tin trả phí
                    </label>
                    <input
                        type='text'
                        defaultValue={recruiter?.remain_post_attempt || 0}
                        disabled
                        className='auth-modal-input'
                    />
                </div>}
                <button
                    type='submit'
                    className='rounded-lg bg-[#312ECB] px-4 py-2 text-white'
                >
                    Lưu
                </button>
            </form>
        </div>
    );
}
export default Recruiter
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { post } from "../../../utils/request";
import { notify } from "../../../components/Toast";

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
        ).then(() => notify("Thành công")).then(() => {
            if (props.navigate) {
                navigate(props.navigate)
            }
        }).catch((error) => {
            console.log(error)
            notify(error?.response?.data?.detail || "Lỗi mạng", true)
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
                        {...register('company_name', {
                            required: 'Vui lòng nhập tên công ty',
                            minLength: {
                                value: 8,
                                message: 'Tên công ty phải có ít nhất 8 ký tự',
                            },
                        })}
                        className='auth-modal-input'
                    />
                    {errors.company_name && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.company_name.message}
                        </p>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor='city' className='input-label'>
                        Thành phố
                    </label>
                    <input
                        type='text'
                        {...register('city', {
                            required: 'Vui lòng nhập thành phố',
                        })}
                        className='auth-modal-input'
                    />
                    {errors.city && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.city.message}
                        </p>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor='address' className='input-label'>
                        Địa chỉ
                    </label>
                    <input
                        type='text'
                        {...register('address', {
                            required: 'Vui lòng nhập địa chỉ',
                            minLength: {
                                value: 5,
                                message: 'Địa chỉ phải có ít nhất 5 ký tự',
                            },
                        })}
                        className='auth-modal-input'
                    />
                    {errors.address && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.address.message}
                        </p>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor='phone' className='input-label'>
                        Số điện thoại
                    </label>
                    <input
                        type='text'
                        {...register('phone', {
                            required: 'Vui lòng nhập số điện thoại',
                            pattern: {
                                value: /^[0-9]{10,11}$/,
                                message: 'Số điện thoại không hợp lệ',
                            }
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
                    <label htmlFor='cccd' className='input-label'>
                        Số căn cước công dân
                    </label>
                    <input
                        type='text'
                        {...register('cccd', {
                            required: 'Vui lòng nhập số căn cước công dân',
                            pattern: {
                                value: /^[0-9]{9,12}$/,
                                message: 'Số căn cước công dân không hợp lệ',
                            }
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

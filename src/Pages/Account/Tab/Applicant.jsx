import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { post } from "../../../utils/request";
import { skillOptions } from "../../../utils/constant";
import { notify } from "../../../components/Toast";

const Applicant = (props) => {
    const { applicant } = props?.user || {};
    const [selectedOption, setselectedOption] = useState([]);
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            work_time: applicant?.work_time || 0,
            bio: applicant?.bio || "",
            phone: applicant?.phone,
            city: applicant?.city,
            address: applicant?.address,
            cv_link: applicant?.cv_link,
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (applicant) {
            setselectedOption(skillOptions.filter(({ value }) => {
                return applicant?.skills.includes(value);
            }));
        }
    }, [applicant]);

    const mutate = post();
    const onSubmit = (data) => {
        data.skills = selectedOption.map((skill) => skill.value);
        mutate.mutateAsync({ url: "/applicants/register", data }).then(
            () => props.refetchUser?.()
        ).then(() => notify("Thành công")).then(() => {
            if (props.navigate) {
                navigate(props.navigate);
            }
        }).catch((error) => {
            console.log(error);
            notify(error?.response?.data?.detail || "Lỗi mạng", true);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label htmlFor='work_time' className='input-label'>
                        Thời gian làm việc (giờ / 1 ngày)
                    </label>
                    <input
                        type='number'
                        {...register('work_time', {
                            required: 'Vui lòng nhập thời gian làm việc',
                            min: {
                                value: 1,
                                message: "Thời gian làm việc phải lớn hơn 0",
                            }
                        })}
                        className='auth-modal-input'
                    />
                    {errors.work_time && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.work_time.message}
                        </p>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor='bio' className='input-label'>
                        Giới thiệu
                    </label>
                    <textarea
                        className="auth-modal-input"
                        rows="4"
                        {...register('bio', {
                            required: 'Vui lòng nhập giới thiệu bản thân',
                            minLength: {
                                value: 10,
                                message: 'Giới thiệu phải có ít nhất 10 ký tự',
                            }
                        })}
                    />
                    {errors.bio && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.bio.message}
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
                            }
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
                    <label className="input-label">Kỹ năng đã có</label>
                    <CreatableSelect
                        className="pl-0 text-sm text-gray-900"
                        value={selectedOption}
                        onChange={setselectedOption}
                        options={skillOptions}
                        isMulti
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='phone' className='input-label'>
                        Số điện thoại
                    </label>
                    <input
                        type='text'
                        defaultValue={applicant?.phone || ""}
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
                    <label htmlFor='cv_link' className='input-label'>
                        Liên kết CV
                    </label>
                    <input
                        type='text'
                        {...register('cv_link')}
                        className='auth-modal-input'
                    />
                    {errors.cv_link && (
                        <p className='text-xs text-red-500 pt-0.5'>
                            {errors.cv_link.message}
                        </p>
                    )}
                </div>
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

export default Applicant;

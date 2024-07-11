import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { get, post } from '../../utils/request';
import { notify } from '../../components/Toast';

const CreateJob = () => {
  const [selectedOption, setselectedOption] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { isLoading, data } = get("categories", "category");

  useEffect(() => {
    if (!isLoading && data?.data) {
      setCategories(data.data);
    }
  }, [isLoading, data]);

  const mutate = post();
  const onSubmit = (data) => {
    const payload = {
      name: data.jobTitle,
      category_id: data.category,
      description: data.description,
      min_price: data.minPrice,
      max_price: data.maxPrice,
      price_unit: data.priceUnit,
      require_skills: selectedOption.map((skill) => skill.value),
      end_date: data.endDate,
      type: data.type,
    };
    mutate.mutateAsync({ url: "/jobs", data: payload }).then(
      (response) => {
        notify("Thành công");
        navigate(`/recruiters/jobs`);
      }
    ).catch((error) => {
      console.log(error);
      notify(error?.response?.data?.detail || "Lỗi", true);
    });
  };

  const options = [
    { value: "js", label: "JavaScript" },
    { value: "cpp", label: "C++" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "react", label: "React" },
    { value: "node", label: "NodeJS" },
    { value: "mongo", label: "MongoDB" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* form */}
      <div className="border py-4 lg:px-16">
        <h1 className="text-4xl mb-8 text-center">Đăng tin tuyển dụng</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* first row start */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className='input-label'>Bạn đang tìm kiếm?</label>
              <input
                type="text"
                placeholder="Web Developer"
                {...register("jobTitle", { required: "Vui lòng nhập tiêu đề công việc" })}
                className="auth-modal-input"
              />
              {errors.jobTitle && <p className="text-red-500">{errors.jobTitle.message}</p>}
            </div>

            <div className="lg:w-1/2 w-full">
              <label htmlFor="category" className='input-label'>Lĩnh vực</label>
              <select
                {...register("category", { required: "Vui lòng chọn lĩnh vực" })}
                className="auth-modal-input"
              >
                <option value="">Chọn lĩnh vực</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              {errors.category && <p className="text-red-500">{errors.category.message}</p>}
            </div>
          </div>

          {/* second row start */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label htmlFor="minPrice" className='input-label'>Giá nhỏ nhất</label>
              <input
                type="text"
                placeholder="500000"
                {...register("minPrice", { required: "Vui lòng nhập giá nhỏ nhất", pattern: { value: /^[0-9]+$/, message: "Vui lòng nhập số hợp lệ" } })}
                className="auth-modal-input"
              />
              {errors.minPrice && <p className="text-red-500">{errors.minPrice.message}</p>}
            </div>

            <div className="lg:w-1/2 w-full">
              <label htmlFor="maxPrice" className='input-label'>Giá lớn nhất</label>
              <input
                type="text"
                placeholder="1000000"
                {...register("maxPrice", { required: "Vui lòng nhập giá lớn nhất", pattern: { value: /^[0-9]+$/, message: "Vui lòng nhập số hợp lệ" } })}
                className="auth-modal-input"
              />
              {errors.maxPrice && <p className="text-red-500">{errors.maxPrice.message}</p>}
            </div>
          </div>

          {/* third row start */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label htmlFor="priceUnit" className='input-label'>Đơn vị tiền tệ</label>
              <select {...register("priceUnit", { required: "Vui lòng chọn đơn vị tiền tệ" })} className="auth-modal-input">
                <option value="đ">VND</option>
              </select>
              {errors.priceUnit && <p className="text-red-500">{errors.priceUnit.message}</p>}
            </div>

            <div className="lg:w-1/2 w-full">
              <label htmlFor="type" className='input-label'>Trả theo?</label>
              <select {...register("type", { required: "Vui lòng chọn loại trả" })} className="auth-modal-input">
                <option value="PER_HOUR">Theo giờ</option>
                <option value="PER_PRJ">Theo kíp</option>
              </select>
              {errors.type && <p className="text-red-500">{errors.type.message}</p>}
            </div>
          </div>

          {/* fourth row start */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label htmlFor="endDate" className='input-label'>Ngày hết hạn</label>
              <input
                type="date"
                {...register("endDate", { required: "Vui lòng chọn ngày hết hạn" })}
                className="auth-modal-input"
              />
              {errors.endDate && <p className="text-red-500">{errors.endDate.message}</p>}
            </div>
          </div>

          {/* fifth row start */}
          <div>
            <label className="input-label">Kỹ năng cần có</label>
            <CreatableSelect
              className="pl-0 text-sm text-gray-900"
              defaultValue={selectedOption}
              onChange={setselectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* seventh row start */}
          <div className="w-full">
            <label className="input-label">Mô tả công việc</label>
            <textarea
              {...register("description", { required: "Vui lòng nhập mô tả công việc" })}
              className="auth-modal-input"
              rows={6}
              placeholder="Mô tả về công việc bạn đang tìm người."
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <button
            className="bg-blue py-2 px-5 text-white rounded"
            type="submit"
          >
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { get, post } from '../../utils/request'

const CreateJob = () => {
  const [selectedOption, setselectedOption] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()
  const { isLoading, data } = get("categories", "category")

  useEffect(() => {
    if (!isLoading && data?.data) {
      setCategories(data.data)
    }
  }, [isLoading, data])

  const mutate = post()
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
      estimate_time: data.estimateTime,
      type: data.type,
    }
    mutate.mutateAsync({ url: "/jobs", data: payload }).then(
      (response) => {
        const createdJob = response.data.data
        alert("Success")
        navigate(`/recruiters/jobs/${createdJob.id}`)
      }
    ).catch((error) => {
      console.log(error)
      alert(error?.response?.data?.detail || "Network Error")
    })
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
      {/* form  */}
      <div className="border py-4 lg:px-16">
        <h1 className="text-4xl mb-8 text-center">Post a job!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* first row  start*/}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className='input-label'>Job Title</label>
              <input
                type="text"
                placeholder="Web Developer"
                {...register("jobTitle")}
                className="auth-modal-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label htmlFor="category" className='input-label'>Category</label>
              <select
                {...register("category")}
                className="auth-modal-input"
              >
                <option value={null}>Choose category</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
            </div>
          </div>

          {/* second row start */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label htmlFor="minPrice" className='input-label'>Minimum Price</label>
              <input
                type="text"
                placeholder="500000"
                {...register("minPrice")}
                className="auth-modal-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label htmlFor="maxPrice" className='input-label'>Maximum Price</label>
              <input
                type="text"
                placeholder="1000000"
                {...register("maxPrice")}
                className="auth-modal-input"
              />
            </div>
          </div>

          {/* third row start   */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label htmlFor="priceUnit" className='input-label'>Price unit</label>
              <select {...register("priceUnit")} className="auth-modal-input">
                <option value="">Choose price unit</option>
                <option value="đ">VND</option>
                <option value="$">USD</option>
              </select>
            </div>

            <div className="lg:w-1/2 w-full">
              <label htmlFor="type" className='input-label'>Job type</label>
              <select {...register("type")} className="auth-modal-input">
                <option value="">Choose job type</option>
                <option value="PER_HOUR">Per hour</option>
                <option value="PER_PRJ">Per project</option>
              </select>
            </div>
          </div>

          {/* fourth row start  */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label htmlFor="endDate" className='input-label'>Expire date</label>
              <input
                type="date"
                placeholder="EX: 2024-02-10"
                {...register("endDate")}
                className="auth-modal-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label htmlFor="estimateTime" className='input-label'>Estimate time</label>
              <input
                type="text"
                placeholder="1d"
                {...register("estimateTime")}
                className="auth-modal-input"
              />
            </div>
          </div>

          {/* fifth row  start */}
          <div>
            <label className="block mb-2 text-lg">Required Skills Set</label>
            <CreatableSelect
              className="pl-0 text-sm text-gray-900"
              defaultValue={selectedOption}
              onChange={setselectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* seventh row start  */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              {...register("description")}
              className="auth-modal-input"
              rows={6}
              placeholder="Welcome to our job application form Please fill out the following fields to the best of your ability Your information will help us match you with the perfect opportunity Thank you for considering joining our team."
            />
          </div>
          <input
            type="submit"
            className=" block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-md cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;

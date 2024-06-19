import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JobCard from '../components/JobCard';
import { get } from '../utils/request';

const Slideshow = () => {
    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const navigate = useNavigate()

    const slides = [
        {
            url: "https://www.vlance.vn/img/homepage-new/banner-top-goi-dich-vu.jpg",
            title: 'Website cung cấp và hỗ trợ',
            points: [
                "Thông tin tuyển dụng lao động thời vụ (việc làm ngắn hạn và chủ động thời gian).",
                "Hỗ trợ kết nối giữa người lao động với doanh nghiệp."
            ],
            button: <button className='rounded-lg bg-blue px-4 py-2 text-white text-lg' onClick={() => navigate("/search")} >Tìm kiếm việc làm</button>
        },
        {
            url: "https://www.vlance.vn/img/homepage-new/bg_jumbotron_02.jpg",
            title: "Đối với người lao động",
            points: [
                "Công cụ tìm kiếm việc làm thời vụ phù hợp.",
                "Quản lý công việc đã và đang thực hiện"
            ],
            button: <button className='rounded-lg bg-blue px-4 py-2 text-white text-lg' onClick={() => navigate("/search")} >Tìm kiếm việc làm</button>
        },
        {
            url: "https://www.vlance.vn/img/homepage-new/bg_jumbotron_03.jpg",
            title: "Về phía doanh nghiệp và các nhà tuyển dụng",
            points: [
                "Cung cấp tính năng đăng tin và quản lý tin đăng tuyển.",
                "Cung cấp các bản báo cáo về tuyển dụng theo tháng / quý / năm cho doanh nghiệp."
            ],
            button: <button className='rounded-lg bg-green-700 px-4 py-2 text-white text-lg' onClick={() => navigate("/recruiters/post-job")} >Đăng tin tuyển dụng</button>
        }
    ];

    return (
        <Slider {...settings}>
            {slides.map((slide, index) => (
                <div key={index} className="relative h-96 flex items-center justify-center text-white">
                    <div className="p-8 text-white h-full text-center" style={{
                        backgroundImage: `url(${slide.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                        <div className='w-1/2 mx-auto space-y-8'>
                            <h1 className='text-6xl font-semibold'>{slide.title}</h1>
                            <ul className="list-disc text-xl pl-5 space-y-2">
                                {slide.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                            {slide.button}
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

const LandingPage = () => {
    const [jobs, setJobs] = useState([]);

    const { data } = get("listJobHome", "/jobs", { order_by: 'created_at:desc', status__eq: 'OPEN, REOPEN', limit: 5, offset: 0 })
    useEffect(() => {
        if (data) setJobs(data.data || [])
    }, [data])
    return (
        <>
            <Slideshow />
            <div className="container mx-auto mt-8">
                <h2 className="text-3xl mb-4 text-center">Danh sách việc đăng gần đây</h2>
                {jobs.map((job, index) => (
                    <JobCard key={index} data={job} />
                ))}
            </div>
        </>
    );
};

export default LandingPage;
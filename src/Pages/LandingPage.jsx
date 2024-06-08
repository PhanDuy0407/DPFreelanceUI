import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import JobCard from '../components/JobCard';
import { get } from '../utils/request';

const Section = ({ children, className }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div ref={ref} className={`${className} transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            {inView && <Fade>{children}</Fade>}
        </div>
    );
};

const LandingPage = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate()

    const { data } = get("listJobHome", "/jobs", { order_by: 'created_at:desc', status__eq: 'OPEN, REOPEN', limit: 5, offset: 0 })
    useEffect(() => {
        if (data) setJobs(data.data || [])
    }, [data])

    return (
        <div>
            {/* Section 1: Giới thiệu về DPFrelance */}
            <Section className="text-white min-h-screen/3 flex items-center">
                <div className="md:w-full mb-4 md:mb-0 md:order-2 h-[500px]">
                    <img src="/images/logo3.png" alt="DPFreelance" className="inset-0 w-full h-full object-cover rounded" />
                </div>
            </Section>

            {/* Section 2: Định nghĩa về freelance và Lý do sử dụng DP Freelance */}
            <Section className="bg-gray-100 p-8 min-h-screen/3">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center mb-8 min-h-64 space-x-8">
                        <div className="md:w-1/2 mb-4 md:mb-0 relative h-64">
                            <img src="images/anh1.png" alt="Freelance Definition" className="absolute inset-0 w-full h-full object-cover rounded" />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl mb-4">Freelance là gì?</h2>
                            <p>
                                Freelance là hình thức làm việc tự do, cho phép bạn làm việc trên nhiều dự án khác nhau từ nhiều nhà tuyển dụng. Freelancer có thể làm việc từ bất kỳ đâu và thường sử dụng các nền tảng trực tuyến để tìm kiếm công việc, giao tiếp với khách hàng và quản lý dự án. Hình thức làm việc này mang lại sự linh hoạt và cơ hội thu nhập tốt hơn so với công việc cố định truyền thống.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="p-8 min-h-screen/3">
                <div className="flex flex-col md:flex-row-reverse items-center mb-8 min-h-64 space-x-8">
                    <div className="md:w-1/2 mb-4 md:mb-0 relative h-64">
                        <img src="images/anh2.png" alt="Why Choose Us" className="absolute inset-0 w-full h-full object-cover rounded" />
                    </div>
                    <div className="md:w-1/2 px-4">
                        <h2 className="text-3xl mb-4">Tại sao chọn DPFreelance?</h2>
                        <ol className="list-disc">
                            <li>Hệ thống bảo mật thông tin.</li>
                            <li>Kết nối với hàng ngàn freelancer tài năng từ nhiều lĩnh vực khác nhau, đảm bảo bạn luôn tìm được ứng viên phù hợp với nhu cầu.</li>
                            <li>Giao diện thân thiện và dễ sử dụng, giúp bạn dễ dàng đăng tin tuyển dụng, tìm kiếm công việc và quản lý dự án của mình.</li>
                            <li>Hỗ trợ khách hàng tận tình, giải đáp mọi thắc mắc của bạn trong quá trình sử dụng dịch vụ.</li>
                        </ol>
                    </div>
                </div>
            </Section>

            {/* Section 3: Quick pick */}
            <Section className="bg-gray-100 p-8 min-h-screen/3 flex items-center">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl mb-8">Sử dụng website</h2>
                    <div className="flex justify-center space-x-16">
                        <div className="flex flex-col items-center">
                            <img src="images/job.png" alt="Button 1" className="cursor-pointer h-24 w-24" onClick={() => navigate("search")} />
                            <p className="text-xl mt-2">Tìm kiếm việc làm</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src="images/add.png" alt="Button 2" className="cursor-pointer h-24 w-24" onClick={() => navigate("recruiters/jobs")} />
                            <p className="text-xl mt-2">Đăng tin tuyển dụng</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Section 4: Danh sách việc đăng gần đây */}
            <Section className="p-8">
                <div className="container mx-auto">
                    <h2 className="text-3xl mb-4 text-center">Danh sách việc đăng gần đây</h2>
                    {jobs.map((job, index) => (
                        <JobCard key={index} data={job} />
                    ))}
                </div>
            </Section>

            {/* Footer */}
            <footer className="bg-blue-600 text-white p-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 DPFreelance. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
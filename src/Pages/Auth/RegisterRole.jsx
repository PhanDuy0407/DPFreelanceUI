import React, { useState } from 'react';
import Applicant from '../Account/Tab/Applicant';
import Recruiter from '../Account/Tab/Recruiter';

const RegisterRole = (props) => {
    const [selectedRole, setSelectedRole] = useState(null);

    return (
        <div className="flex flex-col items-center justify-center w-2/3 mx-auto mt-8">
            {!selectedRole && (
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl mb-8">Bạn là ?</h2>
                    <div className="flex justify-center space-x-16">
                        <div className="flex flex-col items-center">
                            <img src="../images/document.png" alt="Button 1" className="cursor-pointer h-24 w-24" onClick={() => setSelectedRole("freelancer")} />
                            <p className="text-xl mt-2">Người tìm việc</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src="../images/computer.png" alt="Button 2" className="cursor-pointer h-24 w-24" onClick={() => setSelectedRole("employer")} />
                            <p className="text-xl mt-2">Nhà tuyển dụng</p>
                        </div>
                    </div>
                </div>
            )}

            {selectedRole === 'freelancer' && (<>
                <h2 className="text-3xl mb-8">Đăng ký làm freelancer</h2>
                <div className="container mx-auto w-2/3">
                    <Applicant navigate="/search" {...props} />
                </div></>
            )}

            {selectedRole === 'employer' && (<>
                <h2 className="text-3xl mb-8">Đăng ký làm nhà tuyển dụng</h2>
                <div className="container mx-auto w-2/3">
                    <Recruiter navigate="/recruiters/post-job" {...props} />
                </div></>
            )}
        </div>
    );
}

export default RegisterRole;
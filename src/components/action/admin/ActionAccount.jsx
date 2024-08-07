import React, { useState, useRef, useEffect } from 'react';
import { put } from '../../../utils/request';
import { notify } from '../../Toast';

const ActionAccount = ({ data, refecthChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const mutateStatus = put()

    const changeStatus = (status) => {
        const url = `admin/accounts/${data.id}/${status}`
        mutateStatus.mutateAsync({ url }).then(
            () => notify("Thành công")
        ).then(() => refecthChange()).catch((error) => {
            console.log(error)
            notify(error?.response?.data?.detail || "Lỗi", true)
        })
        setIsOpen(false);
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                >
                    &#x22EE; {/* Vertical Ellipsis */}
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        <button
                            className="text-blue block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                            onClick={() => changeStatus('enable')}
                        >
                            Kích hoạt
                        </button>
                        <button
                            className="text-red-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-1"
                            onClick={() => changeStatus('disable')}
                        >
                            Vô hiệu hóa
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActionAccount;
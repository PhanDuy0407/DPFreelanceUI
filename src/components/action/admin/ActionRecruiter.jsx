import React, { useState, useRef, useEffect } from 'react';
import { put, deleteMutate } from '../../../utils/request';
import useModal from '../../../utils/customHook/useModal';
import UpdateRecruiterModal from '../../modal/UpdateRecruiterModal';

const ActionRecruiter = ({ data, refecthChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const mutateStatus = put()
    const deleteAsync = deleteMutate()
    const { isOpen: isOpenModal, openModal, closeModal } = useModal();

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
                    className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
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
                            onClick={() => {
                                setIsOpen(false)
                                openModal()
                            }}
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            )}
            <UpdateRecruiterModal isOpen={isOpenModal} closeModal={closeModal} data={data} refetch={refecthChange} />
        </div>
    );
};

export default ActionRecruiter;
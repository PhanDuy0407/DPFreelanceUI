import React from 'react';
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = ({ message, error }) => (
    <div className={`${error ? 'bg-red-500' : 'bg-green-500'} text-white p-4 rounded shadow-lg`}>
        {message}
    </div>
);

export const notify = (message, error = false) => {
    toast(<CustomToast message={message} error={error} />, {
        bodyClassName: "toast-body",
        hideProgressBar: true,
        position: "top-right",
        autoClose: 3000,
        closeButton: false,
    });
};

const Toast = () => (
    <ToastContainer
        toastClassName={() => "relative flex min-h-10 p-0 rounded-md justify-between overflow-hidden cursor-pointer"}
        bodyClassName={() => "text-sm font-white font-med block p-0"}
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
);

export default Toast;
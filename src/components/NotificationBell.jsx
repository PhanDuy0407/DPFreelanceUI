import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
    const [webSock, setWebSock] = useState(null)
    const [notifications, setNotifications] = useState([])
    const [unreadNotifications, setUnreadNotifications] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const access_token = localStorage.getItem('access_token')
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    useEffect(() => {
        if (access_token) {
            const socket = new WebSocket(`ws://localhost:8000/ws/notifications?token=${access_token}`);
            socket.onmessage = (event) => {
                const { data } = JSON.parse(event.data);
                setNotifications(data || []);
                setUnreadNotifications(data?.filter((notification) => !notification.is_read) || [])
            };
            // Send message every second
            const interval = setInterval(() => {
                if (socket.readyState === WebSocket.OPEN) {
                    const jsonData = {
                        action: 'get_notifications'
                    };
                    socket.send(JSON.stringify(jsonData));
                }
            }, 1000);
            setWebSock(socket)
            return () => {
                clearInterval(interval);
                socket.close();
                setWebSock(null)
            };
        }
    }, []);

    const readNotification = (notification) => {
        if (webSock?.readyState === WebSocket.OPEN && !notification?.is_read) {
            const jsonData = {
                action: 'read_notification',
                resource: notification.id,
            };
            webSock?.send(JSON.stringify(jsonData));
        }
        setDropdownOpen(false)
    }

    const markAllAsRead = () => {
        if (webSock?.readyState === WebSocket.OPEN) {
            const jsonData = {
                action: 'bulk_read_notifications',
            };
            webSock?.send(JSON.stringify(jsonData));
        }
    }

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <div className="cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FaBell className="text-gray-700 text-2xl" />
                {unreadNotifications.length > 0 && (
                    <div className="absolute -bottom-1 -right-1 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        {unreadNotifications.length}
                    </div>
                )}
            </div>
            {dropdownOpen && (
                <div className="absolute top-10 right-0 mt-2 w-96 bg-white rounded-md shadow-lg z-20">
                    <div className="p-2 border-b border-gray-200 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Notifications</span>
                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            Mark all as read
                        </button>
                    </div>
                    <ul>
                        {notifications.map((notification) => (
                            <li key={notification.id} className='p-4 flex items-center border-b border-gray-200 hover:bg-gray-200'>
                                <div className="rounded-full overflow-hidden mr-2">
                                    <img
                                        src={notification.avatar}
                                        alt="Avatar"
                                        className="w-8 h-8 object-cover"
                                    />
                                </div>
                                <Link
                                    to={notification.nav_link || "/"}
                                    onClick={() => readNotification(notification)}
                                    className='flex-1 px-2 py-1 rounded'
                                >
                                    <span dangerouslySetInnerHTML={{ __html: notification.content }} />
                                </Link>
                                <span className={`w-3 h-3 rounded-full ${notification.is_read ? 'bg-gray-400' : 'bg-blue'}`}></span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
            }
        </div >
    );
};

export default NotificationBell;
import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/customHook/useAuth';


const Navbar = () => {
  const { user, loadingUser, refetchUser } = useAuth()
  const isGuest = !user && !loadingUser
  const isAuthen = user && !loadingUser
  const navigate = useNavigate()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownNavLink, setDropdownNavLink] = useState(null);
  const dropdownRef = useRef(null);
  const navlinkRef = useRef([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDropdownNavLink = (index) => {
    setDropdownNavLink(dropdownNavLink === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (navlinkRef.current[dropdownNavLink] && !navlinkRef.current[dropdownNavLink].contains(event.target)) {
      setDropdownNavLink(null);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, dropdownNavLink]);

  const logout = () => {
    localStorage.removeItem('access_token')
    setDropdownOpen(false);
    refetchUser()
    navigate('/login')
  }

  const navItems = [
    { path: "/", title: "Start a search" },
    {
      title: "Applicant",
      children: [
        { path: "/applicants/jobs", title: "Manage jobs" },
      ]
    },
    {
      title: "Recruiter",
      children: [
        { path: "/recruiters/jobs", title: "Manage jobs" },
        { path: "/recruiters/post-job", title: "Post job" },
      ]
    },
  ];

  return (
    <header className="max-w-full container border-b mb-8">
      <nav className="grid grid-cols-12 items-center py-6 mx-auto xl:px-24 px-4 max-w-screen-2xl">
        <a href="/" className="flex items-center gap-2 text-2xl text-black col-span-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>DPFreelance</span>
        </a>
        {/* nav items  for larger devices */}
        <ul className="hidden md:flex gap-12 col-span-6">
          {navItems.map((navItem, index) => {
            const isActive = navItem.children?.some(child => location.pathname === child.path)
            return (
              <li key={navItem.title} className="relative text-base text-primary">
                {navItem.path ? (
                  <NavLink
                    to={navItem.path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    {navItem.title}
                  </NavLink>
                ) : (
                  <div ref={(el) => (navlinkRef.current[index] = el)}>
                    <button onClick={() => toggleDropdownNavLink(index)} className={isActive ? 'active' : null}>
                      {navItem.title}
                    </button>
                    {dropdownNavLink === index && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                        {navItem.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            onClick={() => setDropdownNavLink(null)}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            {child.title}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
        {/* sign up signout btn */}
        {isGuest && (
          <div className="text-base text-primary font-medium space-x-5 hidden lg:block col-span-2">
            <Link to="/login" className="py-2 px-5 border rounded"> Log in</Link>
            <Link to="/signup" className="bg-blue py-2 px-5 text-white rounded">Sign up</Link>
          </div>
        )}
        {!isGuest && (
          <div ref={dropdownRef} className='relative col-span-2 ml-auto'>
            <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
              <img
                src={user?.avatar}
                alt="avatar"
                className="rounded-full w-10 h-10"
              />
            </button>
            {dropdownOpen && isAuthen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                <a
                  href="/account"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Account
                </a>
                <button
                  onClick={() => logout()}
                  className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar

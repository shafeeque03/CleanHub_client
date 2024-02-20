import React from 'react'
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import { adminLogout } from '../../Redux/slices/AdminSlice';

const AdminNavbar = () => {

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    dispatch(adminLogout())
    navigate("/admin")
  }
  return (
    <>
    <nav className="bg-white border-gray-50 dark:bg-white border">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link to='/' className="flex items-center">
      <h1 class="text-yellow-500 text-3xl flex">CleanHub<p class="text-sm mt-5 ml-1">Admin</p></h1>

          
        </Link>
        <div className="flex gap-4 items-center md:order-2">
          <div className="relative" onClick={toggleDropdown}>
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-900 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
            >
              <span className="sr-only">Open admin menu</span>
              <img
                className="w-8 h-8 rounded-full object-contain"
                src="/userLogo.png"
                alt="user photo"
              />
            </button>
            {/* Dropdown menu */}
            {isDropdownOpen &&
              (
                <div
                  className="absolute z-50 right-0 mt-4 text-base list-none bg-white divide-y divide-gray-500 rounded-lg shadow dark:bg-gray-500 dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      admin
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {/* {admin.email} */}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
               )}
          </div>

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover-bg-gray-100 focus:outline-none focus:ring-2 focus-ring-gray-200 dark:text-gray-400 dark:hover-bg-gray-700 dark:focus-ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-white md:dark-bg-gray-900 dark-border-gray-700">
            <li>
              <Link
                to="/admin/dashboard"
                className={
                  location.pathname === "/admin/dashboard"
                    ? "block py-2 pl-3 pr-4 text-green bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 md:dark-text-green-500"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-green-700 md:p-0 dark-text-green md:dark-hover-text-green-500 dark-hover-bg-gray-700 dark-hover-text-green md:dark-hover-bg-transparent dark-border-gray-700"
                }
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/owner/contact"
                className={
                  location.pathname === "/owner/contact"
                    ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark-text-blue-500"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-blue-700 md:p-0 dark-text-white md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent dark-border-gray-700"
                }
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/owner/about"
                className={
                  location.pathname === "/owner/about"
                    ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark-text-blue-500"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-blue-700 md:p-0 dark-text-white md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent dark-border-gray-700"
                }
              >
                About
              </Link>
            </li>
            {/* Add more header items here */}
          </ul>
        </div>
      </div>
      {/* Mobile menu items */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <ul className="py-2 bg-gray-100 md:bg-transparent">
            <li>
              <Link
                to='/admin/dashboard'
                className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to='/admin/dashboard'
                className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
              >
                About
              </a>
            </li>
            
          </ul>
        </div>
      )}
    </nav>
    </>
  )
}

export default AdminNavbar
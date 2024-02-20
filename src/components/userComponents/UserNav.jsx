import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../Redux/slices/UserSlice";
const UserNav = () => {
    const navigate = useNavigate()
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {user} = useSelector((state) => state.userReducer)
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("userToken")
    dispatch(userLogout())
    navigate("/login")
  }
  return (
    <>
      <div>
        <nav className="bg-slate-50">
          <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-3">
            <div>
              <a
                href="#"
                class="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src="/CleanHubLogo.png" class="h-8" alt="Flowbite Logo" />
              </a>
            </div>

            <div className="flex gap-4 items-center md:order-2">
              <div className="relative ms-4" onClick={toggleDropdown}>
                <button
                  type="button"
                  className="flex mr-3 text-sm rounded-full md:mr-0"
                  id="user-menu-button"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-10 h-10 rounded-full object-contain"
                    src="/userLogo.png"
                    alt="user photo"
                  />
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen &&
                  (user ? (
                    <div
                      className="absolute z-50 right-0 mt-4 text-base list-none divide-y divide-gray-500 rounded-lg shadow dark:divide-gray-600"
                      id="user-dropdown"
                      style={{ background: "#f1ac22" }}
                    >
                      <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-black">
                          {user.email}
                        </span>
                        <span className="block text-sm text-gray-600 truncate dark:text-gray-30">
                          {user.CH_id}
                        </span>
                      </div>
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/pickups"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                          >
                            My Pickups
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/giftcards"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                          >
                            Giftcards
                          </Link>
                        </li>

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
                  ) : (
                    <div
                      className="absolute z-50 right-0 mt-4 text-base list-none  divide-y divide-gray-100 rounded-lg shadow dark:divide-gray-600"
                      style={{ background: "#f1ac22" }}
                      id="user-dropdown"
                    >
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <Link
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                            style={{ background: "#f1ac22" }}
                            to="/login"
                          >
                            Login
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ))}
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
              className="items-center justify-center m-auto hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-user"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-slate-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-slate-50 dark:bg-slate-50 md:dark-bg-slate-50 dark-border-gray-700">
                <li>
                  <Link to="/" className="">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/pickups" className="">
                    My Pickups
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
                    to="/"
                    className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/pickups"
                    className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
                  >
                    my Pickups
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default UserNav;

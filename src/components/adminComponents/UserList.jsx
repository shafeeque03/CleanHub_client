import { useState, useEffect } from "react";
import { usersList, userBlock } from "../../api/adminApi";
import { toast } from "react-toastify";
import Pagination from "../Pagination";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [activeModal, setActiveModal] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 5;

    useEffect(() => {
        usersList()
            .then((res) => {
                setUsers(res?.data?.users);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    
    const blockUnblockUser = async (userId, currentStatus) => {
        try {
            const res = await userBlock(userId, currentStatus);
            if (res.status === 200) {
                // Update the user's status immediately in the state
                setUsers((prevUsers) => {
                    return prevUsers.map((user) => {
                        if (user._id === userId) {
                            return {
                                ...user,
                                is_blocked: !currentStatus, // Toggle the status
                            };
                        }
                        return user;
                    });
                });
                setActiveModal(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error.message);
        }
    };
    
    
    

    const openModal = (userId) => {
        setActiveModal(userId);
    };

    const closeModal = () => {
        setActiveModal(null);
    };
    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
        setCurrentPage(1)
    }

    const filteredData = !searchInput
        ? users
        : users.filter((person) =>
            person.CH_id.toLowerCase().includes(searchInput.toLowerCase())
        );
    const lastIndex = currentPage * dataPerPage;
    const firstIndex = lastIndex - dataPerPage;
    const usersInSinglePage = filteredData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredData.length / dataPerPage);
    const numbers = [...Array(totalPages + 1).keys()].slice(1);
    return (
        <>

            <div className="w-full md:w-3/4 px-4 mb-5 mt-5 ms-10">
                <div className="rounded-lg dark:border-gray-700">
                        <h1 className="text-3xl pt-2 mb-3 text-yellow-500">Users List</h1>
                    <div className="relative  shadow-md sm:rounded-lg">
                        <div className="flex items-center justify-end py-4 bg-white dark:bg-yellow-600 mb-1">
                            
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-green-100"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search-users"
                                    value={searchInput}
                                    onChange={handleInputChange}
                                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 me-2"
                                    placeholder="Search by ch_id"
                                />
                            </div>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-yellow-600 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Mobile
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        CH ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="mt-5">
                                {usersInSinglePage.length > 0 ? (
                                    usersInSinglePage.map((data) => (
                                        <tr
                                            key={data?._id}
                                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded"
                                        >
                                            <th
                                                scope="row"
                                                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white rounded"
                                            >
                                                <div className="pl-3">
                                                    <div className="text-base text-white font-semibold">
                                                        {data?.name}
                                                    </div>
                                                    <div className="font-normal text-gray-500">
                                                        {data?.email}
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">{data?.number}</td>
                                            <td className="px-6 py-4">{data?.CH_id}</td>
                                            <td className="px-6 py-4">
                                                {data?.is_verified ? (
                                                    <div className="flex items-center">
                                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                                                        Verified
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <div className="h-2.5 w-2.5 rounded-full bg-red-700 mr-2" />{" "}
                                                        Not Verified
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {data?.is_blocked
                                                    ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => openModal(data?._id)}
                                                            className="focus:outline-none w-24 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                        >
                                                            Unblock
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => openModal(data?._id)}
                                                            className="focus:outline-none w-24 text-white bg-red-700 hover-bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                        >
                                                            Block
                                                        </button>
                                                    )}
                                            </td>

                                            <div
                                                id={`popup-modal-${data?._id}`}
                                                tabIndex={-1}
                                                className={`fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ${activeModal === data?._id ? "" : "hidden"
                                                    }`}
                                            >
                                                <div className="relative w-full max-w-md max-h-full">
                                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                        <button
                                                            type="button"
                                                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover-bg-gray-600 dark:hover-text-white"
                                                            data-modal-hide={`popup-modal-${data?._id}`}
                                                            onClick={() => closeModal()}
                                                        >
                                                            <svg
                                                                className="w-3 h-3"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 14 14"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                                />
                                                            </svg>
                                                            <span className="sr-only">Close modal</span>
                                                        </button>
                                                        <div className="p-6 text-center">
                                                            <svg
                                                                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                />
                                                            </svg>
                                                            {data?.isBlocked ? (
                                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                                    Are you sure you want to Unblock {" "}
                                                                    {data?.name}?
                                                                </h3>
                                                            ) : (
                                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                                    Are you sure you want to Block {" "}
                                                                    {data?.name}?
                                                                </h3>
                                                            )}
                                                            <button
                                                                data-modal-hide={`popup-modal-${data?._id}`}
                                                                type="button"
                                                                onClick={() =>
                                                                    blockUnblockUser(data?._id, data?.is_blocked)
                                                                }
                                                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                                            >
                                                                Yes, I'm sure
                                                            </button>
                                                            <button
                                                                data-modal-hide={`popup-modal-${data?._id}`}
                                                                type="button"
                                                                onClick={() => closeModal()}
                                                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover-text-white dark:hover-bg-gray-600 dark:focus:ring-gray-600"
                                                            >
                                                                No, cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-4 text-center text-gray-900 dark:text-white"
                                        >
                                            No users
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {usersInSinglePage.length>1&&(
                        <Pagination
                        numbers={numbers}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        />
                    )}

                </div>
            </div>

        </>
    );
};

export default UserList;

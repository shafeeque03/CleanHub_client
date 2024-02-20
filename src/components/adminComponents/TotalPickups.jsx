import React, { useEffect, useState } from "react";
import { getPickups, editPickupWeight } from "../../api/adminApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const TotalPickups = () => {
  const {user} = useSelector((state) => state.userReducer)
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPick, setSelectedPick] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getPickups()
      .then((res) => {
        setPickups(res.data.pickups);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleOpenModal = (pickup) => {
    setSelectedPick(pickup);
    pickups.map((value) => {
      if (value._id == pickup._id) {
        setSelectedWeight(pickup.weight);
      }
    });
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (pid) => {
    try {
      setLoading(true);
      const res = await editPickupWeight(pid, selectedWeight);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        // Fetch pickups again to get the updated data
        const updatedPickups = await getPickups();
        setPickups(updatedPickups.data.pickups);
        setLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="w-full md:w-3/4 px-4 mb-5 mt-5 ms-10">
        <div className="rounded-lg dark:border-gray-700">
          <h1 className="text-3xl pt-2 mb-3 text-yellow-500">Pickup List</h1>
          <div className="relative  shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-yellow-500 dark:text-gray-800 rounded-xl">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Weight
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Points
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="mt-5">
                {pickups && pickups.length > 0 ? (
                  pickups.map((value) => (
                    <tr className="bg-white border-b dark:bg-yellow-400 dark:border-gray-700 rounded">
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white rounded"
                      >
                        <div>
                          <div className="text-base font-semibold text-slate-700">
                            {value.userName}
                          </div>
                          <div className="font-normal text-gray-500">
                            {value.chid}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4 text-slate-700">
                        {value.weight}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {new Date(value?.date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {value.point}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="focus:outline-none w-24 text-white bg-blue-600  focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600"
                        >
                          {value.status}
                        </button>
                      </td>
                      {value.status=="Success" ?(
                      <>
                      <td
                        className="py-4 text-slate-700 cursor-pointer hover:scale-110 duration-500"
                      >
                        Edited
                      </td>
                      </>
                      ):(
                      <>
                      <td
                        className="py-4 text-slate-700 cursor-pointer hover:scale-110 duration-500  hover:font-bold hover:text-white hover:underline"
                        onClick={() => handleOpenModal(value)}
                      >
                        Edit
                      </td>
                      </>
                      )}
                      
                    </tr>
                  ))
                ) : (
                  <p className="text-center mt-3">No Pickups</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && selectedPick && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-yellow-500 p-8 rounded-lg z-10 max-w-md w-full">
            <h1 className="text-xl font-bold mb-4 text-slate-50">
              Weigh of {selectedPick.chid}
            </h1>
            <input
              type="number"
              className="border p-2 mb-4 w-full rounded-xl"
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
            />

            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 ms-2 text-white p-2 rounded"
              onClick={() => handleSubmit(selectedPick._id)}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TotalPickups;

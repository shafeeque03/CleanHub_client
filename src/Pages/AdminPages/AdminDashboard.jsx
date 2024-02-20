import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/adminComponents/AdminNavbar";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import { addGiftCard } from "../../api/adminApi";
import { toast } from "react-toastify";
import { totalGiftcards } from "../../api/adminApi";

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [giftcards, setGiftcards] = useState([]);
  const handleCloseCancelModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const [cardValue, setCardValue] = useState({
    cardName: null,
    pointRequired: null,
  });

  const handleAddgiftCard = async () => {
    try {
      if (cardValue.cardName == null || cardValue.pointRequired == null) {
        toast.error("Fill the form");
      } else {
        const res = await addGiftCard(cardValue);
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setCardValue({ cardName: null, pointRequired: null });
          setShowModal(false);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    totalGiftcards()
      .then((res) => {
        setGiftcards(res?.data?.allCards);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }),
    [];

  return (
    <div>
      <AdminNavbar />
      <div className="flex overflow-auto">
        <AdminSidebar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold mb-4 text-yellow-500">
                Admin Dashboard
              </h1>
              <button
                type="button"
                className="text-white fade-ef bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4 ms-7"
                onClick={() => handleOpenModal()}
              >
                Add GiftCard
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Box 1 */}
              <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 font-semibold">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-white">3</p>
              </div>

              {/* Box 2 */}
              <div className="bg-gradient-to-r  from-blue-500 via-purple-500 to-green-300 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 font-semibold">
                  Total Pickups
                </p>
                <p className="text-3xl font-bold text-white">15</p>
              </div>
            </div>
          </div>
          <div className="text-white ms-4 text-xl text-yellow-500 font-bold mb-3">
            Total Giftcards
          </div>
          <div className="p-3">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-50">
                <thead class="text-xs text-gray-50 uppercase bg-gray-50 dark:bg-yellow-600 dark:text-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      NO
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Giftcard
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Required point
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {giftcards.length> 0 ? (
                    giftcards.map((card,index)=>(
                      <tr class="dark:bg-yellow-500  border dark:border-yellow-600">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-50 whitespace-nowrap dark:text-white"
                    >
                      {index+1}
                    </th>
                    <td class="px-6 py-4">{card.name}</td>
                    <td class="px-6 py-4">🪙 {card.point_need}</td>
                  </tr>
                    ))
                    
                  ):(
                    <p>No Giftcard</p>
                  )}
                  
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-gradient-to-r  from-green-500 via-purple-500 to-red-500 p-8 rounded-lg z-10 max-w-md w-full">
            <h1 className="text-xl font-bold mb-6 text-yellow-50">
              Add New GiftCard
            </h1>
            <div className="flex flex-col">
              <p className="text-white text-sm">Card Name</p>
              <input
                type="text"
                className="w-full py-1 p-2 border-2 bg-slate-50 mb-5 rounded-lg"
                value={cardValue.cardName}
                onChange={(e) =>
                  setCardValue({ ...cardValue, cardName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <p className="text-white text-sm">Point Required</p>
              <input
                type="number"
                className="w-full py-1 p-2 border-2 bg-slate-50 mb-5 rounded-lg"
                value={cardValue.pointRequired}
                onChange={(e) =>
                  setCardValue({ ...cardValue, pointRequired: e.target.value })
                }
              />
            </div>
            {/* <p className="mb-4 text-slate-600 font-bold">Are you sure you want to cancel this booking?</p> */}
            <button
              type="button"
              className="bg-black px-5 text-white p-2 rounded"
              onClick={handleCloseCancelModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-yellow-500 px-5 ms-2 text-white p-2 rounded"
              onClick={() => handleAddgiftCard()}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import UserNav from "../../components/userComponents/UserNav";
import { allGiftcards, getMyPoints, unlockCard } from "../../api/userApi";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";
import Confetti from "react-dom-confetti";
import { toast } from "react-toastify";

const GiftCardPage = () => {
  const { user } = useSelector((state) => state.userReducer);
  const userId = user._id;
  const [loading, setLoading] = useState(true);
  const [giftcards, setGiftcards] = useState([]);
  const [myPoint, setMyPoint] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    allGiftcards(userId)
      .then((res) => {
        setGiftcards(res?.data?.cards);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  useEffect(() => {
    getMyPoints(userId)
      .then((res) => {
        setMyPoint(res?.data?.point);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  

  const unlockMyCard = async (cardId) => {
    try {
    //   setLoading(true);
      const res = await unlockCard(cardId, userId);
      if (res.status === 200) {
        toast.success(res?.data?.message)
        const resp = await getMyPoints(userId)
        setMyPoint(resp?.data?.point);
        setConfetti(true);

        allGiftcards(userId)
          .then((res) => {
            setGiftcards(res?.data?.cards);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    } catch (error) {
    //   setLoading(false);
      console.log(error.message);
    }
  };

  const handleCopyToClipboard = () => {
    const inputElement = document.getElementById("cardCodeInput");

    if (inputElement) {
      inputElement.select();
      document.execCommand("copy");
      // Optionally, you can provide feedback to the user that the text has been copied
    }
  };

  const confettiConfig = {
    angle: 180,
    spread: 360,
    startVelocity: 40,
    elementCount: 200,
    dragFriction: 0.08,
    duration: 3000,
    stagger: 3,
    width: "12px",
    height: "12px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCard(null)

  };

  const handleShowCode  =(card)=>{
    setShowModal(true)
    setSelectedCard(card)
  }

  return (
    <div>
      <UserNav />
      <p className="text-center text-lg mt-5 mb-3 font-bold text-slate-700 ">My Points 🪙: {myPoint?.point}</p>
      {loading ? (
        <Spinner />
      ) : (
       
        <div className="p-3 w-full bg-white flex-wrap justify-center gap-7 flex">
          {giftcards.length < 1 ? (
            <>
              <p className="text-center text-slate-600 text-lg">No GiftCards Available</p>
            </>
          ) : (
            giftcards.map((card) => (
              <div className="w-1/4 p-6 bg-yellow-900 border border-gray-200 rounded-lg shadow dark:bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 ">
                <svg
                  class="w-7 h-7 text-gray-500 dark:text-yellow-700 mb-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
                <a href="#">
                  <h5 class="mb-2 text-2xl font-semibold tracking-tight text-yellow-700">
                    {card.name}
                  </h5>
                </a>
                <p class="mb-3 font-normal text-yellow-800">
                  {card.point_need} Points Required to Unlock
                </p>

                {card?.isUnlocked ? (
                  <a
                    href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    onClick={() => handleShowCode(card)}
                  >
                    Show Code
                    
                  </a>
                ) : (
                <div>
                    {}
                    {myPoint?.point >= card.point_need ? (
                  <a
                    href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800"
                    onClick={() => unlockMyCard(card._id)}
                  >
                    Unlock
                    <svg
                      class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                    </svg>
                  </a>
                ) : (
                  <a
                    href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-slate-600 dark:focus:ring-blue-800"
                  >
                    Unlock
                    <svg
                      class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                    </svg>
                  </a>
                )}
                  </div>
                )}
              </div>
            ))
          )}
          <Confetti
            active={confetti}
            config={confettiConfig}
            onAnimationEnd={() => setConfetti(false)}
          />
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="bg-black opacity-60 p-8 rounded-lg z-10 max-w-md w-full">
            <div className="flex gap-4">
            <h1 className="text-xl font-bold mb-6 text-yellow-500">
              {selectedCard?.name}
            </h1>
            <svg
                  class="w-7 h-7 text-gray-500 dark:text-blue-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
                </div>
            <div className="flex flex-col">
              <input
                id="cardCodeInput"
                type="text"
                className="w-full py-1 p-2 border-2 bg-slate-50 mb-5 rounded-lg"
                value={selectedCard?.code}
                readOnly
              />
              <button
                type="button"
                className="bg-black px-5 text-white p-2 rounded"
                onClick={handleCopyToClipboard}
              >
                Copy to Clipboard
              </button>
            </div>
            <button
              type="button"
              className="bg-black px-5 text-white p-2 rounded"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftCardPage;

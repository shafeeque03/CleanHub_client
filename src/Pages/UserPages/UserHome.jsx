import React, { useEffect, useState } from "react";
import UserNav from "../../components/userComponents/UserNav";
import UserFooter from "./UserFooter";
import { useSelector } from "react-redux";
import { requestPickup, getMyPoints } from "../../api/userApi";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const UserHome = () => {
  const [point, setPoint] = useState(null);
  const [load, setLoad] = useState(true);
  const [pCount, setPcount] = useState(null);
  const { user } = useSelector((state) => state.userReducer);
  const userId = user._id;
  const [theme, setTheme] = useState("bg-gray-900");
  const [buttonValue, setButtonValue] = useState("Call Mr.Cleaner");

  useEffect(() => {
    getMyPoints(userId)
      .then((res) => {
        setPoint(res?.data?.point);
        setPcount(res?.data?.pickCount);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleRequest = async () => {
    try {
      const res = await requestPickup(userId);
      if (res.status === 200) {
        setButtonValue("requested");
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const handleThemeToggle = () => {
    setTheme((prevTheme) =>
      prevTheme === "bg-white" ? "bg-gray-900" : "bg-white"
    );
  };


  return (
    <div>
      <UserNav />
      {user && load === false ? (
      <div
        className="leading-normal min-h-screen bg-gray-50 w-full p-5 tracking-normal text-indigo-400"
      >
        <div class="h-full">
          <div class="w-full container mx-auto">
            <div class="w-full flex items-center justify-between">
              <a
                class="flex items-center text-black no-underline hover:no-underline mt-2 font-bold text-2xl lg:text-4xl"
                href="#"
              >
                 <p className=" text-black opacity-75">Welcome</p>
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 ps-2">
                  {user.name}
                </span>
              </a>
            </div>
          </div>

          <div class="container  mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
              <h1 class="my-4 text-3xl md:text-5xl text-black font-bold opacity-75 leading-tight text-center md:text-left">
                Redeem
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 ms-2 me-2">
                  Points
                </span>
                to earn Money!
              </h1>
              <p class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
              CleanHub has been meticulously crafted to enhance your satisfaction
              </p>

              <div class="bg-gray-800 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                  <label
                    class="block text-blue-300 py-2 font-bold mb-2"
                  >
                    🪙 My Points -  {load === false && <>{point.point}</>}
                  </label>
                  <label
                    class="block text-blue-300 py-2 font-bold mb-2"
                  >
                    🚚 Total Pickups -  {load === false && <>{pCount}</>}
                  </label>
                  
                </div>

                <div class="flex items-center justify-between pt-4">
                  <button
                    class="bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    type="button"
                    onClick={() => handleRequest()}
                  >
                    👨‍🌾 {buttonValue}
                  </button>
                </div>
              </div>
            </div>

            <div class="w-full xl:w-3/5 p-12 overflow-hidden">
              <img
                class="mx-auto w-1/2 md:w-1/ transform -rotate-6 transition hover:scale-110 duration-700 ease-in-out hover:rotate-6"
                src="cleanerLady.png"
              />
            </div>

            
          </div>
        </div>
      </div>
      ):(<Spinner/>)}
    </div>
  );
};

export default UserHome;

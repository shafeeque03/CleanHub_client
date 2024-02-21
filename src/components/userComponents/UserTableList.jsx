import React, { useEffect, useState } from "react";
import { myPickups } from "../../api/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserTableList = () => {
  const { user } = useSelector((state) => state.userReducer);
  const userId = user._id;
  const [load, setLoading] = useState(true);
  const [pickups, setPickups] = useState([]);
  const [point, setPoint] = useState(null)
  useEffect(() => {
    myPickups(userId)
      .then((res) => {
        setPickups(res?.data?.myPickups);
      setPoint(res?.data?.point)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.response?.data?.message);
      });
  },[userId]);

  return (
    <div className="p-6">
      <div class="relative overflow-x-auto  sm:rounded-lg max-w-screen-2xl m-auto">
        <h1 className="flex justify-end me-10 mb-5 text-lg font-bold">Total Points : 🪙{load==false &&(<>{point.point}</>)}</h1>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-600 uppercase bg-gray-50 dark:bg-yellow-500 dark:text-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">
                No
              </th>
              <th scope="col" class="px-6 py-3">
                Weight
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {pickups && pickups.length > 0 ? (pickups.map((pickup,index)=>(

            <tr class="border-b text-white bg-black dark:border-yellow-700">
              <td class="px-6 py-4">{index+1}</td>
              <td class="px-6 py-4">{pickup.weight}</td>
              <td class="px-6 py-4">{pickup.status}</td>
              <td class="px-6 py-4">{new Date(pickup.date).toLocaleDateString("en-GB")}</td>
              <td class="px-6 py-4">🪙{pickup.point}</td>
            </tr>
            ))):(<></>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTableList;

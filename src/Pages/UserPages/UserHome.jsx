import React, { useEffect, useState } from "react";
import UserNav from "../../components/userComponents/UserNav";
import UserFooter from "./UserFooter";
import { useSelector } from "react-redux";
import { requestPickup, getMyPoints } from "../../api/userApi";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const UserHome = () => {
  const [point, setPoint] = useState(null)
  const [load, setLoad] = useState(true)
  const [pCount, setPcount] = useState(null)
  const {user} = useSelector((state) => state.userReducer)
  const userId = user._id
  const[butonValue, setButtonValue] = useState("Call Mr.Cleaner")
  useEffect(()=>{
    getMyPoints(userId)
    .then((res)=>{
      setPoint(res?.data?.point)
      setPcount(res?.data?.pickCount)
      setLoad(false)
    }).catch((err)=>{
      console.log(err.message)
    })
  },[])
  console.log(point,"jiii")
  const handleRequest = async()=>{
try {
  const res = await requestPickup(userId)
  if(res.status==200){
    setButtonValue("requested")
    toast.success(res?.data?.message)
  }
} catch (error) {
  console.log(error.message)
  toast.error(error.response?.data?.message)
}
  }
  return (
    <div>
      {user && load==false? (
      <>
      <UserNav />

<div className="bg-yellow-500 h-auto w-full flex flex-wrap p-3 md:flex-wrap justify-evenly items-center">
  <div className="md:w-1/5 h-auto py-3 px-1 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-xl w-4/5 m-2">
    <h1 className="text-2xl text-slate-50 ms-3 mt-3">🪙Total Points</h1>
    <p className="text-2xl text-slate-50 font-bold text-start ms-5 mt-2">
      {load==false &&(<>{point.point}</>)}
    </p>
  </div>
  <div className="md:w-1/5 h-auto py-3 px-1 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-xl w-4/5 m-2">
    <h1 className="text-2xl text-slate-50 ms-3 mt-3">🚚Total Pickups</h1>
    <p className="text-2xl text-slate-50 font-bold text-start ms-5 mt-2">
    {load==false &&(<>{pCount}</>)}
    </p>
  </div>
  <div className="md:w-1/5 h-auto py-3 px-1 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-xl w-4/5 m-2">
    <h1 className="text-2xl text-slate-50 ms-3 mt-3"> 🪙Todays Points</h1>
    <p className="text-2xl text-slate-50 font-bold text-start ms-5 mt-2">
      24
    </p>
  </div>
</div>

<div className="w-full h-auto bg-slate-50 flex flex-wrap p-3 text-white md:flex-wrap justify-evenly gap-2 items-center fade-ef">
  <div class="bnrs1 hover:-translate-y-1 hover:scale-90 duration-500">
    <h2 class="mt-3 ms-3 text-xl mt-1 font-bold  me-2">
      Redeem points into cash and enjoy
    </h2>
  </div>
  <div class="bnrs2 hover:-translate-y-1 hover:scale-90 duration-500">
    <h2 class="mt-3 ms-3 text-xl mt-1 font-bold  me-2">
      Redeem points into Gift Cards
    </h2>
  </div>
  <div class="bnrs3 hover:-translate-y-1 hover:scale-90 duration-500">
    <h2 class="mt-3 ms-3 text-xl mt-1 font-bold  me-2">
      Redeem points into cash and enjoy
    </h2>
  </div>
</div>

<div className="h-auto w-full m-auto p-6 bg-yellow-400">
  <h1 className="text-yellow-700 font-bold text-xl text-center">
    Transforming waste into rewards, CleanHub not only cleans the
    environment but also enriches lives. Join us in the journey of
    sustainability, where every contribution makes a difference. Your
    waste, our reward – building a cleaner, greener future together.
  </h1>
  <button className="border-2 border-slate-50 rounded-xl text-white p-3 m-auto mt-3 flex justify-center hover:bg-yellow-500"
  onClick={()=>handleRequest()}
  >
    👨‍🌾 {butonValue}
  </button>
</div>

<UserFooter />
      </>
        ):(
        <>
        <p><Spinner/></p>
        </>
        )}
      
    </div>
  );
};

export default UserHome;

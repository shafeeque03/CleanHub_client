import React from 'react'
import UserNav from '../../components/userComponents/UserNav'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
const {user} = useSelector((state) => state.userReducer)
  return (
    <div>
        <UserNav/>
        <div>
      <div className="w-full min-h-screen bg-slate-50  p-7 fade-ef">
        <h2 className="text-center mb-5 text-3xl font-bold text-yellow-500">
          PROFILE
        </h2>
        <div className="container mx-auto">
          <div>
            <div className="bg-white relative shadow w-5/6 md:w-5/6 rounded-3xl lg:w-4/6 xl:w-3/6 mx-auto p-5">
            <div className="relative w-52 h-52 rounded-full border-2 m-auto">
                <label htmlFor="profilePhoto" className="cursor-pointer">
                  <img
                    src="/userLogo.png"
                    className="w-full h-full object-cover rounded-full"
                    alt=""
                  />
                </label>
              </div>
              
                <>
                  <div className="p-4">
                    
                    <p className="text-center mt-5">
                      <span className="text-slate-600 text-xl font-bold text-center">
                      {user.CH_id}
                      </span>
                    </p>

                    <div className="w-full">
                      <div className="mt-5 overflow-hidden text-sm">
                        <label
                          htmlFor="roomName"
                          className="block text-sm font-medium py-2 ms-2 text-gray-600"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="border rounded p-3 w-full text-slate-700"
                          value={user.name}
                          disabled
                        />
                      </div>
                      <div className="mt-5 overflow-hidden text-sm">
                        <label
                          htmlFor="roomName"
                          className="block text-sm font-medium py-2 ms-2 text-gray-600"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          className="border rounded p-3 w-full text-slate-700"
                          value={user.email}
                          disabled
                        />
                      </div>
                      <div className="mt-5 overflow-hidden text-sm">
                        <label
                          htmlFor="roomName"
                          className="block text-sm font-medium py-2 ms-2 text-gray-600"
                        >
                          Phone
                        </label>
                        <input
                          type="text"
                          className="border rounded p-3 w-full text-slate-700"
                          value={user.number}
                          disabled
                        />
                      </div>
                      
                    </div>
                  </div>
                </>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Profile
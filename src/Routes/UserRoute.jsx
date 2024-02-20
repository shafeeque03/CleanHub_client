import React from 'react'
import { Routes, Route } from "react-router-dom";
import UserHome from '../Pages/UserPages/UserHome';
import UserLogin from '../Pages/UserPages/UserLogin';
// import UserSignup from '../src/Pages/UserPages/UserSignup';
import UserSignup from '../Pages/UserPages/UserSignup';
import ItemTable from '../Pages/UserPages/ItemTable';
import Profile from '../Pages/UserPages/Profile';
import GiftCardPage from '../Pages/UserPages/GiftCardPage';

const UserRoute = () => {
  return (
    <Routes>

            <Route path="/" element={<UserHome/>}/>
            <Route path="/login" element={<UserLogin/>}/>
            <Route path="/signup" element={<UserSignup/>}/>
            <Route path="/pickups" element={<ItemTable/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/giftcards" element={<GiftCardPage/>}/>



        </Routes>
  )
}

export default UserRoute    
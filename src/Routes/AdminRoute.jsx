import { Route, Routes } from "react-router-dom";
import AdminLogin from "../Pages/AdminPages/AdminLogin";
import AdminDashboard from "../Pages/AdminPages/AdminDashboard";
import PickupListPage from "../Pages/AdminPages/PickupListPage";
import UserListPage from "../Pages/AdminPages/UserListPage";

const AdminRoute = ()=>{
    return(
        <Routes>
            <Route path="/" element={<AdminLogin/>}/>
            <Route path="/dashboard" element={<AdminDashboard/>}/>
            <Route path="/pickups" element={<PickupListPage/>}/>
            <Route path="/userList" element={<UserListPage/>}/>
        </Routes>
    )
}

export default AdminRoute
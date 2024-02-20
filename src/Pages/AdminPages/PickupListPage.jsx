import React from 'react'
import AdminNavbar from '../../components/adminComponents/AdminNavbar'
import AdminSidebar from '../../components/adminComponents/AdminSidebar'
import TotalPickups from '../../components/adminComponents/TotalPickups'


const PickupListPage = () => {
  return (
    <div>
        <AdminNavbar/>
        <div className="mx-auto flex bg-black">
        <AdminSidebar/>
        <TotalPickups/>
        </div>
    </div>
  )
}

export default PickupListPage
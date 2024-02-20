import React from 'react'
import AdminSidebar from '../../components/adminComponents/AdminSidebar'
import UserList from '../../components/adminComponents/UserList'
import AdminNavbar from '../../components/adminComponents/AdminNavbar'

const UserListPage = () => {
  return (
    <div>
        <AdminNavbar/>
        <div className="mx-auto flex bg-black">
        <AdminSidebar />
        <UserList/>
        </div>
    </div>
  )
}

export default UserListPage
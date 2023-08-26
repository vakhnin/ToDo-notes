import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'

import UsersList from './UsersList'
import UserDetail from './UserDetail'

const Users = props => {
  return (
    <Routes>
      <Route index element={
        <>
          <h2 className='py-3'>Пользователи</h2>
          <UsersList {...props} />
        </>} />
      <Route path=":id" element={
        <>
          <h2 className='pt-3'>Детальная информация о пользователе</h2>
          <h5 className='pb-3'><Link to={'/users'}>&lt;&lt;&lt; К списку пользователей</Link></h5>
          <UserDetail {...props} />
        </>} />
    </Routes>
  )
}

export default Users

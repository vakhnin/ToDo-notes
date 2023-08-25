import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import UsersList from './UsersList'

const Users = props => {
  return (
    <Routes>
      <Route index element={
        <UsersList {...props} />} />
      {/* <Route path=":id" element={
          <div>
            <h2>Детальная информация о пользователе</h2>
            <UserDetail {...props} />
          </div>} /> */}
    </Routes>
  )
}
Users.propTypes = {
  users: PropTypes.array,
  setProjectsState: PropTypes.func
}

export default Users

import React from 'react'
import PropTypes from 'prop-types'

const UserItem = ({ user }) => {
  return (
        <tr>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
        </tr>
  )
}
UserItem.propTypes = {
  user: PropTypes.object
}

const UserList = ({ users }) => {
  return (
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => <UserItem key={user.username} user={user} />)}
            </tbody>
        </table>
  )
}
UserList.propTypes = {
  users: PropTypes.array
}

export default UserList

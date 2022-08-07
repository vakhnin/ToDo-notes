import React from 'react'

const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        First name
                    </th>
                    <th>
                        Last Name
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => <UserItem  key={user.username} user={user} />)}
            </tbody>
        </table>
    )
}

export default UserList

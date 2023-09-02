import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import UserUpdateCard from './UserUpdateCard'
import UserCard from './UserCard'

const UserDetail = props => {
  const { id } = useParams()
  const user = props.users.find((item) => item.id === Number(id))
  const userIsI = Number(id) === props.currentUserID
  const [showEditState, setShowEditState] = useState(false)

  if (user) {
    return (
      <>
        {showEditState
          ? <UserUpdateCard userIsI={userIsI} userID={Number(id)} setShowEditState={setShowEditState} {...props} />
          : <UserCard user={user} userIsI={userIsI} setShowEditState={setShowEditState} />
        }
      </>)
  } else {
    return (
      <div>Нет пользователя с таким ID</div>
    )
  }
}
UserDetail.propTypes = {
  users: PropTypes.array,
  currentUserID: PropTypes.number
}

export default UserDetail

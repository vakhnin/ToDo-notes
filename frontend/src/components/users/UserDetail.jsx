import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import UserUpdateCard from './UserUpdateCard'
import UserCard from './UserCard'

const UserDetail = props => {
  const { id } = useParams()
  const userIsI = Number(id) === props.currentUserID
  const [showEditState, setShowEditState] = useState(false)

  return (
    <>
      {showEditState
        ? <UserUpdateCard userID={Number(id)} userIsI={userIsI} setShowEditState={setShowEditState} {...props} />
        : <UserCard userID={Number(id)} userIsI={userIsI} setShowEditState={setShowEditState} {...props} />
      }
    </>)
}
UserDetail.propTypes = {
  users: PropTypes.array,
  currentUserID: PropTypes.number
}

export default UserDetail

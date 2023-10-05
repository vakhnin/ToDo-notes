import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'

import UserUpdateCard from '../users/UserUpdateCard'
import UserCard from '../users/UserCard'

const ProfileUserDetail = props => {
  const [showEditState, setShowEditState] = useState(false)

  return (
    <>
      <Helmet>
        <title>Профиль</title>
      </Helmet>
      {showEditState
        ? <UserUpdateCard userID={props.currentUserID} userIsI={true} setShowEditState={setShowEditState} {...props} />
        : <UserCard userID={props.currentUserID} userIsI={true} setShowEditState={setShowEditState} {...props} />
      }
    </>)
}
ProfileUserDetail.propTypes = {
  users: PropTypes.array,
  currentUserID: PropTypes.number
}

export default ProfileUserDetail

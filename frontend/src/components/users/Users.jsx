import React, { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'

import { RESTAPI } from '../Settings'
import UsersList from './UsersList'
import UserDetail from './UserDetail'
import ProfileUserDetail from '../profile/ProfileUserDetail'

const Users = props => {
  const [showNotActiveState, setShowNotActiveState] = useState(false)

  const toggleShowNotActiveState = () => {
    setShowNotActiveState(!showNotActiveState)
  }

  const deleteUser = ToDoId => {
    const id = Number(ToDoId)
    RESTAPI.patch(`users/${id}/`, { isActive: false })
      .then(response => {
        props.setUsersState(
          props.users.map(item => {
            return item.id === id ? response.data : item
          }))
      }).catch(error => {
        console.log(error)
      })
  }
  return (
    <Routes>
      <Route index element={
        <>
          <h2 className='py-3'>Пользователи</h2>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput1" >
            <Form.Check type="switch" label="Показать неактивных пользователей"
              onClick={() => toggleShowNotActiveState()} />
          </Form.Group>
          <UsersList showNotActiveState={showNotActiveState} deleteUser={deleteUser}
            {...props} />
        </>} />
      <Route path="me" element={
        <>
          <h2 className='py-3'>Ваш профиль</h2>
          <ProfileUserDetail deleteUser={deleteUser} {...props} />
        </>} />
      <Route path=":id" element={
        <>
          <h2 className='py-3'>Детальная информация о пользователе</h2>
          <h5 className='pb-3'>
            <Link to={'/users'}>
              <FontAwesomeIcon className='normal-size-icon pe-2' icon={faArrowLeftLong} />
              К списку пользователей
            </Link>
          </h5>
          <UserDetail deleteUser={deleteUser} {...props} />
        </>} />
    </Routes>
  )
}
Users.propTypes = {
  users: PropTypes.array,
  setUsersState: PropTypes.func
}

export default Users

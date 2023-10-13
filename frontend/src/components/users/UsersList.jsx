import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Card, Col, Row } from 'react-bootstrap'

import UserCard from './UserCard'
import UserUpdateCard from './UserUpdateCard'

const UserItem = props => {
  const [showEditState, setShowEditState] = useState(false)

  return (
    <Col className='pb-3 align-self-stretch' md={6} lg={4} xl={3}>
      {showEditState
        ? <UserUpdateCard setShowEditState={setShowEditState} {...props} />
        : <UserCard setShowEditState={setShowEditState} {...props} />}
    </Col>
  )
}
UserItem.propTypes = {
  userID: PropTypes.number,
  users: PropTypes.array,
  userIsI: PropTypes.bool
}

const RegistryItem = ({ setModalShow }) => {
  return (
    <Col className='pb-3 align-self-stretch' md={6} lg={4} xl={3}>
      <Card className='h-100'>
        <Card.Header>
          <Link className='link-success'>Зарегистрироваться</Link>
        </Card.Header>
        <Card.Body className='h-100'>
          <Card.Text className='big-plus h-100 d-flex align-items-center justify-content-center'>
            <Link className='link-success  stretched-link'
              onClick={() => setModalShow('registry')}>
              <FontAwesomeIcon icon={faCirclePlus} />
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}
RegistryItem.propTypes = {
  setModalShow: PropTypes.func
}

const UsersList = props => {
  return (
    <Row>
      {props.isAuthenticated() && props.currentUserID
        ? <UserItem userID={props.currentUserID} userIsI {...props} />
        : <RegistryItem setModalShow={props.setModalShow} />
      }
      {props.users.map((user) =>
        (user.isActive || props.showNotActiveState) &&
        <UserItem key={user.id} userID={user.id} {...props} />)}
    </Row>
  )
}
UsersList.propTypes = {
  currentUserID: PropTypes.number,
  showNotActiveState: PropTypes.bool,
  users: PropTypes.array,
  isAuthenticated: PropTypes.func,
  setModalShow: PropTypes.func
}

export default UsersList

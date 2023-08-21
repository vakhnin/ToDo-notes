import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Card, Col, Row } from 'react-bootstrap'

const UserItem = ({ user }) => {
  return (
    <Col className='pb-3 align-self-stretch' md={6} lg={4} xl={3}>
      <Card className='h-100'>
        <Card.Header>
          <div className='d-flex justify-content-between'>
            <div>{user.username}</div>
            <div>
              <Link className='pe-1 link-success'>
                <FontAwesomeIcon icon={faPenToSquare} />
              </Link>
              <Link className='ps-1 link-danger'>
                <FontAwesomeIcon icon={faTrash} />
              </Link>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title className='text-capitalize'>{user.firstName} {user.lastName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
          <Card.Text as='div'>
            <div>Владелец проектов:</div>
            <div>Нет проектов</div>
            <div>Участник проектов:</div>
            <div>Нет проектов</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}
UserItem.propTypes = {
  user: PropTypes.object
}

const UsersList = ({ users }) => {
  return (
    <>
      <h2 className='py-3'>Пользователи</h2>
      <Row>
        <Col className='pb-3 align-self-stretch' md={6} lg={4} xl={3}>
          <Card className='h-100'>
            <Card.Header>
              <Link className='link-success'>Зарегистрироваться</Link>
            </Card.Header>
            <Card.Body className='h-100'>
              <Card.Text className='big-plus h-100 d-flex align-items-center justify-content-center'>
                <Link className='link-success  stretched-link'>
                  <FontAwesomeIcon icon={faCirclePlus} />
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {users.map((user) => <UserItem key={user.id} user={user} />)}
      </Row>
    </>
  )
}
UsersList.propTypes = {
  users: PropTypes.array
}

export default UsersList

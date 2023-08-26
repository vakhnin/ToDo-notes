import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Card, Col, Row } from 'react-bootstrap'

const UserItem = ({ user, userIsI }) => {
  return (
    <Col className='pb-3 align-self-stretch' md={6} lg={4} xl={3}>
      <Card className='h-100'>
        <Card.Header>
          <div className='d-flex justify-content-between'>
            <div><Link to={`/users/${user.id}`}>{user.username}</Link> {userIsI && '(Вы)'}</div>
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
            <div className=' text-muted'>&lt;нет проектов&gt;</div>
            <div>Участник проектов:</div>
            <div>&lt;нет проектов&gt;</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}
UserItem.propTypes = {
  user: PropTypes.object,
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
        ? <UserItem user={props.users.find((item) => item.id === props.currentUserID)} userIsI={true} />
        : <RegistryItem setModalShow={props.setModalShow} />
      }
      {props.users.map((user) => <UserItem key={user.id} user={user} userIsI={false} />)}
    </Row>
  )
}
UsersList.propTypes = {
  currentUserID: PropTypes.number,
  users: PropTypes.array,
  isAuthenticated: PropTypes.func,
  setModalShow: PropTypes.func
}

export default UsersList

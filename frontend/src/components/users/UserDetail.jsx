import React from 'react'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Card } from 'react-bootstrap'

const UserDetail = ({ users }) => {
  const { id } = useParams()
  const user = users.find((item) => item.id === Number(id))

  if (user) {
    return (
      <Card>
        <Card.Header>
          <div className='d-flex justify-content-between'>
            <div><Link to={`/users/${user.id}`}>{user.username}</Link></div>
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
    )
  } else {
    return (
      <div><p>Нет пользователя с таким ID</p></div>
    )
  }
}
UserDetail.propTypes = {
  users: PropTypes.array
}

export default UserDetail

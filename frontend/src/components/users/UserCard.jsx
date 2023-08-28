import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function UserCard (props) {
  const user = props.user
  return (
    <Card className='h-100'>
      <Card.Header>
        <div className='d-flex justify-content-between'>
          <div>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
            {props.userIsI && ' (Вы)'}
          </div>
          <div>
            <Link className='pe-1 link-success'>
              <FontAwesomeIcon icon={faPenToSquare}
                onClick={() => props.setShowEditState(true)} />
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
}
UserCard.propTypes = {
  user: PropTypes.object,
  userIsI: PropTypes.bool,
  setShowEditState: PropTypes.func
}

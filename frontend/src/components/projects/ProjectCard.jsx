import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function ProjectCard (props) {
  const project = props.project

  const userNameById = (users, id) => {
    const user = users.find((user) => user.id === Number(id))
    return user ? user.username : 'пользователь не найден'
  }
  return (
    <Card className='h-100'>
      <Card.Header>
        <div className='d-flex justify-content-between'>
          <div>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          </div>
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
        <Card.Title className='text-capitalize'>{project.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {project.repository
            ? <Link to={project.repository}>{project.repository}</Link>
            : '<Нет репозитария проекта>'}
        </Card.Subtitle>
        <Card.Text as='div'>
          <div>Владелец проекта:</div>
          <Link to={`/users/${project.creatorId}`}>
            {userNameById(props.users, project.creatorId)}
          </Link>
          <div>Участники проекта:</div>
          {project.users.length
            ? project.users.map((id, index) =>
              <span key={id}>
                {index ? ', ' : ''}
                <Link key={id} to={`/users/${id}`}>
                  {userNameById(props.users, id)}
                </Link>
              </span>)
            : <div className="text-muted">&lt;нет участников проекта&gt;</div>}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
ProjectCard.propTypes = {
  project: PropTypes.object,
  users: PropTypes.array
}

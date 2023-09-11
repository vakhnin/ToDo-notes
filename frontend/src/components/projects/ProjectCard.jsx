import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

import { userNameById } from '../lib/usersUlils'

export default function ProjectCard (props) {
  const id = props.projectID
  const project = props.projects.find(todo => todo.id === id)

  if (!project) {
    return <div>Нет проекта с таким ID</div>
  }
  return (
    <Card className='h-100'>
      <Card.Header>
        <div className='d-flex justify-content-between'>
          <div>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          </div>
          <div>
            <Link className='pe-1 link-success' onClick={() => props.setShowEditState(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>
            <Link onClick={() => props.deleteProject(project.id)} className='ps-1 link-danger'>
              <FontAwesomeIcon icon={faTrash} />
            </Link>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title className='big-first-letter'>
          {project.name}
          <span className='text-warning'>{!project.isActive && ' (Проект неактивен)'}</span>
        </Card.Title>
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
  projectID: PropTypes.number,
  deleteProject: PropTypes.func,
  setShowEditState: PropTypes.func,
  projects: PropTypes.array,
  users: PropTypes.array
}

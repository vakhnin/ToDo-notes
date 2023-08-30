import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function ProjectCard (props) {
  const project = props.project
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
        <Card.Subtitle className="mb-2 text-muted">{project.repository}</Card.Subtitle>
      </Card.Body>
    </Card>
  )
}
ProjectCard.propTypes = {
  project: PropTypes.object
}

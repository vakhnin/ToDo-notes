import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Card, Col, Row } from 'react-bootstrap'

import ProjectCard from './ProjectCard'
import ProjectCreate from './ProjectCreate'
import ProjectUpdateCard from './ProjectUpdateCard'

const ProjectItem = props => {
  const [showEditState, setShowEditState] = useState(false)

  return (
    <>
      {showEditState
        ? <ProjectUpdateCard setShowEditState={setShowEditState} {...props} />
        : <ProjectCard setShowEditState={setShowEditState} {...props} />}
    </>
  )
}
ProjectItem.propTypes = {
  projectID: PropTypes.number,
  projects: PropTypes.array
}

const AddProjectItem = ({ setShowAddProjectState }) => {
  return (
    <Card className='h-100'>
      <Card.Header>
        <Link className='link-success'>Новый проект</Link>
      </Card.Header>
      <Card.Body className='h-100'>
        <Card.Text className='big-plus h-100 d-flex align-items-center justify-content-center'>
          <Link className='link-success  stretched-link'
            onClick={() => setShowAddProjectState(true)}>
            <FontAwesomeIcon icon={faCirclePlus} />
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
AddProjectItem.propTypes = {
  setShowAddProjectState: PropTypes.func
}

const ProjectList = props => {
  const [showAddProjectState, setShowAddProjectState] = useState(false)
  return (
    <Row>
      <Col className='pb-3 align-self-stretch' md={6} lg={4} xl={3}>
        {showAddProjectState
          ? <ProjectCreate setShowAddProjectState={setShowAddProjectState} {...props} />
          : <AddProjectItem setShowAddProjectState={setShowAddProjectState} />}
      </Col>
      {props.projects.map((project) =>
        (project.isActive || props.showNotActiveState) &&
        <Col key={project.id} className='pb-3 align-self-stretch' md={6} lg={4} xl={3}>
          <ProjectItem projectID={project.id} {...props} />
        </Col>)}
    </Row>
  )
}
ProjectList.propTypes = {
  projects: PropTypes.array,
  showNotActiveState: PropTypes.bool
}

export default ProjectList

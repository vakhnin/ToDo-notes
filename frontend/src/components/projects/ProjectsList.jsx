import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'

import ProjectCard from './ProjectCard'

const ProjectItem = props => {
  const id = props.projectID
  const project = props.projects.find(user => user.id === id)

  return (
    <Col className='pb-3 align-self-stretch' md={6} lg={4} xl={3}>
      <ProjectCard project={project} />
    </Col>
  )
}
ProjectItem.propTypes = {
  projectID: PropTypes.number,
  projects: PropTypes.array
}

const ProjectList = props => {
  return (
    <Row>
      {props.projects.map((project) =>
        <ProjectItem key={project.id} projectID={project.id} {...props} />)}
    </Row>
  )
}
ProjectList.propTypes = {
  projects: PropTypes.array
}

export default ProjectList

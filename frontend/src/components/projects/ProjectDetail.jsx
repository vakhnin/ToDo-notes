import React from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import ProjectCard from './ProjectCard'

const ProjectDetail = props => {
  const { id } = useParams()
  const project = props.projects.find((item) => item.id === Number(id))

  if (project) {
    return (
      <ProjectCard project={project} {...props} />
    )
  } else {
    return (
      <div>Нет проекта с таким ID</div>
    )
  }
}
ProjectDetail.propTypes = {
  projects: PropTypes.array
}

export default ProjectDetail

import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

import { RESTAPI } from '../Settings'
import ProjectList from './ProjectsList'
import ProjectDetail from './ProjectDetail'

const Projects = props => {
  const deleteProject = projectId => {
    const id = Number(projectId)
    RESTAPI.patch(`projects/${id}/`, { isActive: false })
      .then(response => {
        props.setProjectsState(
          props.projects.map(item => {
            return item.id === id ? response.data : item
          }))
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <Routes>
      <Route index element={
        <div>
          <h2 className='py-3'>Проекты</h2>
          <ProjectList deleteProject={deleteProject} {...props} />
        </div>} />
      <Route path=":id" element={
        <div>
          <h2 className='py-3'>Детальная информация о проекте</h2>
          <h5 className='pb-3'>
            <Link to={'/projects'}>
              <FontAwesomeIcon className='normal-size-icon pe-2' icon={faArrowLeftLong} />
              К списку проектов
            </Link>
          </h5>
          <ProjectDetail deleteProject={deleteProject} {...props} />
        </div>} />
    </Routes>
  )
}
Projects.propTypes = {
  projects: PropTypes.array,
  setProjectsState: PropTypes.func
}

export default Projects

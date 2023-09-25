import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'

import { RESTAPI } from '../Settings'
import ProjectList from './ProjectsList'
import ProjectDetail from './ProjectDetail'

const Projects = props => {
  const [showNotActiveState, setShowNotActiveState] = useState(false)

  const toggleShowNotActiveState = () => {
    setShowNotActiveState(!showNotActiveState)
  }

  const checkAccessProjectAndDoAction = (project, action) => {
    const user = props.users.find(user => user.id === props.currentUserID)
    if (!user) {
      props.setAccessModalShow(true)
    } else if (user.isStaff || project.creatorId === user.id) {
      action()
    } else { props.setAccessModalShow(true) }
  }

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
          <Form.Group className="mb-3" controlId="loginForm.ControlInput1" >
            <Form.Check type="switch" label="Показать неактивные проекты"
              onClick={() => toggleShowNotActiveState()} />
          </Form.Group>
          <ProjectList showNotActiveState={showNotActiveState} deleteProject={deleteProject}
            checkAccessProjectAndDoAction={checkAccessProjectAndDoAction} {...props} />
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
          <ProjectDetail deleteProject={deleteProject} checkAccessProjectAndDoAction={checkAccessProjectAndDoAction}
            {...props} />
        </div>} />
    </Routes>
  )
}
Projects.propTypes = {
  users: PropTypes.array,
  projects: PropTypes.array,
  currentUserID: PropTypes.number,
  setProjectsState: PropTypes.func,
  setAccessModalShow: PropTypes.func
}

export default Projects

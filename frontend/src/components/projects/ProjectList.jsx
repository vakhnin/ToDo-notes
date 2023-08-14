import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { RESTAPI } from '../Settings'
import ProjectUpdateModal from './ProjectUpdateModal'

const ProjectItem = ({ project, deleteProject, showUpdateModal }) => {
  return (
    <tr>
      <td><Link to={`/projects/${project.id}`}>{project.id}</Link></td>
      <td>{project.name}</td>
      <td>{project.repository}</td>
      <td><Link onClick={() => showUpdateModal(project.id)}>Редактировать</Link></td>
      <td>
        <button onClick={deleteProject} type='button'>Delete</button>
      </td>
    </tr>
  )
}
ProjectItem.propTypes = {
  project: PropTypes.object,
  deleteProject: PropTypes.func,
  showUpdateModal: PropTypes.func
}

const ProjectList = props => {
  const [modalUpdateShow, setModalUpdateShow] = useState(false)
  const [projectID, setProjectID] = useState(0)

  const showUpdateModal = id => {
    setProjectID(id)
    setModalUpdateShow(true)
  }

  const deleteProject = id => {
    RESTAPI.delete(`projects/${id}/`)
      .then(response => {
        props.setProjectsState(props.projects.filter((item) => item.id !== id))
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Project name</th>
            <th>Repository</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.projects.map((project) => <ProjectItem key={project.id} project={project}
            deleteProject={() => deleteProject(project.id)} showUpdateModal={showUpdateModal} />)}
        </tbody>
      </table>
      <ProjectUpdateModal {...props} projectID={projectID} show={modalUpdateShow} setModalShow={setModalUpdateShow} />
    </>
  )
}
ProjectList.propTypes = {
  projects: PropTypes.array,
  setProjectsState: PropTypes.func
}

export default ProjectList

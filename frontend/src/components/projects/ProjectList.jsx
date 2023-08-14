import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { RESTAPI } from '../Settings'
import ProjectUpdateModal from './ProjectUpdateModal'

const ProjectItem = ({ project, handleClickDelete, handleClickUpdate }) => {
  return (
    <tr>
      <td><Link to={`/projects/${project.id}`}>{project.id}</Link></td>
      <td>{project.name}</td>
      <td>{project.repository}</td>
      <td><Link data-index={project.id} onClick={handleClickUpdate}>Редактировать</Link></td>
      <td>
        <button data-index={project.id} onClick={handleClickDelete} type='button'>Delete</button>
      </td>
    </tr>
  )
}
ProjectItem.propTypes = {
  project: PropTypes.object,
  handleClickDelete: PropTypes.func,
  handleClickUpdate: PropTypes.func
}

const ProjectList = props => {
  const [projectID, setProjectID] = useState(0)

  const handleClickUpdate = event => {
    const id = Number(event.target.dataset.index)
    setProjectID(id)
  }

  const handleClickDelete = event => {
    const id = Number(event.target.dataset.index)
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
            handleClickDelete={handleClickDelete} handleClickUpdate={handleClickUpdate} />)}
        </tbody>
      </table>
      <ProjectUpdateModal {...props} projectID={projectID} setProjectID={setProjectID} />
    </>
  )
}
ProjectList.propTypes = {
  projects: PropTypes.array,
  setProjectsState: PropTypes.func
}

export default ProjectList

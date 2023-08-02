import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProjectItem = ({ project, deleteProject }) => {
  return (
        <tr>
            <td><Link to={`/project/${project.id}`}>{project.id}</Link></td>
            <td>{project.name}</td>
            <td>{project.repository}</td>
            <td><Link to={`/projects/update/${project.id}`}>Редактировать</Link></td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
  )
}
ProjectItem.propTypes = {
  project: PropTypes.object,
  deleteProject: PropTypes.func
}

const ProjectList = ({ projects, deleteProject }) => {
  return (
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
                {projects.map((project) => <ProjectItem key={project.id} project={project}
                    deleteProject={deleteProject} />)}
            </tbody>
        </table>
  )
}
ProjectList.propTypes = {
  projects: PropTypes.array,
  deleteProject: PropTypes.func
}

export default ProjectList

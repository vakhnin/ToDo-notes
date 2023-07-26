import React from 'react'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProjectItem = ({ project, deleteProject }) => {
  return (
        <tr>
            <td><Link to={`/project/${project.id}`}>{project.id}</Link></td>
            <td>{project.name}</td>
            <td>{project.repository}</td>
            <td><Link to={`/project/update/${project.id}`}>Редактировать</Link></td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
  )
}
ProjectItem.propTypes = {
  project: PropTypes.string,
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
                {projects.map((project) => <ProjectItem key={project.id}
                    delete_project={deleteProject} project={project} />)}
            </tbody>
        </table>
  )
}
ProjectList.propTypes = {
  projects: PropTypes.array,
  deleteProject: PropTypes.func
}

const ProjectUserItem = ({ item }) => {
  return (
        <li>{item}</li>
  )
}
ProjectUserItem.propTypes = {
  item: PropTypes.string
}

const ProjectDetail = ({ projects }) => {
  const { id } = useParams()
  const project = projects.find((item) => item.id === Number(id))

  if (project) {
    return (
            <div>
                <p>Название проекта: {project.name}</p>
                <p>Repository: <a href={project.repository}>{project.repository}</a></p>
                <p>Users:</p>
                <ol>
                    {project.users.map((user) => <ProjectUserItem key={user} item={user} />)}
                </ol>
            </div>
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

export { ProjectList, ProjectDetail }

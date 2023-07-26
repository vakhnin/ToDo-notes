import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

import { getUrl } from '../Settings'

const ProjectItem = ({ project, deleteProjectAndUpdateProjetsState }) => {
  function deleteProject (id) {
    deleteProjectAndUpdateProjetsState(id)
  }
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
  project: PropTypes.object,
  deleteProjectAndUpdateProjetsState: PropTypes.func
}

class ProjectList extends React.Component {
  constructor (props) {
    super(props)
    this.get_headers = this.props.get_headers
    this.state = {
      projects: []
    }
  }

  deleteProjectAndUpdateProjetsState = (id) => {
    const headers = this.get_headers()
    axios.delete(getUrl(`projects/${id}/`), { headers })
      .then(response => {
        this.load_projects()
      }).catch(error => {
        console.log(error)
        this.setState({ projects: [] })
      })
  }

  load_projects () {
    const headers = this.headers

    axios.get(getUrl('projects/'), { headers })
      .then(response => {
        const projects = response.data.results
        this.setState({ projects })
      }).catch(error => console.log(error))
  }

  componentDidMount () {
    this.load_projects()
  }

  render () {
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
                {this.state.projects.map((project) => <ProjectItem key={project.id} project={project}
                  deleteProjectAndUpdateProjetsState={this.deleteProjectAndUpdateProjetsState} />)}
            </tbody>
        </table>
    )
  }
}
ProjectList.propTypes = {
  get_headers: PropTypes.func
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

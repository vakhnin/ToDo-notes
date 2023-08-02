import React from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

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

export default ProjectDetail

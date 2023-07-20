import React from 'react'
import { Link, useParams } from 'react-router-dom'

const ProjectItem = ({ project, delete_project }) => {
    return (
        <tr>
            <td><Link to={`/project/${project.id}`}>{project.id}</Link></td>
            <td>{project.name}</td>
            <td>{project.repository}</td>
            <td><Link to={`/project/update/${project.id}`}>Редактировать</Link></td>
            <td>
                <button onClick={() => delete_project(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({ projects, delete_project }) => {
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
                    delete_project={delete_project} project={project} />)}
            </tbody>
        </table>
    )
}

const ProjectUserItem = ({ item }) => {
    return (
        <li>{item}</li>
    )
}

const ProjectDetail = ({ projects }) => {
    let { id } = useParams();
    let project = projects.find((item) => item.id === Number(id))

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

export { ProjectList, ProjectDetail }

import React from 'react'

const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repository}</td>
        </tr>
    )
}

const ProjectList = ({ projects }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Project name</th>
                    <th>Repository</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem key={project.id} project={project} />)}
            </tbody>
        </table>
    )
}

export default ProjectList

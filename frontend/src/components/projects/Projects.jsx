import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import ProjectCreationForm from './ProjectCreationForm'
import ProjectList from './ProjectList'
import ProjectDetail from './ProjectDetail'
import ProjectUpdateFormWrapper from './ProjectUpdateForm'

const Projects = props => {
  return (
    <Routes>
      <Route index element={
        <div>
          <h2>Проекты</h2>
          <Link to='/projects/create'>Создать проект</Link>
          <ProjectList {...props} />
        </div>} />
      <Route path='create' element={
        <div>
          <h2>Создание проекта</h2>
          <ProjectCreationForm {...props} />
        </div>} />
      <Route path=":id" element={
        <div>
          <h2>Детальная информация о проекте</h2>
          <ProjectDetail {...props} />
        </div>} />
      <Route path="update/:id" element={
        <div>
          <h2>Редактирование информации о проекте</h2>
          <ProjectUpdateFormWrapper {...props} />
        </div>} />
    </Routes>
  )
}

export default Projects

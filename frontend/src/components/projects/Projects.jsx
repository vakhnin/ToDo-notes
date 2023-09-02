import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

import ProjectList from './ProjectsList'
import ProjectDetail from './ProjectDetail'

const Projects = props => {
  return (
    <Routes>
      <Route index element={
        <div>
          <h2 className='py-3'>Проекты</h2>
          <ProjectList {...props} />
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
          <ProjectDetail {...props} />
        </div>} />
    </Routes>
  )
}

export default Projects

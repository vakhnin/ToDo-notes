import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ProjectList from './ProjectList'
import ProjectDetail from './ProjectDetail'
import ProjectCreateModal from './ProjectCreateModal'

const Projects = props => {
  const [modalCreateShow, setModalCreateShow] = useState(false)
  return (
    <>
    <Routes>
      <Route index element={
        <div>
          <h2>Проекты</h2>
          <Link onClick={() => setModalCreateShow(true)}>Создать проект</Link>
          <ProjectList {...props} />
        </div>} />
      <Route path=":id" element={
        <div>
          <h2>Детальная информация о проекте</h2>
          <ProjectDetail {...props} />
        </div>} />
    </Routes>
    <ProjectCreateModal {...props} show={modalCreateShow} setModalShow={setModalCreateShow}/>
    </>
  )
}
Projects.propTypes = {
  users: PropTypes.array,
  setProjectsState: PropTypes.func
}

export default Projects

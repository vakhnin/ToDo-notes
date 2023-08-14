import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import ToDoList from './ToDoList'
import ToDoCreateModal from './ToDoCreateModal'

const ToDos = props => {
  const [modalCreateShow, setModalCreateShow] = useState(false)
  return (
    <>
      <Routes>
        <Route index element={
          <div>
            <h2>ToDos</h2>
            <Link onClick={() => setModalCreateShow(true)}>Создать ToDo</Link>
            <ToDoList {...props} />
          </div>} />
      </Routes>
      <ToDoCreateModal {...props} show={modalCreateShow} setModalShow={setModalCreateShow} />
    </>
  )
}

export default ToDos

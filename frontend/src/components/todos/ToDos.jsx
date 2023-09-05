import React from 'react'
import { Routes, Route } from 'react-router-dom'

import ToDoList from './ToDoList'

const ToDos = props => {
  return (
    <Routes>
      <Route index element={
        <div>
          <h2 className='py-3'>ToDos</h2>
          <ToDoList {...props} />
        </div>} />
    </Routes>
  )
}

export default ToDos

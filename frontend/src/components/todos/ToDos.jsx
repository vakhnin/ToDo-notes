import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ToDoList from './ToDoList'
import ToDoCreateForm from './ToDoCreateForm'

const ToDos = props => {
  return (
    <Routes>
      <Route index element={
        <div>
          <h2>ToDos</h2>
          <Link to='/todos/create'>Создать ToDo</Link>
          <ToDoList {...props} />
        </div> }/>
      <Route path='create' element={
        <div>
          <h2>Создание ToDo</h2>
          <ToDoCreateForm {...props} />
        </div>} />
    </Routes>
  )
}

export default ToDos

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { RESTAPI } from '../Settings'
import ToDoList from './ToDoList'

const ToDos = props => {
  const deleteToDo = ToDoId => {
    const id = Number(ToDoId)
    RESTAPI.patch(`todos/${id}/`, { isActive: false })
      .then(response => {
        props.setTodosState(
          props.todos.map(item => {
            return item.id === id ? response.data : item
          }))
      }).catch(error => {
        console.log(error)
      })
  }
  return (
    <Routes>
      <Route index element={
        <div>
          <h2 className='py-3'>ToDos</h2>
          <ToDoList deleteToDo={deleteToDo} {...props} />
        </div>} />
    </Routes>
  )
}
ToDos.propTypes = {
  todos: PropTypes.array,
  setTodosState: PropTypes.func
}

export default ToDos

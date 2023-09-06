import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

import { RESTAPI } from '../Settings'
import ToDoList from './ToDoList'
import ToDoDetail from './ToDoDetail'

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
      <Route path=":id" element={
        <div>
          <h2 className='py-3'>Детальная информация о ToDo</h2>
          <h5 className='pb-3'>
            <Link to={'/todos'}>
              <FontAwesomeIcon className='normal-size-icon pe-2' icon={faArrowLeftLong} />
              К списку ToDo
            </Link>
          </h5>
          <ToDoDetail deleteToDo={deleteToDo} {...props} />
        </div>} />
    </Routes>
  )
}
ToDos.propTypes = {
  todos: PropTypes.array,
  setTodosState: PropTypes.func
}

export default ToDos

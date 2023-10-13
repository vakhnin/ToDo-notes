import React, { useState } from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap'

import { RESTAPI } from '../Settings'
import { projectNameById } from '../lib/utils'
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
  const ToDosListBase = props => {
    const [showNotActiveState, setShowNotActiveState] = useState(false)
    const toggleShowNotActiveState = () => {
      setShowNotActiveState(!showNotActiveState)
    }

    const { id } = useParams()
    let pageHeader = 'Все ToDos'
    if (props.todosFilter === 'project') {
      pageHeader = <>
        {'ToDos проекта '}
        <Link to={`/projects/${id}`}>
          {projectNameById(props.projects, id)}
        </Link>
      </>
    }
    return (
      <>
        <h2 className='py-3'>{pageHeader}</h2>
        <Form.Group className="mb-3" controlId="todosList.ControlInput1" >
          <Form.Check type="switch" label="Показать неактивные ToDos"
            onClick={() => toggleShowNotActiveState()} />
        </Form.Group>
        <ToDoList projectId={Number(id)} showNotActiveState={showNotActiveState} deleteToDo={deleteToDo}
          {...props} />
      </>
    )
  }
  ToDosListBase.propTypes = {
    todosFilter: PropTypes.string
  }

  return (
    <Routes>
      <Route index element={
        <ToDosListBase todosFilter={'all'} {...props} />} />
      <Route path="project/:id" element={
        <ToDosListBase todosFilter={'project'} {...props} />} />
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
  projects: PropTypes.array,
  todos: PropTypes.array,
  setTodosState: PropTypes.func
}

export default ToDos

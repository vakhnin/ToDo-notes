import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

import { userNameById, projectNameById } from '../lib/utils'

export default function ToDoCard (props) {
  const id = props.todoID
  const todo = props.todos.find(todo => todo.id === id)

  if (!todo) {
    return <div>Нет ToDo с таким ID</div>
  }
  return (
    <Card className='h-100'>
      <Card.Header>
        <div className='d-flex justify-content-between'>
          <div className='d-inline-block text-truncate'>
            <Link to={`/todos/${todo.id}`}>{todo.name}</Link>
          </div>
          <div className='d-flex flex-nowrap'>
            <Link className='pe-1 link-success' onClick={() => props.setShowEditState(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>
            <Link onClick={() => props.deleteToDo(todo.id)} className='ps-1 link-danger'>
              <FontAwesomeIcon icon={faTrash} />
            </Link>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title className='big-first-letter'>
          {todo.name}
          <span className='text-warning'>{!todo.isActive && ' (ToDo неактивно)'}</span>
        </Card.Title>
        <Card.Text as='div'>
          <div>Текст ToDo:</div>
          <Card className='todo-text'>{todo.text}</Card>
          <div>Проект:</div>
          <Link to={`/projects/${todo.project}`}>
            {projectNameById(props.projects, todo.project)}
          </Link>
          <div>Создатель ToDo:</div>
          <Link to={`/users/${todo.creatorId}`}>
            {userNameById(props.users, todo.creatorId)}
          </Link>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <div>Создано: {todo.created}</div>
        <div>Изменено: {todo.updated}</div>
      </Card.Footer>
    </Card>
  )
}
ToDoCard.propTypes = {
  todoID: PropTypes.number,
  users: PropTypes.array,
  projects: PropTypes.array,
  todos: PropTypes.array,
  deleteToDo: PropTypes.func,
  setShowEditState: PropTypes.func
}

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

import { userNameById } from '../lib/users_ulils'

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
          <div>
            <Link to={`/todos/${todo.id}`}>{todo.name}</Link>
          </div>
          <div>
            {/* <Link className='pe-1 link-success' onClick={() => props.setShowEditState(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>
            <Link onClick={() => props.deleteProject(project.id)} className='ps-1 link-danger'>
              <FontAwesomeIcon icon={faTrash} />
            </Link> */}
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title className='text-capitalize'>{todo.name}</Card.Title>
        <Card.Text as='div'>
          <div>Создатель ToDo:</div>
          <Link to={`/users/${todo.creatorId}`}>
            {userNameById(props.users, todo.creatorId)}
          </Link>
          <p>Текст ToDo</p>
          <p>{todo.text}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
ToDoCard.propTypes = {
  todoID: PropTypes.number,
  todos: PropTypes.array,
  users: PropTypes.array
}

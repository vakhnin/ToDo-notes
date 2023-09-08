import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Card, Form } from 'react-bootstrap'

import { RESTAPI } from '../Settings'

const ToDoUpdate = props => {
  const id = props.todoID
  const todo = props.todos.find(todo => todo.id === id)

  if (!todo) {
    return <div>Нет ToDo с таким ID</div>
  }

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: todo.name,
      text: todo.text,
      isActive: todo.isActive
    }
  })

  const updateToDo = data => {
    RESTAPI.patch(`todos/${id}/`, data)
      .then(response => {
        props.setTodosState(
          props.todos.map(item => {
            return item.id === id ? response.data : item
          }))
        props.setShowEditState(false)
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <Card className='h-100'>
      <Card.Header>
        <div className='d-flex justify-content-between'>
          <div>
            <Link to={`/todos/${id}`}>{todo.name}</Link>
          </div>
          <div>
            <Link className='pe-1 link-success'>
              <FontAwesomeIcon icon={faCheck} onClick={handleSubmit(updateToDo)} />
            </Link>
            <Link className='ps-1 link-danger'>
              <FontAwesomeIcon icon={faXmark} onClick={() => props.setShowEditState(false)} />
            </Link>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3 d-inline-block" controlId="loginForm.ControlInput3">
            <Form.Check type="switch" label="ToDo активен" reverse {...register('isActive')} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
            <Form.Label>Название ToDo</Form.Label>
            <Form.Control type="text" placeholder="Название ToDo" {...register('name')} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput2">
            <Form.Label>Текст ToDo</Form.Label>
            <Form.Control as="textarea" placeholder="Текст ToDo" {...register('text')} />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}
ToDoUpdate.propTypes = {
  todoID: PropTypes.number,
  setShowEditState: PropTypes.func,
  todos: PropTypes.array,
  setTodosState: PropTypes.func
}

export default ToDoUpdate

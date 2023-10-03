import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
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

  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm({
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
        if (!error) {
          setServerError('Неизвестная ошибка. Обратитесь к разработчику')
          return
        }
        if (error.response.data &&
          error.response.data.nonFieldErrors[0].includes('The fields project, name must make a unique set')) {
          setServerError('В проекте уже существует ToDo с таким названием')
        } else {
          setServerError('Неизвестная ошибка сервера. Обратитесь к разработчику')
        }
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
        <div className='text-danger'>{serverError}</div>
        <Form>
          <Form.Group className="mb-3 d-inline-block" controlId="toDoForm.ControlInput1">
            <Form.Check type="switch" label="ToDo активен" reverse {...register('isActive')} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="toDoForm.ControlInput2">
            <Form.Label>Название ToDo</Form.Label>
            <Form.Control type="text" placeholder="Название ToDo"
              {...register('name', { required: 'Поле "Название ToDo" не может быть пустым' })} />
            <ErrorMessage errors={errors} name="name"
              render={({ message }) => <div className='text-danger'>{message}</div>} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="toDoForm.ControlInput3">
            <Form.Label>Текст ToDo</Form.Label>
            <Form.Control as="textarea" placeholder="Текст ToDo"
              {...register('text', { required: 'Поле "Текст ToDo" не может быть пустым' })} />
            <ErrorMessage errors={errors} name="text"
              render={({ message }) => <div className='text-danger'>{message}</div>} />
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

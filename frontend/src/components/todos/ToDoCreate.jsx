import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import { RESTAPI } from '../Settings'
import Form from 'react-bootstrap/Form'

export default function ProjectCreate (props) {
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      project: 0,
      name: '',
      text: ''
    }
  })

  const existsProjectsForUser = () => {
    const user = props.users.find(user => user.id === props.currentUserID)
    if (!user) return false
    if (user.isStaff) return true
    if (props.projects.find(project =>
      project.isActive &&
      (project.creatorId === user.id || project.users.includes(user.id)))) {
      return true
    }
    return false
  }

  const checkUserInProject = project => {
    if (!project.isActive) return false
    const user = props.users.find(user => user.id === props.currentUserID)
    if (!user) return false
    if (user.isStaff) return true
    if (project.creatorId === user.id) return true
    if (project.users.includes(user.id)) return true
    return false
  }

  const createToDo = data => {
    RESTAPI.post('todos/', data)
      .then(response => {
        props.setTodosState([response.data, ...props.todos])
        props.setShowAddProjectState(false)
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
          <div>Новое ToDo</div>
          <div>
            <Link className='pe-1 link-success'>
              <FontAwesomeIcon icon={faCheck}
                onClick={handleSubmit(createToDo)} />
            </Link>
            <Link className='ps-1 link-danger'>
              <FontAwesomeIcon icon={faXmark}
                onClick={() => props.setShowAddProjectState(false)} />
            </Link>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <div className='text-danger'>{serverError}</div>
        <Form>
          {existsProjectsForUser()
            ? <>
              <Form.Group className="mb-3" controlId="toDoForm.ControlInput1">
                <Form.Label>Выбор проекта</Form.Label>
                <Form.Select
                  {...register('project', { required: 'Проект должен быть выбран' })}>
                  {props.projects
                    .filter(project => checkUserInProject(project))
                    .map(project =>
                      <option value={project.id} key={project.id}>{project.name}</option>)}
                </Form.Select>
                <ErrorMessage errors={errors} name="project"
                  render={({ message }) => <div className='text-danger'>{message}</div>} />
              </Form.Group>
            </>
            : <div className='text-danger'>
              У Вас нет проекта созданного Вами или участником которого Вы являетесь.
              Вы не можете создать ToDo.
            </div>}
          <Form.Group className="mb-3" controlId="toDoForm.ControlInput2">
            <Form.Label>Название ToDo</Form.Label>
            <Form.Control type="text" placeholder="Название ToDo"
              {...register('name', { required: 'Поле "Название ToDo" не может быть пустым' })} />
            <ErrorMessage errors={errors} name="name"
              render={({ message }) => <div className='text-danger'>{message}</div>} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="toDoForm.ControlInput3">
            <Form.Label>ToDo текст</Form.Label>
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
ProjectCreate.propTypes = {
  currentUserID: PropTypes.number,
  users: PropTypes.array,
  projects: PropTypes.array,
  todos: PropTypes.array,
  setTodosState: PropTypes.func,
  setShowAddProjectState: PropTypes.func
}

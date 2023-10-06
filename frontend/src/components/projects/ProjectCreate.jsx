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
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      repository: '',
      users: []
    }
  })

  const createProject = data => {
    RESTAPI.post('projects/', data)
      .then(response => {
        props.setProjectsState([response.data, ...props.projects])
        props.setShowAddProjectState(false)
      }).catch(error => {
        if (!error) {
          setServerError('Неизвестная ошибка. Обратитесь к разработчику')
          return
        }
        if (error.response.data.name &&
          error.response.data.name.includes('project with this name already exists.')) {
          setServerError('Проект с таким названием уже существует')
        } else if (error.response.data.repository.includes('Enter a valid URL.')) {
          setError('repository', {
            type: 'custom',
            message: 'Поле "Репозитарий" должно  являться URL'
          })
        } else {
          setServerError('Неизвестная ошибка сервера. Обратитесь к разработчику')
        }
      })
  }

  return (
    <Card className='h-100'>
      <Card.Header>
        <div className='d-flex justify-content-between'>
          <div>Новый проект</div>
          <div>
            <Link className='pe-1 link-success'>
              <FontAwesomeIcon icon={faCheck}
                onClick={handleSubmit(createProject)} />
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
          <Form.Group className="mb-3" controlId="projectForm.ControlInput1">
            <Form.Label>Название проекта</Form.Label>
            <Form.Control type="text" placeholder="Название проекта"
              {...register('name', {
                maxLength: { value: 32, message: 'Поле "Название ToDo" не может быть длиннее 32 символов' },
                required: 'Поле "Название проекта" не может быть пустым'
              })} />
            <ErrorMessage errors={errors} name="name"
              render={({ message }) => <div className='text-danger'>{message}</div>} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectForm.ControlInput2">
            <Form.Label>Репозитарий</Form.Label>
            <Form.Control type="text" placeholder="http://repository.com"
              {...register('repository', {
                maxLength: { value: 200, message: 'Поле "Репозитарий" не может быть длиннее 200 символов' }
              })} />
            <ErrorMessage errors={errors} name="repository"
              render={({ message }) => <div className='text-danger'>{message}</div>} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginForm.ControlSelect1">
            <Form.Label>Участники проекта</Form.Label>
            <Form.Select multiple {...register('users')}>
              {props.users.map((user) =>
                <option value={user.id} key={user.id}>{user.username}</option>)}
            </Form.Select>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}
ProjectCreate.propTypes = {
  users: PropTypes.array,
  currentUserID: PropTypes.number,
  projects: PropTypes.array,
  setProjectsState: PropTypes.func,
  setShowAddProjectState: PropTypes.func
}

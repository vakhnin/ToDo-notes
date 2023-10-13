import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Card, Form } from 'react-bootstrap'

import { RESTAPI } from '../Settings'

const ProjectUpdate = props => {
  const id = props.projectID
  const project = props.projects.find(project => project.id === id)

  if (!project) {
    return <div>Нет проекта с таким ID</div>
  }

  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: {
      name: project.name,
      repository: project.repository,
      users: project.users.map(id => String(id)),
      isActive: project.isActive
    }
  })

  const updateProject = data => {
    RESTAPI.patch(`projects/${id}/`, data)
      .then(response => {
        props.setProjectsState(
          props.projects.map(item => {
            return item.id === id ? response.data : item
          }))
        props.setShowEditState(false)
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
          <div className='d-inline-block text-truncate'>
            <Link to={`/projects/${id}`}>{project.name}</Link>
          </div>
          <div className='d-flex flex-nowrap'>
            <Link className='pe-1 link-success'>
              <FontAwesomeIcon icon={faCheck} onClick={handleSubmit(updateProject)} />
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
          <Form.Group className="mb-3 d-inline-block" controlId="projectForm.ControlInput1">
            <Form.Check type="switch" label="Проект активен" reverse {...register('isActive')} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectForm.ControlInput2">
            <Form.Label>Название проекта</Form.Label>
            <Form.Control type="text" placeholder="Название проекта"
              {...register('name', {
                maxLength: { value: 32, message: 'Поле "Название проекта" не может быть длиннее 32 символов' },
                required: 'Поле "Название проекта" не может быть пустым'
              })} />
            <ErrorMessage errors={errors} name="name"
              render={({ message }) => <div className='text-danger'>{message}</div>} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectForm.ControlInput3">
            <Form.Label>Репозитарий</Form.Label>
            <Form.Control type="text" placeholder="http://repository.com"
              {...register('repository', {
                maxLength: { value: 200, message: 'Поле "Репозитарий" не может быть длиннее 200 символов' }
              })} />
            <ErrorMessage errors={errors} name="repository"
              render={({ message }) => <div className='text-danger'>{message}</div>} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="projectForm.ControlSelect1">
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
ProjectUpdate.propTypes = {
  projectID: PropTypes.number,
  setShowEditState: PropTypes.func,
  projects: PropTypes.array,
  users: PropTypes.array,
  setProjectsState: PropTypes.func
}

export default ProjectUpdate

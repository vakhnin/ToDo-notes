import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'

import { RESTAPI } from '../Settings'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function ProjectCreateModal (props) {
  const [error, setError] = useState('')
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      repository: '',
      users: []
    }
  })

  const createProject = data => {
    const newProject = {
      name: data.name,
      repository: data.repository,
      users: data.users
    }
    RESTAPI.post('projects/', newProject)
      .then(response => {
        newProject.id = response.data.id
        props.setProjectsState([...props.projects, newProject])
        setError('')
        props.setModalShow(false)
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <Modal show={props.show} onHide={() => props.setModalShow(false)}
      onShow={() => { setError(''); reset() }}>
      <Modal.Header closeButton>
        <Modal.Title>Создание проекта</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='text-danger'>{error}</div>
        <Form>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
            <Form.Label>Название проекта</Form.Label>
            <Form.Control type="text" placeholder="Название проекта" {...register('name')} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput2">
            <Form.Label>Репозитарий</Form.Label>
            <Form.Control type="text" placeholder="http://repository.com" {...register('repository')} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginForm.ControlSelect1">
            <Form.Label>Исполнители</Form.Label>
            <Form.Select multiple {...register('users')}>
              {props.users.map((user) =>
                <option value={user.url} key={user.url}>{user.firstName}</option>)}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => reset()}>
          Очистить
        </Button>
        <Button variant="primary" onClick={handleSubmit(createProject)}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>)
}
ProjectCreateModal.propTypes = {
  show: PropTypes.bool,
  users: PropTypes.array,
  projects: PropTypes.array,
  setModalShow: PropTypes.func,
  setProjectsState: PropTypes.func
}

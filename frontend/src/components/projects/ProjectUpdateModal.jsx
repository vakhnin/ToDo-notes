import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'

import { RESTAPI } from '../Settings'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function ProjectUpdateModal (props) {
  let project = {}
  const [error, setError] = useState('')
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      repository: '',
      users: []
    }
  })

  const reset = () => {
    setValue('name', project.name)
    setValue('repository', project.repository)
    setValue('users', project.users)
  }

  if (props.projectID) {
    project = props.projects
      .find((project) => project.id === props.projectID)
  }

  const updateProject = data => {
    RESTAPI.patch(`projects/${props.projectID}/`, data)
      .then(response => {
        props.setProjectsState(
          props.projects.map(item => {
            if (item.id === props.projectID) { return project } else { return item }
          }))
        props.setProjectID(0)
      }).catch(error => {
        console.log(error)
      })
  }
  return (
    <Modal show={props.projectID} onHide={() => props.setProjectID(0)}
      onShow={() => { setError(''); reset() }}>
      <Modal.Header closeButton>
        <Modal.Title>Измение проекта</Modal.Title>
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
            <Form.Label>Участники проекта</Form.Label>
            <Form.Select multiple {...register('users')}>
              {props.users.map((user) =>
                <option value={user.url} key={user.url}>{user.firstName}</option>)}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => reset()}>
          Сбросить
        </Button>
        <Button variant="primary" onClick={handleSubmit(updateProject)}>
          Изменить
        </Button>
      </Modal.Footer>
    </Modal>)
}
ProjectUpdateModal.propTypes = {
  users: PropTypes.array,
  projectID: PropTypes.number,
  projects: PropTypes.array,
  setProjectID: PropTypes.func,
  setProjectsState: PropTypes.func
}

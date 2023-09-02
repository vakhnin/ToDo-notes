import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import { RESTAPI } from '../Settings'
import Form from 'react-bootstrap/Form'

export default function ProjectCreate (props) {
  const [error] = useState('')
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      repository: '',
      users: []
    }
  })

  const createProject = data => {
    RESTAPI.post('projects/', data)
      .then(response => {
        data.id = response.data.id
        data.creatorId = props.currentUserID
        props.setProjectsState([data, ...props.projects])
        props.setShowAddProjectState(false)
      }).catch(error => {
        console.log(error)
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
                <option value={user.id} key={user.id}>{user.firstName}</option>)}
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

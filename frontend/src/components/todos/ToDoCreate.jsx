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
      project: 0,
      name: '',
      text: ''
    }
  })

  const createToDo = data => {
    RESTAPI.post('todos/', data)
      .then(response => {
        props.setTodosState([response.data, ...props.todos])
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
        <div className='text-danger'>{error}</div>
        <Form>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
            <Form.Label>Выбор проекта</Form.Label>
            <Form.Select {...register('project')}>
              <option value={0} key={0}>--- Выбирите проект ---</option>
              {props.projects.map((project) =>
                <option value={project.id} key={project.id}>{project.name}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput2">
            <Form.Label>Название ToDo</Form.Label>
            <Form.Control type="text" placeholder="Название ToDo" {...register('name')} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput3">
            <Form.Label>ToDo текст</Form.Label>
            <Form.Control as="textarea" placeholder="Текст ToDo" {...register('text')} />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  )
}
ProjectCreate.propTypes = {
  projects: PropTypes.array,
  todos: PropTypes.array,
  setTodosState: PropTypes.func,
  setShowAddProjectState: PropTypes.func
}

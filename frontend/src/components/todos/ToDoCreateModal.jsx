import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'

import { RESTAPI } from '../Settings'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function ToDoCreateModal (props) {
  const [error, setError] = useState('')
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      project: '', text: ''
    }
  })

  const createToDo = data => {
    const newToDo = {
      project: data.project,
      text: data.text,
      isActive: true
    }
    RESTAPI.post('todos/', newToDo)
      .then(response => {
        newToDo.id = response.data.id
        props.setTodosState([...props.todos, newToDo])
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
        <Modal.Title>Создание ToDo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='text-danger'>{error}</div>
        <Form>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
            <Form.Label>Выбор проекта</Form.Label>
            <Form.Select {...register('project')}>
              {props.projects.map((project) =>
                <option value={project.url} key={project.id}>{project.name}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput2">
            <Form.Label>ToDo текст</Form.Label>
            <Form.Control as="textarea" placeholder="Текст ToDo" {...register('text')} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => reset()}>
          Очистить
        </Button>
        <Button variant="primary" onClick={handleSubmit(createToDo)}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>)
}
ToDoCreateModal.propTypes = {
  show: PropTypes.bool,
  projects: PropTypes.array,
  todos: PropTypes.array,
  setModalShow: PropTypes.func,
  setTodosState: PropTypes.func
}

import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import { getUrl } from '../Settings'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function loginModal (props) {
  const [error, setError] = useState('')

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const getToken = data => {
    axios.post(getUrl('api-token-auth/'), {
      username: data.username,
      password: data.password
    })
      .then(response => {
        props.setToken(response.data.token)
        setError('')
        props.setModalLoginShow(false)
      }).catch(error => {
        setError('Неверный логин или пароль')
        return error
      })
  }

  return (
    <Modal show={props.show} onHide={() => props.setModalLoginShow(false)}
      onShow={() => { setError(); reset() }}>
        <Modal.Header closeButton>
          <Modal.Title>Авторизация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-danger'>{error}</div>
          <Form>
            <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control type="text" placeholder="Имя пользователя" {...register('username')}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginForm.ControlInput2">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Пароль" {...register('password')}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => reset()}>
            Очистить
          </Button>
          <Button variant="primary" onClick={handleSubmit(getToken)}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

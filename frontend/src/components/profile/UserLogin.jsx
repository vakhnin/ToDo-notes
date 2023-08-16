import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import { RESTAPI } from '../Settings'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function loginModal (props) {
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const getToken = data => {
    RESTAPI.post('api-token-auth/', {
      username: data.username,
      password: data.password
    })
      .then(response => {
        props.setToken(response.data.token)
        props.setModalLoginShow(false)
      }).catch(error => {
        if (error.response.status === 400) {
          setServerError('Неверные логин или пароль')
        } else {
          setServerError('Неизвестная ошибка сервера. Обратитесь к разработчику')
        }
      })
  }

  return (
    <Modal show={props.show} onHide={() => props.setModalLoginShow(false)}
      onShow={() => { setServerError(''); reset() }}>
      <Modal.Header closeButton>
        <Modal.Title>Авторизация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='text-danger'>{serverError}</div>
        <Form>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control type="text" placeholder="Имя пользователя"
              {...register('username', { required: 'Поле "Имя пользователя" не может быть пустым' })} />
            <ErrorMessage errors={errors} name="username"
              render={({ message }) => <div className='text-danger'>{message}</div>} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput2">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" placeholder="Пароль"
              {...register('password', { required: 'Поле "Пароль" не может быть пустым' })} />
            <ErrorMessage errors={errors} name="password"
              render={({ message }) => <div className='text-danger'>{message}</div>} />
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

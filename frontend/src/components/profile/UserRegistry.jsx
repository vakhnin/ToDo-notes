import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

import { RESTAPI } from '../Settings'

export default function registryModal (props) {
  const [serverError, setServerError] = useState('')
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const getToken = data => {
    RESTAPI.post('api-token-auth/', data)
      .then(response => {
        props.setToken(response.data.token)
      }).catch(() => {
        setServerError('Неизвестная ошибка. Обратитесь к разработчику')
      })
  }

  const registry = data => {
    delete data.confirmPassword
    RESTAPI.post('users/', data)
      .then(response => {
        data.id = response.data.id
        getToken({ username: data.username, password: data.password })

        delete data.password
        props.setUsersState([...props.users, data])
        props.setModalShow('')
      }).catch(error => {
        if (!error) {
          setServerError('Неизвестная ошибка. Обратитесь к разработчику')
          return
        }
        if (error.response.data.username &&
          error.response.data.username.includes('A user with that username already exists.')) {
          setServerError('Пользователь с таким именем пользоваетеля уже существует')
        } else {
          setServerError('Неизвестная ошибка сервера. Обратитесь к разработчику')
        }
      })
  }

  return (
    <Modal size="lg" show={props.show} onHide={() => props.setModalShow('')}
      onShow={() => { setServerError(''); reset() }}>
      <Modal.Header closeButton>
        <Modal.Title>Регистрация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='text-danger'>{serverError}</div>
        <Form>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" placeholder="Имя"
                  {...register('firstName', { required: 'Поле "Имя" не может быть пустым' })} />
                <ErrorMessage errors={errors} name="firstName"
                  render={({ message }) => <div className='text-danger'>{message}</div>} />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="loginForm.ControlInput2">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control type="text" placeholder="Фамилия"
                  {...register('lastName', { required: 'Поле "Фамилия" не может быть пустым' })} />
                <ErrorMessage errors={errors} name="lastName"
                  render={({ message }) => <div className='text-danger'>{message}</div>} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="loginForm.ControlInput3">
                <Form.Label>Имя пользователя</Form.Label>
                <Form.Control type="text" placeholder="Имя пользователя"
                  {...register('username', { required: 'Поле "Имя пользователя" не может быть пустым' })} />
                <ErrorMessage errors={errors} name="username"
                  render={({ message }) => <div className='text-danger'>{message}</div>} />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="loginForm.ControlInput4">
                <Form.Label>Почта</Form.Label>
                <Form.Control type="email" placeholder="Почта"
                  {...register('email', {
                    required: 'Поле "Почта" не может быть пустым',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Введенное значение не соответствует форматату E-mail'
                    }
                  })} />
                <ErrorMessage errors={errors} name="email"
                  render={({ message }) => <div className='text-danger'>{message}</div>} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="loginForm.ControlInput5">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Пароль"
                  {...register('password', { required: 'Поле "Пароль" не может быть пустым' })} />
                <ErrorMessage errors={errors} name="password"
                  render={({ message }) => <div className='text-danger'>{message}</div>} />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="loginForm.ControlInput6">
                <Form.Label>Подтверждение пароля</Form.Label>
                <Form.Control type="password" placeholder="Подтверждение пароля"
                  {...register('confirmPassword', {
                    required: 'Поле "Подтверждение пароля" не может быть пустым',
                    validate: (val) => {
                      if (watch('password') !== val) {
                        return 'Поля "Пароль" и "Подтверждение пароля" не совпадают'
                      }
                    }
                  })} />
                <ErrorMessage errors={errors} name="confirmPassword"
                  render={({ message }) => <div className='text-danger'>{message}</div>} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <div>
          Уже есть эккаунт? <Link onClick={() => props.setModalShow('login')}>Войти</Link>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => reset()}>
          Очистить
        </Button>
        <Button variant="primary" onClick={handleSubmit(registry)}>
          Зарегистрироваться
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

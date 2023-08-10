import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function loginModal (props) {
  const [error, setError] = useState('')

  const { register, handleSubmit, reset } = useForm()

  const getToken = data => {
    props.getToken(data.login, data.password, error => {
      if (error) {
        setError(error)
      } else {
        setError('')
        props.setModalLoginShow(false)
      }
    })
  }

  return (
    <Modal show={props.show} onHide={() => props.setModalLoginShow(false)} onShow={reset}>
        <Modal.Header closeButton>
          <Modal.Title>Авторизация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-danger'>{error}</div>
          <Form>
            <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control type="text" placeholder="Имя пользователя" {...register('login')}/>
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
loginModal.propTypes = {
  onHide: PropTypes.func
}

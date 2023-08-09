import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function loginModal (props) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  function clearState () {
    setLogin('')
    setPassword('')
  }

  function getToken () {
    props.getToken(login, password, () => props.setModalLoginShow(false))
  }

  return (
    <Modal show={props.show} onHide={() => props.setModalLoginShow(false)} onShow={clearState}>
        <Modal.Header closeButton>
          <Modal.Title>Авторизация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control type="text" placeholder="Имя пользователя"
                onChange={(event) => { setLogin(event.target.value) }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Пароль"
                onChange={(event) => { setPassword(event.target.value) }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Отменить
          </Button>
          <Button variant="primary" onClick={() => getToken()}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
loginModal.propTypes = {
  onHide: PropTypes.func
}
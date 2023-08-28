import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Card, Form } from 'react-bootstrap'

import { RESTAPI } from '../Settings'

const UserUpdate = props => {
  const id = props.userID
  const user = props.users.find(user => user.id === id)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  })

  const updateUser = data => {
    RESTAPI.patch(`users/${id}/`, data)
      .then(response => {
        props.setUsersState(
          props.users.map(item => {
            if (item.id === id) { return response.data } else { return item }
          }))
        props.setShowEditState(false)
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <Card className='h-100'>
      <Card.Header>
        <div className='d-flex justify-content-between'>
          <div>
            <Link to={`/users/${id}`}>{user.username}</Link>
            {props.userIsI && ' (Вы)'}
          </div>
          <div>
            <Link className='pe-1 link-success'>
              <FontAwesomeIcon icon={faCheck} onClick={handleSubmit(updateUser)} />
            </Link>
            <Link className='ps-1 link-danger'>
              <FontAwesomeIcon icon={faXmark} onClick={() => props.setShowEditState(false)} />
            </Link>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput1">
            <Form.Label>Имя</Form.Label>
            <Form.Control type="text" placeholder="Имя"
              {...register('firstName', { required: 'Поле "Имя" не может быть пустым' })} />
            <ErrorMessage errors={errors} name="firstName"
              render={({ message }) => <div className='text-danger'>{message}</div>} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="loginForm.ControlInput2">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control type="text" placeholder="Фамилия"
              {...register('lastName', { required: 'Поле "Фамилия" не может быть пустым' })} />
            <ErrorMessage errors={errors} name="lastName"
              render={({ message }) => <div className='text-danger'>{message}</div>} />
          </Form.Group>
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
        </Form>
      </Card.Body>
    </Card>
  )
}
UserUpdate.propTypes = {
  userID: PropTypes.number,
  setShowEditState: PropTypes.func,
  userIsI: PropTypes.bool,
  users: PropTypes.array,
  setUsersState: PropTypes.func
}

export default UserUpdate

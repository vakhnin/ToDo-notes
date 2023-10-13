import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'

export default function AccessModal (props) {
  const openLoginModal = () => {
    props.setAccessModalShow(false)
    props.setModalShow('login')
  }
  return (
    <Modal show={props.accessModalShow} onHide={() => props.setAccessModalShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Доступ запрещен</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Для выполнения данного действия необходимо&nbsp;
          <Link onClick={() => openLoginModal()}>авторизоваться</Link>
          &nbsp;и обладать необходимыми правами.
        </p>
        <p>Подробнее о правах на&nbsp;
          <Link to="/" onClick={() => props.setAccessModalShow(false)}>главной странице</Link>.
        </p>
      </Modal.Body>
    </Modal>
  )
}
AccessModal.propTypes = {
  accessModalShow: PropTypes.bool,
  setAccessModalShow: PropTypes.func,
  setModalShow: PropTypes.func
}

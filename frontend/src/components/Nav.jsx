import { React, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import LoginModal from './users/UserLogin'

const NavMenuWrapper = props => {
  const location = useLocation()
  return <NavMenu locationPathname={location.pathname} {...props} />
}

const NavMenu = props => {
  const [modalLoginShow, setModalLoginShow] = useState(false)
  return (
    <>
      <Navbar expand="lg" sticky="top" className="pb-0" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">ToDo notes</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav variant="tabs" className="border-bottom-0">
              <Nav.Item>
                {props.locationPathname === '/'
                  ? <Nav.Link as={Link} to="/" active className="bg-light text-black border-bottom-0">Главная</Nav.Link>
                  : <Nav.Link as={Link} to="/">Главная</Nav.Link>}
              </Nav.Item>
              <Nav.Item>
                {props.locationPathname.startsWith('/users')
                  ? <Nav.Link as={Link} to="/users" active className="bg-light text-black border-bottom-0">Пользователи</Nav.Link>
                  : <Nav.Link as={Link} to="/users">Пользователи</Nav.Link>}
              </Nav.Item>
              <Nav.Item>
                {props.locationPathname.startsWith('/projects')
                  ? <Nav.Link as={Link} to="/projects" active className="bg-light text-black border-bottom-0">Проекты</Nav.Link>
                  : <Nav.Link as={Link} to="/projects">Проекты</Nav.Link>}
              </Nav.Item>
              <Nav.Item>
                {props.locationPathname.startsWith('/todos')
                  ? <Nav.Link as={Link} to="/todos" active className="bg-light text-black border-bottom-0">ToDos</Nav.Link>
                  : <Nav.Link as={Link} to="/todos">ToDos</Nav.Link>}
              </Nav.Item>
              <Nav.Item>
                {props.is_authenticated()
                  ? <Nav.Link onClick={() => props.logout()}>Выйти</Nav.Link>
                  : <Nav.Link onClick={() => setModalLoginShow(true)}>Войти</Nav.Link>}
                  </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal show={modalLoginShow} setModalLoginShow={setModalLoginShow}
        getToken={props.getToken}/>
    </>
  )
}
NavMenu.propTypes = {
  is_authenticated: PropTypes.func,
  getToken: PropTypes.func,
  logout: PropTypes.func,
  locationPathname: PropTypes.string
}

export default NavMenuWrapper

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Container, Nav, Navbar } from 'react-bootstrap'

import LoginModal from './profile/UserLogin'
import RegistryModal from './profile/UserRegistry'
import AccessModal from './AccessModal'

const NavMenuWrapper = props => {
  const location = useLocation()
  return <NavMenu locationPathname={location.pathname} {...props} />
}

const NavMenu = props => {
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
              {props.isAuthenticated()
                ? <>
                  <Nav.Item>
                    <Nav.Link as={Link} to={`/users/${props.currentUserID}`}>Профиль</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => props.logout()}>Выйти</Nav.Link>
                  </Nav.Item>
                </>
                : <>
                  <Nav.Item>
                    <Nav.Link onClick={() => props.setModalShow('login')}>Профиль</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => props.setModalShow('login')}>Войти</Nav.Link>
                  </Nav.Item>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal show={props.modalShow === 'login'} setModalShow={props.setModalShow}
        setToken={props.setToken} />
      <RegistryModal show={props.modalShow === 'registry'} setModalShow={props.setModalShow}
        users={props.users} setUsersState={props.setUsersState} setToken={props.setToken} />
      <AccessModal {...props} />
    </>
  )
}
NavMenu.propTypes = {
  isAuthenticated: PropTypes.func,
  currentUserID: PropTypes.number,
  modalShow: PropTypes.string,
  setModalShow: PropTypes.func,
  setToken: PropTypes.func,
  logout: PropTypes.func,
  users: PropTypes.array,
  setUsersState: PropTypes.func,
  locationPathname: PropTypes.string
}

export default NavMenuWrapper

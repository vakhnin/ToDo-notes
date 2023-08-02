import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Nav = props => {
  return (
    <nav>
    <ul>
      <li>
        <Link to='/'>Главная</Link>
      </li>
      <li>
        <Link to='/users'>Пользователи</Link>
      </li>
      <li>
        <Link to='/projects'>Проекты</Link>
      </li>
      <li>
        <Link to='/todos'>ToDos</Link>
      </li>
      <li>
        {props.is_authenticated()
          ? <button
            onClick={() => props.logout()}>Logout</button>
          : <Link to='/login'>Login</Link>}
      </li>
    </ul>
  </nav>
  )
}
Nav.propTypes = {
  is_authenticated: PropTypes.func,
  logout: PropTypes.func
}

export default Nav

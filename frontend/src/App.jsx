import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import './App.css'
import loadData from './components/lib/loadDataUtils'

import { RESTAPI } from './components/Settings'
import NavMenu from './components/Nav'
import Users from './components/users/Users'
import Projects from './components/projects/Projects'
import ToDos from './components/todos/ToDos'
import Footer from './components/Footer'

function App () {
  const cookies = new Cookies()
  const [users, setUsersState] = useState([])
  const [projects, setProjectsState] = useState([])
  const [todos, setTodosState] = useState([])

  const [modalShow, setModalShow] = useState('')
  const [currentUserID, setCurrentUserID] = useState(0)
  const [token, setTokenState] = useState(cookies.get('token'))

  useEffect(() => {
    getTokenFromStorage()
    loadData(setUsersState, setProjectsState, setTodosState)
    getAuthorizedUser()
  }, [])

  const getAuthorizedUser = () => {
    if (RESTAPI.defaults.headers.common.Authorization) {
      RESTAPI.get('users/me/')
        .then(response => {
          setCurrentUserID(response.data.id)
        }).catch(error => {
          console.log(error)
        })
    } else {
      setCurrentUserID(0)
    }
  }

  const getHeaders = (token) => {
    const headers = {
      'Content-Type': 'application/json'
    }
    if (token) {
      headers.Authorization = 'Token ' + token
    }
    return headers
  }

  const setToken = (token) => {
    const cookies = new Cookies()
    cookies.set('token', token, { secure: true, sameSite: 'none' })
    RESTAPI.defaults.headers.common = getHeaders(token)
    getAuthorizedUser()
    setTokenState(token)
  }

  const isAuthenticated = () => {
    return token !== ''
  }

  const getTokenFromStorage = () => {
    const cookies = new Cookies()
    let token = ''
    if (cookies.get('token')) {
      token = cookies.get('token')
    }
    RESTAPI.defaults.headers.common = getHeaders(token)
    setTokenState(token)
  }

  const logout = () => {
    setToken('')
  }

  const MainApp = props => {
    return (
      <div className="App d-flex flex-column min-vh-100">
        <Router>
          <NavMenu setUsersState={setUsersState}
            modalShow={modalShow} setModalShow={setModalShow}
            setToken={setToken} logout={logout} {...props} />
          <div className="container bg-light flex-grow-1">
            <Routes>
              <Route path='/' element={<h2>Главная</h2>} />
              <Route path='/users/*' element={
                <Users modalShow={modalShow} setModalShow={setModalShow}
                  setUsersState={setUsersState} {...props} />}
              />
              <Route path='/projects/*' element={
                <Projects projects={projects}
                  setProjectsState={setProjectsState} {...props} />
              }
              />
              <Route path='/todos/*' element={
                <ToDos projects={projects} todos={todos} setTodosState={setTodosState} {...props} />}
              />
            </Routes>
          </div>
        </Router>
        <Footer />
      </div>
    )
  }
  MainApp.propTypes = {
    test: PropTypes.number
  }
  return <MainApp users={users} currentUserID={currentUserID}
    isAuthenticated={isAuthenticated} />
}

export default App

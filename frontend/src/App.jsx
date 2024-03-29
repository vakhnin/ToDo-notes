import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Cookies from 'universal-cookie'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import './App.css'
import loadData from './components/lib/loadDataUtils'

import { RESTAPI } from './components/Settings'
import NavMenu from './components/Nav'
import MainPage from './components/MainPage.jsx'
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
  const [accessModalShow, setAccessModalShow] = useState(false)
  const [currentUserID, setCurrentUserID] = useState(0)
  const [token, setTokenState] = useState(cookies.get('token'))

  useEffect(() => {
    getTokenFromStorage()
    RESTAPI.get('users/me/')
      .then(response => {
        setCurrentUserID(response.data.id)
        loadData(setUsersState, setProjectsState, setTodosState)
      }).catch(error => {
        if (error.response.data.detail === 'Not found.' ||
        error.response.data.detail === 'Invalid token.') {
          logout()
          loadData(setUsersState, setProjectsState, setTodosState)
        } else {
          console.log(error)
        }
      })
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
              <Route index element={
                <MainPage />} />
              <Route path='/users/*' element={
                <>
                  <Helmet>
                    <title>Пользователи</title>
                  </Helmet>
                  <Users modalShow={modalShow} setModalShow={setModalShow}
                    setUsersState={setUsersState} {...props} />
                </>}
              />
              <Route path='/projects/*' element={
                <>
                  <Helmet>
                    <title>Проекты</title>
                  </Helmet>
                  <Projects projects={projects}
                    setProjectsState={setProjectsState} {...props} />
                </>}
              />
              <Route path='/todos/*' element={
                <>
                  <Helmet>
                    <title>ToDos</title>
                  </Helmet>
                  <ToDos projects={projects} todos={todos} setTodosState={setTodosState} {...props} />
                </>}
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
    isAuthenticated={isAuthenticated}
    accessModalShow={accessModalShow} setAccessModalShow={setAccessModalShow} />
}

export default App

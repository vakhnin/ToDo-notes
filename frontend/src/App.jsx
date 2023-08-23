import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import loadData from './components/LoadData'

import { RESTAPI } from './components/Settings'
import NavMenu from './components/Nav'
import UsersList from './components/users/Users'
import Projects from './components/projects/Projects'
import ToDos from './components/todos/ToDos'
import Footer from './components/Footer'

function App () {
  const cookies = new Cookies()
  const [users, setUsersState] = useState([])
  const [projects, setProjectsState] = useState([])
  const [todos, setTodosState] = useState([])

  const [modalShow, setModalShow] = useState('')
  const [token, setTokenState] = useState(cookies.get('token'))

  useEffect(() => {
    getTokenFromStorage()
    loadData(setUsersState, setProjectsState, setTodosState)
  }, [])

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

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Router>
        <NavMenu users={users} setUsersState={setUsersState} isAuthenticated={isAuthenticated}
          modalShow={modalShow} setModalShow={setModalShow}
          setToken={setToken} logout={logout} />
        <div className="container bg-light flex-grow-1">
          <Routes>
            <Route path='/' element={<h2>Главная</h2>} />
            <Route path='/users' element={
              <UsersList modalShow={modalShow} setModalShow={setModalShow} users={users} />}
            />
            <Route path='/projects/*' element={
              <Projects projects={projects} users={users} setProjectsState={setProjectsState} />
            }
            />
            <Route path='/todos/*' element={
              <ToDos projects={projects} todos={todos} setTodosState={setTodosState} />}
            />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  )
}

export default App

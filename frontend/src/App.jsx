import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import Cookies from 'universal-cookie'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
// import { getUrl } from './components/Settings'
// import loadData from './components/LoadData'
// import { createProjectAction, updateProjectAction, deleteProjectAction } from './components/projects/ProjectActions'
// import { createTodo, deleteTodo } from './components/todos/TodoActions'

import UserList from './components/users/User'
import Projects from './components/projects/Projects'
import ToDos from './components/todos/ToDos'
import Footer from './components/Footer'
import NavMenu from './components/Nav'

function App () {
  const [users, setUsersState] = useState([])
  const [projects, setProjectsState] = useState([])
  const [todos, setTodosState] = useState([])
  const [token, setTokenState] = useState([])

  useEffect(() => { getTokenFromStorage() }, [])

  // loadData = () => loadData(this)

  // createProject = (name, repository, users) => createProjectAction(this, name, repository, users)
  // updateProject = (id, name, repository, users) => updateProjectAction(this, id, name, repository, users)
  // deleteProject = (id) => deleteProjectAction(this, id)

  // createTodo = (project, text) => createTodo(this, project, text)
  // deleteTodo = id => deleteTodo(this, id)

  const getHeaders = () => {
    const headers = {
      'Content-Type': 'application/json'
    }
    if (isAuthenticated) {
      headers.Authorization = 'Token ' + token
    }
    return headers
  }

  const setToken = (token) => {
    const cookies = new Cookies()
    cookies.set('token', token, { secure: true, sameSite: 'none' })
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
    setTokenState(token)
  }

  console.log(setUsersState, setProjectsState, setTodosState, getHeaders, setToken, getTokenFromStorage)

  const logout = () => {
    setToken('')
  }

  // componentDidMount () {
  //   this.get_token_from_storage()
  //   this.loadData()
  // }

  return (
      <div className="App d-flex flex-column min-vh-100">
        <Router>
          <NavMenu isAuthenticated={isAuthenticated} setToken={setToken}
            logout={logout} />
          <div className="container bg-light flex-grow-1">
          <Routes>
            <Route path='/' element={<h2>Главная</h2>} />
            <Route path='/users' element={
              <div className="container flex-grow-1">
                <h2>Пользователи</h2>
                <UserList users={users} />
              </div>} />
            <Route path='/projects/*' element={
              <Projects projects={projects} users={users}/>
              }
            />
            {/* <Route path='/projects/*' element={
              <Projects projects={projects} users={users}
                createProject={this.createProject} updateProject={this.updateProject}
                deleteProject={this.deleteProject} />
              }
            /> */}
            <Route path='/todos/*' element={
              <ToDos projects={projects} todos={todos}/> }
            />
            {/* <Route path='/todos/*' element={
              <ToDos projects={projects} todos={todos}
                createTodo={this.createTodo} deleteTodo={this.deleteTodo} /> }
            /> */}
          </Routes>
          </div>
        </Router>
        <Footer />
      </div>
  )
}

export default App

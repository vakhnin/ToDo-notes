import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import { getUrl } from './components/Settings'
import loadData from './components/LoadData'
import { createProjectAction, updateProjectAction, deleteProjectAction } from './components/projects/ProjectActions'
import { createTodo, deleteTodo } from './components/todos/TodoActions'

import UserList from './components/users/User'
import Projects from './components/projects/Projects'
import ToDos from './components/todos/ToDos'
import Footer from './components/Footer'
import NavMenu from './components/Nav'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      projects: [],
      todos: [],
      token: ''
    }
  }

  loadData = () => loadData(this)

  createProject = (name, repository, users) => createProjectAction(this, name, repository, users)
  updateProject = (id, name, repository, users) => updateProjectAction(this, id, name, repository, users)
  deleteProject = (id) => deleteProjectAction(this, id)

  createTodo = (project, text) => createTodo(this, project, text)
  deleteTodo = id => deleteTodo(this, id)

  get_headers () {
    const headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers.Authorization = 'Token ' + this.state.token
    }
    return headers
  }

  set_token (token) {
    const cookies = new Cookies()
    cookies.set('token', token, { secure: true, sameSite: 'none' })
    this.setState({ token })
  }

  is_authenticated () {
    return this.state.token !== ''
  }

  get_token_from_storage () {
    const cookies = new Cookies()
    let token = ''
    if (cookies.get('token')) {
      token = cookies.get('token')
    }
    this.setState({ token })
  }

  get_token (username, password, closeModalLogin) {
    axios.post(getUrl('api-token-auth/'), {
      username,
      password
    })
      .then(response => {
        this.set_token(response.data.token)
        closeModalLogin()
      }).catch(error => {
        alert('Неверный логин или пароль')
        return error
      })
  }

  logout () {
    this.set_token('')
  }

  componentDidMount () {
    this.get_token_from_storage()
    this.loadData()
  }

  render () {
    return (
      <div className="App d-flex flex-column min-vh-100">
        <Router>
          <NavMenu is_authenticated={() => this.is_authenticated()}
            getToken={(username, password, closeModalLogin) => this.get_token(username, password, closeModalLogin)}
            logout={() => this.logout()} />
          <div className="container bg-light flex-grow-1">
          <Routes>
            <Route path='/' element={<h2>Главная</h2>} />
            <Route path='/users' element={
              <div className="container flex-grow-1">
                <h2>Пользователи</h2>
                <UserList users={this.state.users} />
              </div>} />
            <Route path='/projects/*' element={
              <Projects projects={this.state.projects} users={this.state.users}
                createProject={this.createProject} updateProject={this.updateProject}
                deleteProject={this.deleteProject} />
              }
            />
            <Route path='/todos/*' element={
              <ToDos projects={this.state.projects} todos={this.state.todos}
                createTodo={this.createTodo} deleteTodo={this.deleteTodo} /> }
            />
          </Routes>
          </div>
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App

import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import './App.css'
import { getUrl } from './components/Settings'
import loadData from './components/LoadData'
import { deleteProjectAction } from './components/projects/ProjectActions'

import UserList from './components/users/User.jsx'
import { ProjectList, ProjectDetail } from './components/projects/Project.jsx'
import ProjectForm from './components/projects/ProjectForm.jsx'
import ToDoList from './components/todos/ToDo.jsx'
import ToDoForm from './components/todos/ToDoForm.jsx'
import ProjectUpdateFormWrapper from './components/projects/ProjectUpdateForm.jsx'
import Footer from './components/Footer.jsx'
import LoginForm from './components/Auth.jsx'

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
  deleteProject = (id) => deleteProjectAction(this, id)

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
    cookies.set('token', token)
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

  get_token (username, password) {
    axios.post(getUrl('api-token-auth/'), {
      username,
      password
    })
      .then(response => {
        this.set_token(response.data.token)
      }).catch(error => {
        alert('Неверный логин или пароль')
        return error
      })
  }

  create_project (name, repository, users) {
    const headers = this.get_headers()
    const data = { name, repository, users }
    axios.post(getUrl('projects/'), data, { headers }).then(response => {
      this.load_data()
    }).catch(error => {
      console.log(error)
      this.setState({ projects: [] })
    })
  }

  update_project (id, name, repository, users) {
    const headers = this.get_headers()
    const data = { name, repository, users }
    axios.patch(getUrl(`projects/${id}/`), data, { headers })
      .then(response => {
        this.load_data()
      }).catch(error => {
        console.log(error)
        this.setState({ projects: [] })
      })
  }

  create_todo (project, text) {
    const headers = this.get_headers()
    const data = { project, text }
    axios.post(getUrl('todos/'), data, { headers }).then(response => {
      this.load_data()
    }).catch(error => {
      console.log(error)
      this.setState({ projects: [] })
    })
  }

  delete_todo (id) {
    const headers = this.get_headers()
    axios.delete(getUrl(`todos/${id}/`), { headers })
      .then(response => {
        this.load_data()
      }).catch(error => {
        console.log(error)
        this.setState({ projects: [] })
      })
  }

  get_data_for_update_projects () {
    return {
      projects: this.state.projects,
      users: this.state.users
    }
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
                {this.is_authenticated()
                  ? <button
                    onClick={() => this.logout()}>Logout</button>
                  : <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<h2>Главная</h2>} />
            <Route path='/users' element={
              <div className="container flex-grow-1">
                <h2>Пользователи</h2>
                <UserList users={this.state.users} />
              </div>} />
            <Route path='/projects' element={
              <div>
                <h2>Проекты</h2>
                <Link to='/projects/create'>Создать проект</Link>
                <ProjectList projects={this.state.projects} deleteProject={this.deleteProject} />
              </div>} />
            <Route path='/projects/create'
              element={
                <div>
                  <h2>Создание проекта</h2>
                  <ProjectForm users={this.state.users}
                    create_project={(name, repository, users) => this.create_project(name, repository, users)} />
                </div>} />
            <Route path='/todos' element={
              <div>
                <h2>ToDos</h2>
                <Link to='/todos/create'>Создать ToDo</Link>
                <ToDoList todos={this.state.todos} delete_todo={(id) => this.delete_todo(id)} />
              </div>} />
            <Route path='/todos/create'
              element={
                <div>
                  <h2>Создание ToDo</h2>
                  <ToDoForm projects={this.state.projects}
                    create_todo={(project, text) => this.create_todo(project, text)} />
                </div>} />
            <Route path='/login' element={
              <div>
                    <h2>Login</h2>
                <LoginForm get_token={(username, password) => this.get_token(username, password)} />
              </div>} />
            <Route path="/project/:id" element={
              <div>
                <h2>Детальная информация о проекте</h2>
                <ProjectDetail projects={this.state.projects} />
              </div>} />
            <Route path="/project/update/:id" element={
              <div>
                <h2>Редактировать информацию о проекте</h2>
                <ProjectUpdateFormWrapper get_data_for_update_projects={this.get_data_for_update_projects.bind(this)}
                  update_project={(id, name, repository, users) => this.update_project(id, name, repository, users)} />
              </div>} />
          </Routes>
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App

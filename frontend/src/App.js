import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import './App.css';
import UserList from './components/User.js';
import { ProjectList, ProjectDetail } from './components/Project.js';
import ProjectForm from './components/ProjectForm.js';
import ToDoList from './components/ToDo.js';
import ToDoForm from './components/ToDoForm.js';
import ProjectUpdateFormWrapper from './components/ProjectUpdateForm.js'
import Footer from './components/Footer.js';
import LoginForm from './components/Auth.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// const DOMAIN = 'http://127.0.0.1:8000/'
const DOMAIN = 'http://46.183.163.195:8000/'
const URLAPI =  `${DOMAIN}api/`
const get_url = (url) => `${URLAPI}${url}`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'token': ''
    }
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.is_authenticated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  load_data() {
    const headers = this.get_headers()

    axios.get(get_url('users/'), { headers })
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error));

    axios.get(get_url('projects/'), { headers })
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => console.log(error));

    axios.get(get_url('todos/'), { headers })
      .then(response => {
        const todos = response.data.results
        this.setState(
          {
            'todos': todos
          }
        )
      }).catch(error => console.log(error))
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({ 'token': token }, () => this.load_data())
  }

  is_authenticated() {
    return this.state.token !== ''
  }

  get_token_from_storage_and_load_data() {
    const cookies = new Cookies()
    let token = ''
    if (cookies.get('token')) {
      token = cookies.get('token')
    }
    this.setState({ 'token': token }, () => this.load_data())
  }

  get_token(username, password) {
    axios.post(`${DOMAIN}api-token-auth/`, {
      username: username,
      password: password
    })
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }

  create_project(name, repository, users) {
    const headers = this.get_headers()
    const data = { name: name, repository: repository, users: users }
    axios.post(get_url('projects/'), data, { headers }).then(response => {
      this.load_data()
    }).catch(error => {
      console.log(error)
      this.setState({ projects: [] })
    })
  }

  update_project(id, name, repository, users) {
    const headers = this.get_headers()
    const data = { name: name, repository: repository, users: users }
    axios.patch(get_url(`projects/${id}/`), data, { headers })
      .then(response => {
        this.load_data()
      }).catch(error => {
        console.log(error)
        this.setState({ projects: [] })
      })
  }

  delete_project(id) {
    const headers = this.get_headers()
    axios.delete(get_url(`projects/${id}/`), { headers })
      .then(response => {
        this.load_data()
      }).catch(error => {
        console.log(error)
        this.setState({ projects: [] })
      })
  }

  create_todo(project, text) {
    const headers = this.get_headers()
    const data = { project: project, text: text }
    axios.post(get_url('todos/'), data, { headers }).then(response => {
      this.load_data()
    }).catch(error => {
      console.log(error)
      this.setState({ projects: [] })
    })
  }

  delete_todo(id) {
    const headers = this.get_headers()
    axios.delete(get_url(`todos/${id}/`), { headers })
      .then(response => {
        this.load_data()
      }).catch(error => {
        console.log(error)
        this.setState({ projects: [] })
      })
  }

  get_data_for_update_projects() {
    return {
      'projects': this.state.projects,
      'users': this.state.users,
    }
  }

  logout() {
    this.set_token('')
  }


  componentDidMount() {
    this.get_token_from_storage_and_load_data()
  }

  render() {
    return (
      <div className="App">
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
                {this.is_authenticated() ? <button
                  onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>
          <hr />
          <Routes>
            <Route path='/' element={<h2>Главная</h2>} />
            <Route path='/users' element={
              <div>
                <h2>Пользователи</h2>
                <UserList users={this.state.users} />
              </div>} />
            <Route path='/projects' element={
              <div>
                <h2>Проекты</h2>
                <Link to='/projects/create'>Создать проект</Link>
                <ProjectList projects={this.state.projects} delete_project={(id) => this.delete_project(id)} />
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
        <hr />
        <Footer />
      </div>
    )
  }
}

export default App;

import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import './App.css';
import UserList from './components/User.js';
import { ProjectList, ProjectDetail } from './components/Project.js';
import ToDoList from './components/ToDo.js';
import Footer from './components/Footer.js';
import LoginForm from './components/Auth.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


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

    axios.get('http://127.0.0.1:8000/api/users/', { headers })
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error));

    axios.get('http://127.0.0.1:8000/api/projects/', { headers })
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => console.log(error));

    axios.get('http://127.0.0.1:8000/api/todos/', { headers })
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
    axios.post('http://127.0.0.1:8000/api-token-auth/', {
      username: username,
      password: password
    })
      .then(response => {
        this.set_token(response.data['token'])
      }).catch(error => alert('Неверный логин или пароль'))
  }

  delete_project(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, { headers })
      .then(response => {
        this.load_data()
      }).catch(error => {
        console.log(error)
        this.setState({ books: [] })
      })
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
                <ProjectList projects={this.state.projects} delete_project={(id) => this.delete_project(id)}/>
              </div>} />
            <Route path='/todos' element={
              <div>
                <h2>ToDos</h2>
                <ToDoList todos={this.state.todos} />
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
          </Routes>
        </Router>
        <hr />
        <Footer />
      </div>
    )
  }
}

export default App;

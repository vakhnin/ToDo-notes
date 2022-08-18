import React from 'react';
import axios from 'axios';

import './App.css';
import UserList from './components/User.js';
import Footer from './components/Footer.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/')
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error))
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
            <Route path='/projects' element={<h2>Проекты</h2>} />
            <Route path='/todos' element={<h2>ToDos</h2>} />
          </Routes>
        </Router>
        <hr />
        <Footer />
      </div>
    )
  }
}

export default App;

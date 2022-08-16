import React from 'react';
import axios from 'axios';

import './App.css';
import UserList from './components/User.js';
import Footer from './components/Footer.js';
import Menu from './components/Menu.js';

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
      <div>
        <Menu />
        <hr />
        <UserList users={this.state.users} />
        <Footer />
      </div>
    )
  }
}

export default App;

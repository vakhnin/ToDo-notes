import React from 'react';
import './App.css';
import UserList from './components/User.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    const users = [
      {
        'first_name': 'first_name1',
        'last_name': 'last_name1'
      },
      {
        'first_name': 'first_name2',
        'last_name': 'last_name2'
      },
    ]

    this.setState(
      {
        'users': users
      }
    )
  }

  render() {
    return (
      <div>
        <UserList users={this.state.users} />
      </div>
    )
  }
}

export default App;

import React from 'react'
import PropTypes from 'prop-types'

class ProjectCreationForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { name: '', repository: '', users: [] }
  }

  handleChange (event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    )
  }

  handleUserChange (event) {
    if (!event.target.selectedOptions) {
      this.setState({
        users: []
      })
      return
    }
    const users = []
    for (let i = 0; i < event.target.selectedOptions.length; i++) {
      users.push(event.target.selectedOptions.item(i).value)
    }
    this.setState(
      { users }
    )
  }

  handleSubmit (event) {
    this.props.createProject(this.state.name,
      this.state.repository, this.state.users)
    event.preventDefault()
  }

  render () {
    return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="text" name="name" placeholder="Название проекта"
                        value={this.state.name}
                        onChange={(event) => this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label htmlFor="repository"></label>
                    <input type="url" name="repository" placeholder="http://repository.com"
                        value={this.state.repository}
                        onChange={(event) => this.handleChange(event)} />
                </div>

                <div>
                    <p>Users:</p>
                    <select name="users" multiple
                        onChange={(event) => this.handleUserChange(event)}>
                        {this.props.users.map((item) =>
                            <option value={item.url}
                                key={item.url}>{item.firstName}</option>)}
                    </select>
                </div>

                <div>
                    <input type="submit" value="Create" />
                </div>
            </form>
    )
  }
}
ProjectCreationForm.propTypes = {
  createProject: PropTypes.func,
  users: PropTypes.array
}

export default ProjectCreationForm

import { RESTAPI } from './Settings'

export default function LoadData (setUsersState, setProjectsState, setTodosState) {
  RESTAPI.get('users/')
    .then(response => {
      const users = response.data.results
      setUsersState(users)
    }).catch(error => console.log(error))

  RESTAPI.get('projects/')
    .then(response => {
      const projects = response.data.results
      setProjectsState(projects)
    }).catch(error => console.log(error))

  RESTAPI.get('todos/')
    .then(response => {
      const todos = response.data.results
      setTodosState(todos)
    }).catch(error => console.log(error))
}

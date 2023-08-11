import { RESTAPI } from './Settings'

export default function LoadData (getHeaders, setUsersState, setProjectsState, setTodosState) {
  const headers = getHeaders()

  RESTAPI.get('users/', { headers })
    .then(response => {
      const users = response.data.results
      setUsersState(users)
    }).catch(error => console.log(error))

  RESTAPI.get('projects/', { headers })
    .then(response => {
      const projects = response.data.results
      setProjectsState(projects)
    }).catch(error => console.log(error))

  RESTAPI.get('todos/', { headers })
    .then(response => {
      const todos = response.data.results
      setTodosState(todos)
    }).catch(error => console.log(error))
}

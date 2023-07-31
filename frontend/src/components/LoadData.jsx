import axios from 'axios'
import { getUrl } from './Settings'

export default function LoadData (appThis) {
  const headers = appThis.get_headers()

  axios.get(getUrl('users/'), { headers })
    .then(response => {
      const users = response.data.results
      appThis.setState(
        {
          users
        }
      )
    }).catch(error => console.log(error))

  axios.get(getUrl('projects/'), { headers })
    .then(response => {
      const projects = response.data.results
      appThis.setState(
        {
          projects
        }
      )
    }).catch(error => console.log(error))

  axios.get(getUrl('todos/'), { headers })
    .then(response => {
      const todos = response.data.results
      appThis.setState(
        {
          todos
        }
      )
    }).catch(error => console.log(error))
}

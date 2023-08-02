import axios from 'axios'
import { getUrl } from '../Settings'

function createProjectAction (MainAppThis, name, repository, users) {
  const headers = MainAppThis.get_headers()
  const newProject = { name, repository, users }
  axios.post(getUrl('projects/'), newProject, { headers })
    .then(response => {
      newProject.id = response.data.id
      MainAppThis.setState({ projects: [...MainAppThis.state.projects, newProject] })
    }).catch(error => {
      console.log(error)
      MainAppThis.setState({ projects: [] })
    })
}

function updateProjectAction (MainAppThis, id, name, repository, users) {
  const headers = MainAppThis.get_headers()
  const data = { name, repository, users }
  axios.patch(getUrl(`projects/${id}/`), data, { headers })
    .then(response => {
      MainAppThis.loadData()
    }).catch(error => {
      console.log(error)
      MainAppThis.setState({ projects: [] })
    })
}

function deleteProjectAction (MainAppThis, id) {
  const headers = MainAppThis.get_headers()
  axios.delete(getUrl(`projects/${id}/`), { headers })
    .then(response => {
      MainAppThis.setState({ projects: MainAppThis.state.projects.filter((item) => item.id !== id) })
    }).catch(error => {
      console.log(error)
      MainAppThis.setState({ projects: [] })
    })
}

export { createProjectAction, updateProjectAction, deleteProjectAction }

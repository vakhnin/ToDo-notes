import axios from 'axios'
import { getUrl } from '../Settings'

function createTodo (MainAppThis, project, text) {
  const headers = MainAppThis.get_headers()
  const newTodo = { project, text }
  axios.post(getUrl('todos/'), newTodo, { headers })
    .then(response => {
      newTodo.id = response.data.id
      MainAppThis.setState({ todos: [...MainAppThis.state.todos, newTodo] })
    }).catch(error => {
      console.log(error)
      MainAppThis.setState({ todos: [] })
    })
}

function deleteTodo (MainAppThis, id) {
  const headers = MainAppThis.get_headers()
  axios.delete(getUrl(`todos/${id}/`), { headers })
    .then(response => {
      MainAppThis.setState({ todos: MainAppThis.state.todos.filter((item) => item.id !== id) })
    }).catch(error => {
      console.log(error)
      MainAppThis.setState({ todos: [] })
    })
}

export { createTodo, deleteTodo }

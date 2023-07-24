import React from 'react'
import PropTypes from 'prop-types'

const ToDoItem = ({ todo, deleteTodo }) => {
  return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.created}</td>
            <td>{todo.updated}</td>
            <td>{todo.creater}</td>
            <td>{(todo.isActive ? 'Active' : 'Not active')}</td>
            <td>
                <button onClick={() => deleteTodo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
  )
}
ToDoItem.propTypes = {
  todo: PropTypes.object,
  deleteTodo: PropTypes.func
}

const ToDoList = ({ todos, deleteTodo }) => {
  return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Project</th>
                    <th>ToDo text</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Creater</th>
                    <th>Active</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => <ToDoItem key={todo.id} todo={todo}
                    deleteTodo={deleteTodo} />)}
            </tbody>
        </table>
  )
}
ToDoList.propTypes = {
  todos: PropTypes.array,
  deleteTodo: PropTypes.func
}

export default ToDoList

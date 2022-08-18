import React from 'react'

const ToDoItem = ({ todo }) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.created}</td>
            <td>{todo.updated}</td>
            <td>{todo.creater}</td>
            <td>{(todo.isActive ? 'Active' : 'Not active')}</td>
        </tr>
    )
}

const ToDoList = ({ todos }) => {
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
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => <ToDoItem key={todo.id} todo={todo} />)}
            </tbody>
        </table>
    )
}

export default ToDoList

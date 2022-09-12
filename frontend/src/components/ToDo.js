import React from 'react'

const ToDoItem = ({ todo, delete_todo }) => {
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
                <button onClick={() => delete_todo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({ todos, delete_todo }) => {
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
                    delete_todo={delete_todo} />)}
            </tbody>
        </table>
    )
}

export default ToDoList

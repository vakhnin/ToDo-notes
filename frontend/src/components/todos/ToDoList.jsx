import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'

import ToDoCreate from './ToDoCreate'
import ToDoCard from './ToDoCard'

const ToDoItem = props => {
  return (
    <ToDoCard {...props} />
  )
}

const ToDoList = props => {
  return (
    <Row>
      <Col className='pb-3 align-self-stretch' md={6} lg={4} xl={3}>
        <ToDoCreate {...props} />
      </Col>
      {props.todos.map((todo) =>
        <Col key={todo.id} className='pb-3 align-self-stretch' md={6} lg={4} xl={3}>
          <ToDoItem todoID={todo.id} {...props} />
        </Col>)}
    </Row>
  )
}
ToDoList.propTypes = {
  todos: PropTypes.array
}

export default ToDoList

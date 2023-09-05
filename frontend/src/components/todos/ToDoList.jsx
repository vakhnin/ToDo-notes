import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

import ToDoCreate from './ToDoCreate'
import ToDoCard from './ToDoCard'

const ToDoItem = props => {
  return (
    <ToDoCard {...props} />
  )
}

const AddToDoItem = ({ setShowAddProjectState }) => {
  return (
    <Card className='h-100'>
      <Card.Header>
        <Link className='link-success'>Новое ToDo</Link>
      </Card.Header>
      <Card.Body className='h-100'>
        <Card.Text className='big-plus h-100 d-flex align-items-center justify-content-center'>
          <Link className='link-success  stretched-link'
            onClick={() => setShowAddProjectState(true)}>
            <FontAwesomeIcon icon={faCirclePlus} />
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
AddToDoItem.propTypes = {
  setShowAddProjectState: PropTypes.func
}

const ToDoList = props => {
  const [showAddProjectState, setShowAddProjectState] = useState(false)
  return (
    <Row>
      <Col className='pb-3 align-self-stretch' md={6} lg={4} xl={3}>
        {showAddProjectState
          ? <ToDoCreate setShowAddProjectState={setShowAddProjectState} {...props} />
          : <AddToDoItem setShowAddProjectState={setShowAddProjectState} />}
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

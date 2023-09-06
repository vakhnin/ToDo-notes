import React from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import ToDoCard from './ToDoCard'

const ToDoDetail = props => {
  const { id } = useParams()
  return (
    <ToDoCard todoID={Number(id)} {...props} />
  )
}
ToDoDetail.propTypes = {
  todos: PropTypes.array
}

export default ToDoDetail

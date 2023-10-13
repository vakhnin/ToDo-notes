import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import ToDoCard from './ToDoCard'
import ToDoUpdateCard from './ToDoUpdateCard'

const ToDoDetail = props => {
  const { id } = useParams()
  const [showEditState, setShowEditState] = useState(false)
  return (
    <>
      {showEditState
        ? <ToDoUpdateCard todoID={Number(id)} setShowEditState={setShowEditState} {...props} />
        : <ToDoCard todoID={Number(id)} setShowEditState={setShowEditState} {...props} />
      }
    </>
  )
}
ToDoDetail.propTypes = {
  todos: PropTypes.array
}

export default ToDoDetail

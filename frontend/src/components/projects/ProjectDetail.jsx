import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import ProjectCard from './ProjectCard'
import ProjectUpdateCard from './ProjectUpdateCard'

const ProjectDetail = props => {
  const { id } = useParams()
  const [showEditState, setShowEditState] = useState(false)
  return (
    <>
      {showEditState
        ? <ProjectUpdateCard projectID={Number(id)} setShowEditState={setShowEditState} {...props} />
        : <ProjectCard projectID={Number(id)} setShowEditState={setShowEditState} {...props} />
      }
    </>
  )
}
ProjectDetail.propTypes = {
  projects: PropTypes.array
}

export default ProjectDetail
